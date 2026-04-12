import { useState } from "react";
import { Check, X, Bell, PhoneMissed, Video, ShieldAlert } from "lucide-react";
import { users } from "@/data/chatData";

interface ChatRequest {
  id: string;
  user: (typeof users)[0];
  status: "pending" | "accepted" | "rejected";
}

interface ActivityItem {
  id: string;
  user?: (typeof users)[0];
  type: "missed_voice" | "missed_video" | "security";
  text: string;
  time: string;
  isRead: boolean;
}

const initialRequests: ChatRequest[] = [
  { id: "r1", user: users[2], status: "pending" },
];

const mockActivities: ActivityItem[] = [
  {
    id: "a1",
    user: users[3],
    type: "missed_voice",
    text: "Missed voice call",
    time: "2m ago",
    isRead: false,
  },
  {
    id: "a2",
    user: users[1],
    type: "missed_video",
    text: "Missed video call",
    time: "1h ago",
    isRead: false,
  },
  {
    id: "a3",
    type: "security",
    text: "Security code changed. Tap to learn more.",
    time: "1d ago",
    isRead: true,
  }
];

const ActivityPage = () => {
  const [requests, setRequests] = useState<ChatRequest[]>(initialRequests);

  const updateStatus = (id: string, status: "accepted" | "rejected") => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
  };

  const pending = requests.filter((r) => r.status === "pending");
  const done = requests.filter((r) => r.status !== "pending");
  const unreadCount = pending.length + mockActivities.filter(a => !a.isRead).length;

  return (
    <div className="min-h-screen bg-background pb-24 max-w-[430px] mx-auto">

      {/* Header */}
      <div className="px-5 pt-6 pb-2 flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Activity</h1>
        {unreadCount > 0 && (
          <span className="shrink-0 bg-destructive text-destructive-foreground text-[10px] font-bold min-w-[20px] min-h-[20px] rounded-full flex items-center justify-center px-1">
            {unreadCount}
          </span>
        )}
      </div>

      {/* Pending requests */}
      {pending.length > 0 && (
        <div className="mt-5">
          <div className="px-5 mb-3 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Message Requests
            </span>
            <span className="text-xs text-muted-foreground">{pending.length} pending</span>
          </div>
          <div className="flex flex-col">
            {pending.map((req) => (
              <div
                key={req.id}
                className="flex items-center gap-3.5 px-5 py-3.5 border-b border-border last:border-0"
              >
                <img
                  src={req.user.avatar}
                  className="w-11 h-11 rounded-full object-cover shrink-0"
                  alt={req.user.name}
                />
                <div className="flex-1 min-w-0 text-left">
                  <p className="font-semibold text-sm text-foreground leading-tight">{req.user.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">wants to chat with you</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => updateStatus(req.id, "rejected")}
                    className="w-9 h-9 rounded-full bg-secondary text-muted-foreground flex items-center justify-center hover:bg-destructive/10 hover:text-destructive transition-colors active:scale-95"
                  >
                    <X size={16} />
                  </button>
                  <button
                    onClick={() => updateStatus(req.id, "accepted")}
                    className="w-9 h-9 rounded-full bg-foreground text-background flex items-center justify-center active:scale-95 transition-transform"
                  >
                    <Check size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Divider */}
      {pending.length > 0 && done.length > 0 && (
        <div className="mx-5 mt-5 border-t border-border" />
      )}

      {/* Resolved */}
      {done.length > 0 && (
        <div className="mt-4">
          <div className="px-5 mb-3 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Earlier requests
            </span>
            <span className="text-xs text-muted-foreground">{done.length} resolved</span>
          </div>
          <div className="flex flex-col">
            {done.map((req) => (
              <div
                key={req.id}
                className="flex items-center gap-3.5 px-5 py-3.5 border-b border-border last:border-0"
              >
                <img
                  src={req.user.avatar}
                  className="w-11 h-11 rounded-full object-cover shrink-0 opacity-50"
                  alt={req.user.name}
                />
                <div className="flex-1 min-w-0 text-left">
                  <p className="font-semibold text-sm text-foreground leading-tight">{req.user.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {req.status === "accepted"
                      ? "You accepted the message request"
                      : "You declined the message request"}
                  </p>
                </div>
                <span
                  className={`text-[10px] font-semibold px-2.5 py-1 rounded-full shrink-0 ${req.status === "accepted"
                      ? "bg-green-500/10 text-green-600 dark:text-green-400"
                      : "bg-destructive/10 text-destructive"
                    }`}
                >
                  {req.status === "accepted" ? "Accepted" : "Declined"}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Divider */}
      {(pending.length > 0 || done.length > 0) && mockActivities.length > 0 && (
        <div className="mx-5 my-3 border-t border-border" />
      )}

      {/* General Notifications */}
      {mockActivities.length > 0 && (
        <div className="mt-2">
          <div className="px-5 mb-2 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Calls & Alerts
            </span>
          </div>
          <div className="flex flex-col">
            {mockActivities.map((act) => {
              const Icon = act.type === "missed_voice" ? PhoneMissed : 
                          act.type === "missed_video" ? Video : ShieldAlert;
              const iconColor = act.type === "missed_voice" ? "bg-red-500 text-white" : 
                                act.type === "missed_video" ? "bg-red-500 text-white" : "bg-slate-500 text-white";

              return (
                <button
                  key={act.id}
                  className={`flex items-center gap-3.5 px-5 py-3.5 border-b border-border last:border-0 text-left active:bg-secondary/40 transition-colors ${!act.isRead ? "bg-secondary/20" : ""}`}
                >
                  <div className="relative shrink-0">
                    {act.user ? (
                      <img src={act.user.avatar} className="w-11 h-11 rounded-full object-cover" alt="" />
                    ) : (
                      <div className="w-11 h-11 rounded-full bg-secondary border border-border flex items-center justify-center">
                        <ShieldAlert size={18} className="text-foreground" />
                      </div>
                    )}
                    <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-[2px] border-background flex items-center justify-center ${iconColor}`}>
                      <Icon size={9} strokeWidth={3} />
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className={`text-[13px] leading-tight ${act.type.includes("missed") ? "text-red-500" : "text-foreground"} ${act.isRead ? "opacity-80" : "font-medium"}`}>
                      {act.user && <span className="font-semibold text-foreground">{act.user.name} </span>}
                      {act.text}
                    </p>
                    <p className="text-[11px] text-muted-foreground mt-1">{act.time}</p>
                  </div>
                  
                  {!act.isRead && (
                    <div className="w-2 h-2 rounded-full bg-blue-500 shrink-0 ml-2" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Empty state */}
      {requests.length === 0 && mockActivities.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 gap-3 px-8 text-center">
          <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center">
            <Bell size={22} className="text-muted-foreground" />
          </div>
          <p className="font-semibold text-sm text-foreground">No activity yet</p>
          <p className="text-xs text-muted-foreground">Message requests or missed calls will appear here.</p>
        </div>
      )}
    </div>
  );
};

export default ActivityPage;