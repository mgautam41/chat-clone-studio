import { Menu, MoreHorizontal, ChevronDown, X, Wifi, Phone, MessageSquare, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { currentUser, users, latestMessages } from "@/data/chatData";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-20 max-w-lg mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <Menu size={22} className="text-foreground" />
        <div className="flex items-center gap-2">
          <img src={currentUser.avatar} alt="" className="w-8 h-8 rounded-full object-cover" />
          <span className="font-semibold text-foreground">{currentUser.name}</span>
          <ChevronDown size={16} className="text-muted-foreground" />
        </div>
        <MoreHorizontal size={22} className="text-foreground" />
      </div>

      {/* Quick Actions Grid */}
      <div className="px-4 mt-4 grid grid-cols-2 gap-3">
        <div className="bg-card rounded-xl p-4 border border-border">
          <div className="flex items-center gap-1 mb-2">
            <span className="text-xs text-muted-foreground">⋮⋮</span>
            <span className="font-medium text-sm text-foreground">Channels</span>
          </div>
        </div>
        <div className="bg-card rounded-xl p-4 border border-border">
          <div className="flex items-center gap-1 mb-2">
            <span className="text-xs text-muted-foreground">⋮⋮</span>
            <span className="font-medium text-sm text-foreground">Threads</span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <MessageSquare size={14} className="text-muted-foreground" />
            <span className="text-xs text-muted-foreground">4 new threads</span>
          </div>
        </div>
      </div>

      {/* Calls Card */}
      <div className="px-4 mt-3">
        <div className="bg-card rounded-xl p-4 border border-border">
          <div className="flex items-center gap-1 mb-3">
            <span className="text-xs text-muted-foreground">⋮⋮</span>
            <span className="font-medium text-sm text-foreground">Calls</span>
            <div className="ml-auto flex items-center gap-1">
              <div className="flex -space-x-1">
                {users.slice(0, 2).map(u => (
                  <img key={u.id} src={u.avatar} className="w-5 h-5 rounded-full border-2 border-card" alt="" />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">2+</span>
            </div>
          </div>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Wifi size={14} />
              <span>2 Channels</span>
            </div>
            <div className="flex items-center gap-1">
              <Phone size={14} />
              <span>1 ongoing call</span>
            </div>
          </div>
        </div>
      </div>

      {/* Work as a team banner */}
      <div className="px-4 mt-3">
        <div className="bg-card rounded-xl p-4 border border-border relative">
          <button className="absolute top-3 right-3 text-muted-foreground">
            <X size={16} />
          </button>
          <h3 className="font-semibold text-sm text-foreground">Work as a team</h3>
          <p className="text-xs text-muted-foreground mt-1">Get members onboard and work together</p>
          <button className="mt-3 bg-primary text-primary-foreground text-xs font-medium px-4 py-2 rounded-full">
            Invite
          </button>
        </div>
      </div>

      {/* Meeting & Task */}
      <div className="px-4 mt-3 grid grid-cols-2 gap-3">
        <div className="bg-card rounded-xl p-4 border border-border">
          <div className="flex items-center gap-1 mb-1">
            <span className="text-xs text-muted-foreground">⋮⋮</span>
            <span className="font-medium text-sm text-foreground">Meeting with</span>
          </div>
          <span className="text-xs text-muted-foreground">#team-design</span>
          <div className="mt-2">
            <span className="text-[10px] text-muted-foreground">9:00 AM</span>
            <p className="text-[10px] text-muted-foreground mt-1">Meeting Link</p>
            <button className="mt-2 bg-primary text-primary-foreground text-[10px] font-medium px-3 py-1.5 rounded-full">
              Go to meeting
            </button>
          </div>
        </div>
        <div className="bg-card rounded-xl p-4 border border-border">
          <div className="flex items-center gap-1 mb-1">
            <span className="text-xs text-muted-foreground">⋮⋮</span>
            <span className="font-medium text-sm text-foreground">Assign Task</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">Add teammates, assign roles, and track easily.</p>
          <div className="mt-3 flex items-center gap-2">
            <div className="flex -space-x-1">
              {users.slice(0, 3).map(u => (
                <img key={u.id} src={u.avatar} className="w-5 h-5 rounded-full border-2 border-card" alt="" />
              ))}
            </div>
            <span className="text-[10px] text-muted-foreground">100+ people</span>
          </div>
        </div>
      </div>

      {/* Latest Messages */}
      <div className="px-4 mt-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-sm">🏷</span>
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

export default HomePage;
