import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Phone, Video, X, Search, VolumeX, Volume2, Image, Trash2, Lock, Pin, Palette, Star, Bell, BellOff, ChevronRight } from "lucide-react";
import { FiSend, FiCamera, FiPlus } from "react-icons/fi";
import { useIsDark } from "@/hooks/useIsDark";
import { getUserById, fakeConversations, getRandomReply, FakeMessage } from "@/data/fakeData";
import { toast } from "sonner";

const ChatPage = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const isDark = useIsDark();
  const chatUser = getUserById(userId || "");

  const pill = isDark
    ? { background: "rgba(20,20,20,0.65)", border: "1px solid rgba(255,255,255,0.10)", boxShadow: "0 8px 32px rgba(0,0,0,0.45),0 1px 0 rgba(255,255,255,0.06) inset" }
    : { background: "rgba(255,255,255,0.72)", border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 4px 24px rgba(0,0,0,0.10),0 1px 0 rgba(255,255,255,0.9) inset" };
  const blurStyle = { ...pill, backdropFilter: "blur(24px) saturate(180%)", WebkitBackdropFilter: "blur(24px) saturate(180%)" };

  const bottomRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<FakeMessage[]>(fakeConversations[userId || ""] || []);
  const [isTyping, setIsTyping] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [isStarred, setIsStarred] = useState(false);
  const [wallpaper, setWallpaper] = useState<string | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMsg: FakeMessage = {
      id: `m${Date.now()}`,
      senderId: "me",
      text: input.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
      status: "sent",
    };
    setMessages(prev => [...prev, newMsg]);
    setInput("");

    // Simulate delivered
    setTimeout(() => {
      setMessages(prev => prev.map(m => m.id === newMsg.id ? { ...m, status: "delivered" } : m));
    }, 500);

    // Simulate typing + reply
    setTimeout(() => setIsTyping(true), 1200);
    setTimeout(() => {
      setIsTyping(false);
      const reply: FakeMessage = {
        id: `m${Date.now() + 1}`,
        senderId: "other",
        text: getRandomReply(),
        timestamp: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
        status: "seen",
      };
      setMessages(prev => [...prev, reply]);
      // Mark our msg as seen
      setMessages(prev => prev.map(m => m.id === newMsg.id ? { ...m, status: "seen" } : m));
    }, 3000);
  };

  if (!chatUser) return <div className="min-h-screen bg-background flex items-center justify-center max-w-[430px] mx-auto"><p className="text-muted-foreground">User not found</p></div>;

  const settingsItems = [
    { icon: isMuted ? BellOff : Bell, label: isMuted ? "Unmute Chat" : "Mute Chat", sub: isMuted ? "Notifications off" : "Silence notifications", toggle: true, active: isMuted, action: () => { setIsMuted(!isMuted); toast(isMuted ? "Chat unmuted" : "Chat muted"); } },
    { icon: Pin, label: isPinned ? "Unpin Chat" : "Pin Chat", sub: isPinned ? "Pinned to top" : "Keep this chat on top", toggle: true, active: isPinned, action: () => { setIsPinned(!isPinned); toast(isPinned ? "Unpinned" : "Pinned to top"); } },
    { icon: Star, label: isStarred ? "Unstar Chat" : "Star Chat", sub: isStarred ? "Starred" : "Mark as favorite", toggle: true, active: isStarred, action: () => { setIsStarred(!isStarred); toast(isStarred ? "Unstarred" : "Starred"); } },
    { icon: Lock, label: isLocked ? "Unlock Chat" : "Lock Chat", sub: isLocked ? "Locked with biometrics" : "Require authentication", toggle: true, active: isLocked, action: () => { setIsLocked(!isLocked); toast(isLocked ? "Chat unlocked" : "Chat locked"); } },
    { icon: Search, label: "Search in Chat", sub: "Find messages", action: () => { setShowSettings(false); toast("Search coming soon"); } },
    { icon: Image, label: "Media & Files", sub: `${messages.filter(m => m.images).length} shared items`, action: () => { setShowSettings(false); toast("Media gallery coming soon"); } },
    { icon: Palette, label: "Change Wallpaper", sub: wallpaper ? "Custom wallpaper set" : "Default background", action: () => { setWallpaper(wallpaper ? null : "gradient"); toast(wallpaper ? "Wallpaper removed" : "Wallpaper applied"); } },
  ];

  const dangerItems = [
    { icon: VolumeX, label: "Block Contact", sub: "Stop all messages", action: () => toast("Contact blocked") },
    { icon: Trash2, label: "Clear Chat", sub: "Delete all messages", action: () => { setMessages([]); setShowSettings(false); toast("Chat cleared"); } },
  ];

  return (
    <>
      {/* Settings panel overlay */}
      {showSettings && (
        <div className="fixed inset-0 z-50 max-w-[430px] mx-auto">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowSettings(false)} />
          <div className="absolute bottom-0 left-0 right-0 bg-background rounded-t-[28px] max-h-[80vh] overflow-y-auto animate-in slide-in-from-bottom duration-300 border-t border-border/50">
            <div className="flex justify-center pt-3 pb-1"><div className="w-10 h-1 rounded-full bg-muted-foreground/30" /></div>
            <div className="px-5 py-3 flex items-center gap-3">
              <img src={chatUser.avatar} className="w-10 h-10 rounded-full object-cover" alt="" />
              <div className="flex-1">
                <p className="font-bold text-foreground text-[15px]">{chatUser.name}</p>
                <p className="text-[11px] text-muted-foreground">{chatUser.online ? "Active now" : chatUser.lastSeen || "Offline"}</p>
              </div>
              <button onClick={() => setShowSettings(false)} className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center"><X size={16} className="text-muted-foreground" /></button>
            </div>

            {/* Quick actions */}
            <div className="px-5 py-3 flex justify-around">
              {[
                { icon: Phone, label: "Audio", action: () => toast("Calling...") },
                { icon: Video, label: "Video", action: () => toast("Video calling...") },
                { icon: Search, label: "Search", action: () => toast("Search coming soon") },
              ].map(({ icon: Icon, label, action }) => (
                <button key={label} onClick={action} className="flex flex-col items-center gap-1.5">
                  <div className="w-11 h-11 rounded-full bg-secondary flex items-center justify-center"><Icon size={18} className="text-foreground" /></div>
                  <span className="text-[11px] text-muted-foreground font-medium">{label}</span>
                </button>
              ))}
            </div>

            <div className="mx-5 border-t border-border/40 my-1" />

            {/* Settings */}
            <div className="px-5 py-2">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-2">Chat Settings</p>
              {settingsItems.map(({ icon: Icon, label, sub, toggle, active, action }) => (
                <button key={label} onClick={action} className="w-full flex items-center gap-3.5 py-3 hover:opacity-80 transition-opacity border-b border-border/20 last:border-0">
                  <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center shrink-0">
                    <Icon size={16} className="text-foreground" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-[14px] font-medium text-foreground leading-tight">{label}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{sub}</p>
                  </div>
                  {toggle ? (
                    <div className={`w-10 h-[22px] rounded-full flex items-center px-[2px] transition-colors duration-200 shrink-0 ${active ? "bg-green-500" : "bg-muted-foreground/20"}`}>
                      <div className={`w-[18px] h-[18px] bg-white rounded-full shadow-sm transition-transform duration-200 ${active ? "translate-x-[18px]" : "translate-x-0"}`} />
                    </div>
                  ) : (
                    <ChevronRight size={14} className="text-muted-foreground/40 shrink-0" />
                  )}
                </button>
              ))}
            </div>

            <div className="mx-5 border-t border-border/40 my-1" />

            {/* Danger zone */}
            <div className="px-5 py-2 pb-8">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-2">Danger Zone</p>
              {dangerItems.map(({ icon: Icon, label, sub, action }) => (
                <button key={label} onClick={action} className="w-full flex items-center gap-3.5 py-3 hover:opacity-80 transition-opacity border-b border-border/20 last:border-0">
                  <div className="w-9 h-9 rounded-full bg-red-500/10 flex items-center justify-center shrink-0">
                    <Icon size={16} className="text-red-500" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-[14px] font-medium text-red-500 leading-tight">{label}</p>
                    <p className="text-[11px] text-red-400/70 mt-0.5">{sub}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-background flex flex-col max-w-[430px] mx-auto" style={wallpaper ? { background: "linear-gradient(135deg, hsl(var(--background)), hsl(var(--secondary)))" } : {}}>
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3 backdrop-blur-md bg-background/50 sticky top-0 z-10 pb-4">
          <button onClick={() => navigate(-1)} className="text-foreground hover:opacity-80 transition-opacity"><ArrowLeft size={22} strokeWidth={1.5} /></button>
          <button onClick={() => navigate(`/chat/${userId}/profile`)} className="flex-1 min-w-0 flex items-center gap-3 text-left hover:opacity-80 transition-opacity">
            <div className="relative shrink-0">
              <img src={chatUser.avatar} className="w-10 h-10 rounded-full object-cover shadow-sm" alt="" />
              {chatUser.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />}
            </div>
            <div className="flex flex-col flex-1 overflow-hidden leading-tight justify-center mt-0.5">
              <span className="font-semibold text-foreground text-[15px] truncate">{chatUser.name}</span>
              <span className="text-[11px] text-muted-foreground truncate opacity-80">{chatUser.online ? "Active now" : chatUser.lastSeen || "Offline"}</span>
            </div>
          </button>
          <div className="flex items-center gap-1 text-muted-foreground">
            <button onClick={() => toast("Video calling...")} className="hover:text-foreground transition-colors p-1.5"><Video size={22} strokeWidth={1.5} /></button>
            <button onClick={() => toast("Calling...")} className="hover:text-foreground transition-colors p-1.5"><Phone size={20} strokeWidth={1.5} /></button>
            <button onClick={() => setShowSettings(true)} className="hover:text-foreground transition-colors p-1.5">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/></svg>
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden px-4 py-2">
          {messages.map((msg, idx) => {
            const isMe = msg.senderId === "me";
            const nextMsg = messages[idx + 1];
            const prevMsg = messages[idx - 1];
            const showName = !isMe && (!prevMsg || prevMsg.senderId !== msg.senderId);
            const isLastInGroup = !nextMsg || nextMsg.senderId !== msg.senderId;

            return (
              <div key={msg.id}>
                {showName && <p className="text-[13px] font-bold text-foreground mb-1.5 mt-2">{chatUser.name.split(" ")[0]}</p>}
                <div className={`flex ${isMe ? "justify-end" : "justify-start"} ${isLastInGroup ? "mb-3" : "mb-0.5"}`}>
                  <div className={`max-w-[78%] px-3.5 py-2 ${isMe
                    ? `bg-foreground text-background ${isLastInGroup ? "rounded-2xl rounded-br-md" : "rounded-2xl"}`
                    : `bg-secondary border border-border/40 text-foreground ${isLastInGroup ? "rounded-2xl rounded-bl-md" : "rounded-2xl"}`
                  }`}>
                    {msg.images && msg.images.map((img, i) => (
                      <img key={i} src={img} className="rounded-xl mb-1.5 max-w-full" alt="" />
                    ))}
                    {msg.text && <p className="text-[14px] leading-relaxed">{msg.text}</p>}
                    <div className={`flex items-center gap-1 mt-0.5 ${isMe ? "justify-end" : "justify-start"}`}>
                      <span className={`text-[10px] ${isMe ? "opacity-60" : "text-muted-foreground/50"}`}>{msg.timestamp}</span>
                      {isMe && (
                        <span className="text-[10px]">
                          {msg.status === "seen" ? "✓✓" : msg.status === "delivered" ? "✓✓" : "✓"}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div className="flex justify-start mb-4">
              <div className="bg-secondary border border-border/40 rounded-2xl px-4 py-3 flex items-center gap-1.5">
                {[0, 180, 360].map(delay => (
                  <div key={delay} className="w-2 h-2 rounded-full bg-muted-foreground animate-typing-bounce" style={{ animationDelay: `${delay}ms` }} />
                ))}
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="sticky bottom-0 bg-gradient-to-t from-background via-background/90 to-transparent pb-6 pt-4 px-4">
          <div className="flex items-center gap-2">
            <div className="flex-1 flex items-center gap-2 rounded-full px-4 py-2.5" style={blurStyle}>
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && sendMessage()}
                placeholder="Type here"
                className="flex-1 bg-transparent text-[15px] text-foreground placeholder:text-muted-foreground/70 outline-none px-1"
              />
              {input.trim() ? (
                <button onClick={sendMessage} className="text-primary hover:text-primary/80 transition-colors"><FiSend size={20} /></button>
              ) : (
                <button className="text-muted-foreground hover:text-foreground transition-colors"><FiCamera size={20} /></button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatPage;
