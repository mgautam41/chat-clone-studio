import { Search, SlidersHorizontal, PenSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { users, latestMessages } from "@/data/chatData";

const MessengersPage = () => {
  const navigate = useNavigate();
  const onlineUsers = users.filter((u) => u.online);

  return (
    <div className="min-h-screen bg-background pb-24 max-w-[430px] mx-auto">

      {/* Header */}
      <div className="px-5 pt-6 pb-2 flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Messages</h1>
        <button className="w-9 h-9 flex items-center justify-center rounded-full bg-secondary text-muted-foreground hover:text-foreground transition-colors">
          <PenSquare size={17} />
        </button>
      </div>

      {/* Search */}
      <div className="px-5 mt-3">
        <div className="flex items-center gap-2.5 bg-secondary rounded-2xl px-4 py-3">
          <Search size={15} className="text-muted-foreground shrink-0" />
          <span className="text-sm text-muted-foreground flex-1">Search conversations…</span>
          <div className="w-px h-4 bg-border" />
          <SlidersHorizontal size={15} className="text-muted-foreground shrink-0" />
        </div>
      </div>

      {/* Online now */}
      <div className="mt-5">
        <div className="px-5 mb-3 flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Online now
          </span>
          <span className="text-xs text-muted-foreground">{onlineUsers.length} active</span>
        </div>
        <div className="px-5 flex gap-4 overflow-x-auto pb-1 scrollbar-none">
          {onlineUsers.map((user) => (
            <button
              key={user.id}
              onClick={() => navigate(`/chat/${user.id}`)}
              className="flex flex-col items-center gap-1.5 min-w-[52px] group"
            >
              <div className="relative">
                <div className="w-13 h-13 rounded-full p-[2px] bg-gradient-to-br from-green-400 to-emerald-500">
                  <img
                    src={user.avatar}
                    className="w-full h-full rounded-full object-cover border-2 border-background"
                    alt={user.name}
                  />
                </div>
                <div className="absolute bottom-0.5 right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-background" />
              </div>
              <span className="text-[10px] text-muted-foreground font-medium group-hover:text-foreground transition-colors truncate w-[52px] text-center leading-tight">
                {user.name.split(" ")[0]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="mx-5 mt-5 border-t border-border" />

      {/* Latest Messages */}
      <div className="mt-4">
        <div className="px-5 mb-3 flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            All Messages
          </span>
          <span className="text-xs text-muted-foreground">{latestMessages.length} chats</span>
        </div>
        <div className="flex flex-col">
          {latestMessages.map((msg) => {
            const user = users.find((u) => u.id === msg.userId);
            if (!user) return null;
            return (
              <button
                key={msg.userId}
                onClick={() => navigate(`/chat/${user.id}`)}
                className="w-full flex items-center gap-3.5 px-5 py-3.5 hover:bg-secondary transition-colors"
              >
                <div className="relative shrink-0">
                  <img
                    src={user.avatar}
                    className="w-11 h-11 rounded-full object-cover"
                    alt={user.name}
                  />
                  {user.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                  )}
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <div className="flex items-center justify-between mb-0.5">
                    <p className="font-semibold text-sm text-foreground leading-tight">{user.name}</p>
                    <span className="text-[10px] text-muted-foreground shrink-0 ml-2">{msg.time}</span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs text-muted-foreground truncate leading-relaxed">{msg.text}</p>
                    {msg.unread > 0 && (
                      <span className="shrink-0 bg-foreground text-background text-[9px] font-bold min-w-[18px] min-h-[18px] rounded-full flex items-center justify-center px-1">
                        {msg.unread}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MessengersPage;