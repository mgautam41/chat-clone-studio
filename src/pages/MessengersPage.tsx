import { Search, MoreHorizontal, Heart, MessageSquare as MsgIcon, SlidersHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { users, latestMessages, threads } from "@/data/chatData";

const MessengersPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-20 max-w-lg mx-auto">
      {/* Header */}
      <div className="px-4 pt-4 pb-2">
        <h1 className="text-xl font-bold text-foreground">Messengers</h1>
      </div>

      {/* Search */}
      <div className="px-4 mt-2">
        <div className="flex items-center gap-2 bg-secondary rounded-xl px-3 py-2.5">
          <Search size={16} className="text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Search</span>
          <SlidersHorizontal size={16} className="text-muted-foreground ml-auto" />
        </div>
      </div>

      {/* People in conversation */}
      <div className="px-4 mt-4">
        <div className="flex items-center gap-4 overflow-x-auto pb-2">
          <div className="flex flex-col items-center gap-1 min-w-[60px]">
            <div className="w-12 h-12 rounded-full border-2 border-success flex items-center justify-center bg-secondary">
              <span className="text-xs text-muted-foreground font-medium">2</span>
            </div>
            <span className="text-[9px] text-muted-foreground text-center leading-tight">people in conversation</span>
          </div>
          {users.slice(3, 7).map((user) => (
            <button
              key={user.id}
              onClick={() => navigate(`/chat/${user.id}`)}
              className="flex flex-col items-center gap-1 min-w-[60px]"
            >
              <div className="relative">
                <img src={user.avatar} className="w-12 h-12 rounded-full object-cover" alt="" />
                {user.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-success rounded-full border-2 border-card" />}
              </div>
              <span className="text-[10px] text-foreground font-medium text-center leading-tight truncate w-[60px]">
                {user.name.split(" ")[0]} {user.name.split(" ")[1]?.[0] ? user.name.split(" ").slice(1).join(" ") : ""}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Thread */}
      <div className="px-4 mt-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-sm">💬</span>
            <span className="font-semibold text-sm text-foreground">Recent Thread</span>
          </div>
          <MoreHorizontal size={18} className="text-muted-foreground" />
        </div>
        <div className="overflow-x-auto">
          <div className="flex gap-3">
            {threads.map((thread) => {
              const user = users.find(u => u.id === thread.userId);
              return (
                <div key={thread.id} className="bg-card rounded-xl p-4 border border-border min-w-[280px]">
                  <div className="flex items-center gap-2 mb-2">
                    <img src={user?.avatar} className="w-8 h-8 rounded-full" alt="" />
                    <div>
                      <p className="text-sm font-medium text-foreground">{user?.name}</p>
                      <p className="text-[10px] text-muted-foreground">{thread.time}</p>
                    </div>
                  </div>
                  <p className="text-sm text-foreground leading-snug">{thread.text}</p>
                  {thread.attachment && (
                    <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                      <span>🖼</span>
                      <span>{thread.attachment}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-4 mt-3 pt-3 border-t border-border">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Heart size={14} />
                      <span>{thread.likes}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MsgIcon size={14} />
                      <span>{thread.comments}</span>
                    </div>
                    <button className="ml-auto text-xs font-medium text-foreground border border-border rounded-full px-3 py-1">
                      Go to thread →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Latest Message */}
      <div className="px-4 mt-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-sm">💬</span>
            <span className="font-semibold text-sm text-foreground">Latest Message</span>
          </div>
          <MoreHorizontal size={18} className="text-muted-foreground" />
        </div>
        <div className="space-y-1">
          {latestMessages.map((msg) => {
            const user = users.find(u => u.id === msg.userId);
            if (!user) return null;
            return (
              <button
                key={msg.userId}
                onClick={() => navigate(`/chat/${user.id}`)}
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-secondary transition-colors"
              >
                <div className="relative">
                  <img src={user.avatar} className="w-10 h-10 rounded-full object-cover" alt="" />
                  {user.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-success rounded-full border-2 border-card" />}
                </div>
                <div className="flex-1 text-left">
                  <p className="font-medium text-sm text-foreground">{user.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{msg.text}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-[10px] text-muted-foreground">{msg.time}</span>
                  {msg.unread > 0 && (
                    <span className="bg-badge text-badge-foreground text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                      {msg.unread}
                    </span>
                  )}
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
