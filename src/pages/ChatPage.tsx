import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Paperclip, Image, FileText, Send, Play, Pause, Phone, Video } from "lucide-react";
import { users, conversations, currentUser } from "@/data/chatData";
import type { Message } from "@/data/chatData";

const ChatPage = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
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
      <div className="flex items-center gap-3 px-4 py-3 bg-card border-b border-border sticky top-0 z-10">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft size={22} className="text-foreground" />
        </button>
        <div className="relative">
          <img src={chatUser.avatar} className="w-9 h-9 rounded-full object-cover" alt="" />
          {chatUser.online && <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-success rounded-full border-2 border-card" />}
        </div>
        <span className="font-semibold text-foreground flex-1">{chatUser.name}</span>
        <button className="text-foreground p-1.5">
          <Phone size={20} />
        </button>
        <button className="text-foreground p-1.5">
          <Video size={20} />
        </button>
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
      <div className="sticky bottom-0 bg-card border-t border-border px-4 py-3">
        <div className="flex items-center gap-2 bg-secondary rounded-full px-4 py-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder={`Message ${chatUser.name}...`}
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
          />
          <button className="text-muted-foreground"><Paperclip size={18} /></button>
          <button className="text-muted-foreground"><Image size={18} /></button>
          <button
            onClick={sendMessage}
            className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center ml-1"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
