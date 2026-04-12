import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { users, latestMessages } from "@/data/chatData";
import { FiSearch, FiMoreVertical, FiPlus, FiX } from "react-icons/fi";
import { BsCheckAll, BsPinFill } from "react-icons/bs";
import gsap from "gsap";

const MessengersPage = () => {
  const navigate = useNavigate();
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const titleRef = useRef<HTMLHeadingElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const moreBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isSearching) {
      // Fade out title and more button simultaneously
      gsap.to(titleRef.current, {
        opacity: 0,
        x: -8,
        duration: 0.22,
        ease: "expo.inOut",
      });
      gsap.to(moreBtnRef.current, {
        width: 0,
        opacity: 0,
        marginLeft: 0,
        duration: 0.25,
        ease: "expo.inOut",
      });

      // Expand search container
      gsap.to(searchContainerRef.current, {
        width: "100%",
        duration: 0.38,
        ease: "expo.inOut",
        onComplete: () => {
          searchInputRef.current?.focus();
        },
      });

      // Show input and close button after container expands
      gsap.set([searchInputRef.current, closeBtnRef.current], {
        display: "block",
      });
      gsap.to([searchInputRef.current, closeBtnRef.current], {
        opacity: 1,
        duration: 0.2,
        delay: 0.22,
      });
    } else {
      // Fade out input and close button first
      gsap.to([searchInputRef.current, closeBtnRef.current], {
        opacity: 0,
        duration: 0.15,
        onComplete: () => {
          gsap.set([searchInputRef.current, closeBtnRef.current], {
            display: "none",
          });
        },
      });

      // Collapse search container slightly after
      gsap.to(searchContainerRef.current, {
        width: "40px",
        duration: 0.35,
        ease: "expo.inOut",
        delay: 0.08,
      });

      // Bring back title and more button together
      gsap.to(titleRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.28,
        ease: "expo.out",
        delay: 0.18,
      });
      gsap.to(moreBtnRef.current, {
        width: "40px",
        opacity: 1,
        marginLeft: 8,
        duration: 0.28,
        ease: "expo.out",
        delay: 0.18,
      });
    }
  }, [isSearching]);

  const onlineUsers = users.filter((u) => u.online);

  const filteredMessages = latestMessages.filter((msg) => {
    if (!searchQuery) return true;
    const user = users.find((u) => u.id === msg.userId);
    if (!user) return false;
    return (
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.text.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="min-h-screen bg-background pb-28 max-w-[430px] mx-auto font-sans">
      {/* Header */}
      <div className="px-5 pt-6 pb-2 min-h-[64px] grid items-center">
        <h1
          ref={titleRef}
          className="col-start-1 row-start-1 text-2xl font-bold tracking-tight text-foreground z-0 justify-self-start outline-none"
          style={{ pointerEvents: isSearching ? "none" : "auto" }}
        >
          Chats
        </h1>

        <div className="col-start-1 row-start-1 flex items-center justify-end w-full z-10">
          <div
            ref={searchContainerRef}
            className="flex items-center bg-secondary/80 rounded-[99px] backdrop-blur-md overflow-hidden relative"
            style={{ width: "40px", height: "40px" }}
          >
            <button
              onClick={() => !isSearching && setIsSearching(true)}
              className="w-10 h-10 shrink-0 flex items-center justify-center z-10"
              style={{ cursor: isSearching ? "default" : "pointer" }}
            >
              <FiSearch
                size={isSearching ? 18 : 20}
                className={`transition-all duration-300 ${isSearching ? "text-muted-foreground mr-1" : "text-foreground"
                  }`}
              />
            </button>
            <input
              ref={searchInputRef}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search chats..."
              className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none absolute left-10 right-10 top-0 bottom-0 pr-2"
              style={{ display: "none", opacity: 0 }}
            />
            <button
              ref={closeBtnRef}
              onClick={(e) => {
                e.stopPropagation();
                setIsSearching(false);
                setSearchQuery("");
              }}
              className="w-10 h-10 shrink-0 flex items-center justify-center transition-colors absolute right-0 top-0 text-muted-foreground hover:text-foreground"
              style={{ display: "none", opacity: 0 }}
            >
              <FiX size={18} />
            </button>
          </div>

          <button
            ref={moreBtnRef}
            className="w-10 h-10 overflow-hidden flex items-center justify-center rounded-full bg-secondary/80 text-foreground transition-colors backdrop-blur-md active:scale-95 shrink-0 ml-2"
          >
            <div className="w-10 flex shrink-0 items-center justify-center">
              <FiMoreVertical size={20} />
            </div>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="px-5 pb-6 flex items-center gap-2.5 overflow-x-auto scrollbar-none">
        {["All", "Favorites", "Work", "Groups", "Communities"].map(
          (filter, i) => (
            <button
              key={filter}
              className={`shrink-0 px-4 py-1.5 rounded-full text-[14px] transition-colors font-medium ${i === 0
                ? "bg-foreground/20 text-foreground"
                : "bg-secondary/40 text-muted-foreground hover:bg-secondary/60"
                }`}
            >
              {filter}
            </button>
          )
        )}
        <button className="shrink-0 w-[30px] h-[30px] rounded-full bg-secondary/40 text-muted-foreground hover:bg-secondary/60 flex items-center justify-center transition-colors">
          <FiPlus size={16} />
        </button>
      </div>

      {/* Chat List */}
      <div className="flex flex-col pb-6">
        {filteredMessages.length === 0 && (
          <div className="px-5 py-12 text-center flex flex-col items-center gap-2">
            <FiSearch size={32} className="text-muted-foreground/30" />
            <p className="text-sm font-medium text-foreground">
              No chats found
            </p>
          </div>
        )}

        {filteredMessages.map((msg) => {
          const user = users.find((u) => u.id === msg.userId);
          if (!user) return null;

          // Always use the original index from latestMessages so display
          // logic (pin, unread badge, sender label, ticks) stays correct
          // regardless of what the search filter returns.
          const idx = latestMessages.findIndex((m) => m.userId === msg.userId);

          const isPinned = !searchQuery && idx === 0;
          const unreadCount = isPinned
            ? 4
            : msg.unread > 0
              ? msg.unread
              : idx === 3
                ? 2
                : 0;

          const timeLabel =
            idx === 0
              ? "24 mins"
              : idx < 3
                ? "2 mins"
                : idx === 3
                  ? "12 mins"
                  : "20 mins";

          return (
            <button
              key={msg.userId}
              onClick={() => navigate(`/chat/${user.id}`)}
              className="w-full flex items-center gap-4 px-5 py-3.5 hover:bg-secondary/50 transition-colors group"
            >
              <div className="relative shrink-0">
                <img
                  src={user.avatar}
                  className="w-[58px] h-[58px] rounded-full object-cover"
                  alt={user.name}
                />
              </div>

              <div className="flex-1 min-w-0 text-left self-center mt-1 pb-1">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-semibold text-[16px] text-foreground leading-tight truncate pr-2">
                    {user.name}
                  </p>
                  <span
                    className={`text-[12px] shrink-0 ${unreadCount > 0
                      ? "text-foreground"
                      : "text-muted-foreground"
                      }`}
                  >
                    {timeLabel}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 justify-between">
                  <div className="flex items-center gap-1.5 truncate flex-1">
                    {/* Double-tick for sent messages (original indices 1 & 2) */}
                    {idx > 0 && idx < 3 && (
                      <BsCheckAll
                        size={20}
                        className="text-[#4E89F0] shrink-0"
                      />
                    )}

                    {/* Sender prefix labels */}
                    {idx === 0 && (
                      <span className="text-muted-foreground text-sm">
                        Khai :
                      </span>
                    )}
                    {idx === 4 && (
                      <span className="text-muted-foreground text-sm">
                        You :
                      </span>
                    )}

                    {/* Always use real message text from data */}
                    <p
                      className={`text-[14px] truncate ${unreadCount > 0 && idx === 0
                        ? "text-foreground font-medium"
                        : "text-muted-foreground"
                        }`}
                    >
                      {msg.text}
                    </p>
                  </div>

                  <div className="flex items-center gap-2.5 shrink-0 pl-2">
                    {isPinned && (
                      <BsPinFill size={14} className="text-muted-foreground" />
                    )}
                    {unreadCount > 0 && (
                      <span className="bg-[#24d366] text-white text-[11px] font-bold min-w-[20px] h-[20px] rounded-full flex items-center justify-center px-1">
                        {unreadCount}
                      </span>
                    )}
                  </div>
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