import { useState } from "react";
import { Check, X, Bell, PhoneMissed, Heart, MessageCircle, UserPlus, Video } from "lucide-react";
import { toast } from "sonner";
import { fakeActivities, getUserById, FakeActivity } from "@/data/fakeData";

const ActivityPage = () => {
  const [activities, setActivities] = useState<FakeActivity[]>(fakeActivities);

  const pendingRequests = activities.filter(a => a.type === "connection_request" && a.status === "pending");
  const otherActivities = activities.filter(a => a.type !== "connection_request" || a.status !== "pending");
  const unreadCount = activities.filter(a => !a.isRead).length;

  const handleRequest = (id: string, action: "accepted" | "rejected") => {
    setActivities(prev => prev.map(a => a.id === id ? { ...a, status: action, isRead: true } : a));
    toast.success(action === "accepted" ? "Connection accepted!" : "Request declined");
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "accepted": return UserPlus;
      case "missed_call": return PhoneMissed;
      case "liked_photo": return Heart;
      case "message": return MessageCircle;
      default: return Bell;
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case "accepted": return "text-green-500 bg-green-500/10";
      case "missed_call": return "text-red-500 bg-red-500/10";
      case "liked_photo": return "text-pink-500 bg-pink-500/10";
      case "message": return "text-blue-500 bg-blue-500/10";
      default: return "text-foreground bg-secondary";
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24 max-w-[430px] mx-auto">
      {/* Header */}
      <div className="px-5 pt-6 pb-2 flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Activity</h1>
        {unreadCount > 0 && (
          <span className="shrink-0 bg-destructive text-destructive-foreground text-[10px] font-bold min-w-[20px] min-h-[20px] rounded-full flex items-center justify-center px-1">{unreadCount}</span>
        )}
      </div>

      {/* Pending requests */}
      {pendingRequests.length > 0 && (
        <div className="mt-5 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="px-5 mb-3 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Contact Requests</span>
            <span className="text-xs text-muted-foreground font-medium">{pendingRequests.length} pending</span>
          </div>
          <div className="flex flex-col gap-1 px-3">
            {pendingRequests.map(req => {
              const u = getUserById(req.userId);
              if (!u) return null;
              return (
                <div key={req.id} className="flex items-center gap-3.5 px-3 py-3.5 bg-secondary/30 rounded-2xl border border-border/50 backdrop-blur-sm">
                  <img src={u.avatar} className="w-11 h-11 rounded-full object-cover shrink-0 shadow-sm border border-border/10" alt={u.name} />
                  <div className="flex-1 min-w-0 text-left">
                    <p className="font-bold text-sm text-foreground leading-tight">{u.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5 opacity-80">{req.text}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button onClick={() => handleRequest(req.id, "rejected")} className="w-9 h-9 rounded-full bg-secondary text-muted-foreground flex items-center justify-center hover:bg-destructive/10 hover:text-destructive transition-all active:scale-90">
                      <X size={16} />
                    </button>
                    <button onClick={() => handleRequest(req.id, "accepted")} className="w-9 h-9 rounded-full bg-foreground text-background flex items-center justify-center active:scale-95 transition-all shadow-md">
                      <Check size={16} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Other activities */}
      {otherActivities.length > 0 && (
        <div className="mt-6">
          <div className="px-5 mb-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Recent</span>
          </div>
          <div className="flex flex-col">
            {otherActivities.map(act => {
              const u = getUserById(act.userId);
              if (!u) return null;
              const Icon = getIcon(act.type);
              const iconClasses = getIconColor(act.type);

              return (
                <div key={act.id} className={`flex items-center gap-3.5 px-5 py-3.5 border-b border-border/30 last:border-0 ${!act.isRead ? "bg-secondary/10" : ""}`}>
                  <div className="relative shrink-0">
                    <img src={u.avatar} className="w-11 h-11 rounded-full object-cover" alt={u.name} />
                    <div className={`absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full flex items-center justify-center border-2 border-background ${iconClasses}`}>
                      <Icon size={10} />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-[13px] leading-snug ${!act.isRead ? "font-semibold text-foreground" : "text-muted-foreground"}`}>
                      <span className="font-bold text-foreground">{u.name}</span>{" "}{act.text}
                    </p>
                    <p className="text-[11px] text-muted-foreground/60 mt-0.5">{act.time}</p>
                  </div>
                  {!act.isRead && <div className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Empty state */}
      {pendingRequests.length === 0 && otherActivities.length === 0 && (
        <div className="flex flex-col items-center justify-center py-32 gap-4 px-8 text-center">
          <div className="w-16 h-16 rounded-[22px] bg-secondary flex items-center justify-center rotate-3 shadow-inner">
            <Bell size={24} className="text-muted-foreground/60" />
          </div>
          <p className="font-bold text-base text-foreground">All caught up</p>
          <p className="text-xs text-muted-foreground max-w-[200px] mt-1">No new activity to show right now.</p>
        </div>
      )}
    </div>
  );
};

export default ActivityPage;
