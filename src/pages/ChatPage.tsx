import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Paperclip, Image as ImageIcon, FileText, Play, Pause, Phone, Video, MoreVertical } from "lucide-react";
import { FiPlus, FiCamera, FiSend } from "react-icons/fi";
import { PiSticker } from "react-icons/pi";
import { users, conversations, currentUser } from "@/data/chatData";
import type { Message } from "@/data/chatData";

function useIsDark() {
  const [isDark, setIsDark] = useState(() =>
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  return isDark;
}

const ChatPage = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const isDark = useIsDark();

  const pill = isDark
    ? {
      background: "rgba(20, 20, 20, 0.65)",
      border: "1px solid rgba(255,255,255,0.10)",
      boxShadow:
        "0 8px 32px rgba(0,0,0,0.45), 0 1px 0 rgba(255,255,255,0.06) inset, 0 -1px 0 rgba(0,0,0,0.3) inset",
    }
    : {
      background: "rgba(255, 255, 255, 0.72)",
      border: "1px solid rgba(0,0,0,0.08)",
      boxShadow:
        "0 4px 24px rgba(0,0,0,0.10), 0 1px 0 rgba(255,255,255,0.9) inset, 0 -1px 0 rgba(0,0,0,0.04) inset",
    };

  const bottomRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>(conversations["1"] || []);
  const [playingVoice, setPlayingVoice] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);

  const chatUser = users.find(u => u.id === userId) || users[1];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMsg: Message = {
      id: `m${Date.now()}`,
      senderId: currentUser.id,
      text: input,
      timestamp: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
    };
    setMessages(prev => [...prev, newMsg]);
    setInput("");

    // Show typing indicator then reply
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const replies = [
        "Got it, thanks! 👍",
        "Sure, I'll look into that.",
        "Makes sense, let me check.",
        "On it!",
        "Sounds good to me!",
      ];
      const reply: Message = {
        id: `m${Date.now() + 1}`,
        senderId: chatUser.id,
        text: replies[Math.floor(Math.random() * replies.length)],
        timestamp: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
      };
      setMessages(prev => [...prev, reply]);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-[430px] mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3 backdrop-blur-md bg-background/50 sticky top-0 z-10 pb-4 border-none">
          <button onClick={() => navigate(-1)} className="text-foreground hover:opacity-80 transition-opacity">
            <ArrowLeft size={22} strokeWidth={1.5} />
          </button>
          <button 
            onClick={() => navigate(`/chat/${chatUser.id}/profile`)} 
            className="flex-1 min-w-0 flex items-center gap-3 text-left hover:opacity-80 transition-opacity"
          >
            <div className="relative shrink-0">
              <img src={chatUser.avatar} className="w-10 h-10 rounded-full object-cover shadow-sm" alt="" />
              {chatUser.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />}
            </div>
            <div className="flex flex-col flex-1 overflow-hidden leading-tight justify-center mt-0.5">
              <span className="font-semibold text-foreground text-[15px] truncate">{chatUser.name}</span>
              <span className="text-[11px] text-muted-foreground truncate opacity-80">Akbar, Fawzy, Khai, Kira, Musa, Smi...</span>
            </div>
          </button>
          <div className="flex items-center gap-1 text-muted-foreground">
          <button className="hover:text-foreground transition-colors p-1.5">
            <Video size={22} strokeWidth={1.5} />
          </button>
          <button className="hover:text-foreground transition-colors p-1.5">
            <Phone size={20} strokeWidth={1.5} />
          </button>
          <button className="hover:text-foreground transition-colors p-1.5">
            <MoreVertical size={20} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((msg) => {
          const isMe = msg.senderId === currentUser.id;
          return (
            <div key={msg.id}>
              {!isMe && (
                <p className="text-xs font-medium text-foreground mb-1">{chatUser.name.split(" ")[0]}</p>
              )}

              <div className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                <div className="max-w-[80%]">
                  {msg.replyTo && (
                    <div className="mb-1 border-l-2 border-border pl-2 text-xs text-muted-foreground bg-secondary rounded-md p-2">
                      <span className="font-medium">Replying :</span>
                      <p className="mt-0.5 truncate">{msg.replyTo.text}</p>
                    </div>
                  )}

                  {msg.voiceNote ? (
                    <div className={`rounded-2xl px-4 py-3 flex items-center gap-3 ${isMe ? "bg-chat-outgoing border border-border" : "bg-chat-incoming"}`}>
                      <button onClick={() => setPlayingVoice(playingVoice === msg.id ? null : msg.id)}>
                        {playingVoice === msg.id ? <Pause size={18} /> : <Play size={18} />}
                      </button>
                      <div className="flex-1 flex items-center gap-0.5">
                        {Array.from({ length: 20 }).map((_, i) => (
                          <div
                            key={i}
                            className="w-0.5 bg-foreground/40 rounded-full"
                            style={{ height: `${Math.random() * 16 + 4}px` }}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">1X</span>
                    </div>
                  ) : (
                    <div className={`rounded-2xl px-4 py-2.5 ${isMe ? "bg-chat-outgoing border border-border" : "bg-chat-incoming"}`}>
                      <p className="text-sm text-foreground leading-relaxed">{msg.text}</p>
                      {msg.image && (
                        <img src={msg.image} className="mt-2 w-16 h-16 rounded-lg object-cover" alt="" />
                      )}
                    </div>
                  )}

                  {msg.reactions && (
                    <div className="flex gap-1 mt-1">
                      {msg.reactions.map((r, i) => (
                        <span key={i} className="text-sm">{r}</span>
                      ))}
                    </div>
                  )}

                  {!isMe && msg.text && !msg.voiceNote && (
                    <div className="flex items-center gap-2 mt-1">
                      <button className="text-muted-foreground hover:text-foreground"><Paperclip size={14} /></button>
                      <button className="text-muted-foreground hover:text-foreground"><FileText size={14} /></button>
                    </div>
                  )}

                  <p className={`text-[10px] text-muted-foreground mt-1 ${isMe ? "text-right" : ""}`}>{msg.timestamp}</p>
                </div>
              </div>
            </div>
          );
        })}
        {/* Typing indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-chat-incoming rounded-2xl px-4 py-3 flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-muted-foreground animate-typing-bounce" style={{ animationDelay: "0ms" }} />
              <div className="w-2 h-2 rounded-full bg-muted-foreground animate-typing-bounce" style={{ animationDelay: "200ms" }} />
              <div className="w-2 h-2 rounded-full bg-muted-foreground animate-typing-bounce" style={{ animationDelay: "400ms" }} />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="sticky bottom-0 bg-gradient-to-t from-background via-background/90 to-transparent pb-6 pt-4 px-4 font-sans">
        <div className="flex items-center gap-2">
          <button
            className="text-foreground w-11 h-11 rounded-full flex items-center justify-center shrink-0 transition-colors"
            style={{
              background: pill.background,
              border: pill.border,
              boxShadow: pill.boxShadow,
              backdropFilter: "blur(24px) saturate(180%)",
              WebkitBackdropFilter: "blur(24px) saturate(180%)"
            }}
          >
            <FiPlus size={24} />
          </button>
          <div
            className="flex-1 flex items-center gap-2 rounded-full px-4 py-2.5"
            style={{
              background: pill.background,
              border: pill.border,
              boxShadow: pill.boxShadow,
              backdropFilter: "blur(24px) saturate(180%)",
              WebkitBackdropFilter: "blur(24px) saturate(180%)"
            }}
          >
            <button className="text-muted-foreground hover:text-foreground transition-colors -ml-1">
              <PiSticker size={22} />
            </button>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type here"
              className="flex-1 bg-transparent text-[15px] text-foreground placeholder:text-muted-foreground/70 outline-none px-1"
            />
            {input.trim() ? (
              <button
                onClick={sendMessage}
                className="text-primary hover:text-primary/80 transition-colors"
                title="Send"
              >
                <FiSend size={20} />
              </button>
            ) : (
              <button className="text-muted-foreground hover:text-foreground transition-colors -mr-1">
                <FiCamera size={20} />
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default ChatPage;
