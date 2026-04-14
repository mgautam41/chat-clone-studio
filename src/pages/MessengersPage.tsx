import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch, FiX } from "react-icons/fi";
import { BsCheckAll } from "react-icons/bs";
import gsap from "gsap";
import { fakeUsers, fakeChatPreviews, getUserById } from "@/data/fakeData";

const MessengersPage = () => {
  const navigate = useNavigate();
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const titleRef = useRef<HTMLHeadingElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Active users (online)
  const activeUsers = fakeUsers.filter(u => u.online);

  useEffect(() => {
    if (isSearching) {
      gsap.to(titleRef.current, { opacity: 0, x: -8, duration: 0.22, ease: "expo.inOut" });
      gsap.to(searchContainerRef.current, { width: "100%", duration: 0.38, ease: "expo.inOut", onComplete: () => searchInputRef.current?.focus() });
      gsap.set([searchInputRef.current, closeBtnRef.current], { display: "block" });
      gsap.to([searchInputRef.current, closeBtnRef.current], { opacity: 1, duration: 0.2, delay: 0.22 });
    } else {
      gsap.to([searchInputRef.current, closeBtnRef.current], { opacity: 0, duration: 0.15, onComplete: () => gsap.set([searchInputRef.current, closeBtnRef.current], { display: "none" }) });
      gsap.to(searchContainerRef.current, { width: "40px", duration: 0.35, ease: "expo.inOut", delay: 0.08 });
      gsap.to(titleRef.current, { opacity: 1, x: 0, duration: 0.28, ease: "expo.out", delay: 0.18 });
    }
  }, [isSearching]);

  const filteredChats = fakeChatPreviews.filter(chat => {
    if (!searchQuery) return true;
    const u = getUserById(chat.userId);
    return u?.name.toLowerCase().includes(searchQuery.toLowerCase()) || chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-background pb-28 max-w-[430px] mx-auto font-sans">
      {/* Header */}
      <div className="px-5 pt-6 pb-2 min-h-[64px] grid items-center">
        <h1 ref={titleRef} className="col-start-1 row-start-1 text-2xl font-bold tracking-tight text-foreground z-0 justify-self-start" style={{ pointerEvents: isSearching ? "none" : "auto" }}>
          Chats
        </h1>
        <div className="col-start-1 row-start-1 flex items-center justify-end w-full z-10">
          <div ref={searchContainerRef} className="flex items-center bg-secondary/80 rounded-[99px] backdrop-blur-md overflow-hidden relative" style={{ width: "40px", height: "40px" }}>
            <button onClick={() => !isSearching && setIsSearching(true)} className="w-10 h-10 shrink-0 flex items-center justify-center z-10" style={{ cursor: isSearching ? "default" : "pointer" }}>
              <FiSearch size={isSearching ? 18 : 20} className={`transition-all duration-300 ${isSearching ? "text-muted-foreground mr-1" : "text-foreground"}`} />
            </button>
            <input ref={searchInputRef} value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search chats..." className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none absolute left-10 right-10 top-0 bottom-0 pr-2" style={{ display: "none", opacity: 0 }} />
            <button ref={closeBtnRef} onClick={e => { e.stopPropagation(); setIsSearching(false); setSearchQuery(""); }} className="w-10 h-10 shrink-0 flex items-center justify-center transition-colors absolute right-0 top-0 text-muted-foreground hover:text-foreground" style={{ display: "none", opacity: 0 }}>
              <FiX size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Active users horizontal bar */}
      <div className="px-5 pb-4 flex items-center gap-4 overflow-x-auto scrollbar-none">
        {activeUsers.map(u => (
          <button key={u._id} onClick={() => navigate(`/chat/${u._id}`)} className="flex flex-col items-center gap-1.5 shrink-0 group">
            <div className="relative">
              <img src={u.avatar} className="w-14 h-14 rounded-full object-cover border-2 border-transparent group-hover:border-foreground/20 transition-all" alt={u.name} />
              <div className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-[2.5px] border-background" />
            </div>
            <span className="text-[11px] text-muted-foreground font-medium max-w-[60px] truncate">{u.name.split(" ")[0]}</span>
          </button>
        ))}
      </div>

      {/* Chat List */}
      <div className="flex flex-col pb-6">
        {filteredChats.length === 0 && (
          <div className="px-5 py-12 text-center flex flex-col items-center gap-2">
            <FiSearch size={32} className="text-muted-foreground/30" />
            <p className="text-sm font-medium text-foreground">No chats found</p>
          </div>
        )}

        {filteredChats.map(chat => {
          const u = getUserById(chat.userId);
          if (!u) return null;

          return (
            <button key={chat.userId} onClick={() => navigate(`/chat/${u._id}`)} className="w-full flex items-center gap-4 px-5 py-3.5 hover:bg-secondary/50 transition-colors group">
              <div className="relative shrink-0">
                <img src={u.avatar} className="w-[54px] h-[54px] rounded-full object-cover" alt={u.name} />
                {u.online && <div className="absolute bottom-0.5 right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />}
              </div>
              <div className="flex-1 min-w-0 text-left self-center">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-semibold text-[15px] text-foreground leading-tight truncate pr-2">{u.name}</p>
                  <span className={`text-[12px] shrink-0 ${chat.unread > 0 ? "text-foreground font-bold" : "text-muted-foreground"}`}>{chat.time}</span>
                </div>
                <div className="flex items-center gap-1.5 justify-between">
                  <div className="flex items-center gap-1.5 truncate flex-1">
                    {chat.isSentByMe && (
                      <BsCheckAll size={18} className={chat.isRead ? "text-blue-500 shrink-0" : "text-muted-foreground shrink-0"} />
                    )}
                    <p className={`text-[13px] truncate ${chat.unread > 0 ? "text-foreground font-medium" : "text-muted-foreground"}`}>{chat.lastMessage}</p>
                  </div>
                  {chat.unread > 0 && (
                    <span className="bg-green-500 text-white text-[10px] font-bold min-w-[20px] h-[20px] rounded-full flex items-center justify-center px-1.5 shrink-0">{chat.unread}</span>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MessengersPage;
