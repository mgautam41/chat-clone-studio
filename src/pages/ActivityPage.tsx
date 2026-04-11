import { useState } from "react";
import { Check, X, Bell } from "lucide-react";
import { users } from "@/data/chatData";

interface ChatRequest {
  id: string;
  user: (typeof users)[0];
  status: "pending" | "accepted" | "rejected";
}

const initialRequests: ChatRequest[] = [
  { id: "r1", user: users[2], status: "pending" },
  { id: "r2", user: users[5], status: "pending" },
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

  return (
    <div className="min-h-screen bg-background pb-24 max-w-[430px] mx-auto">

      {/* Header */}
      <div className="px-5 pt-6 pb-2 flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Activity</h1>
        {pending.length > 0 && (
          <span className="shrink-0 bg-foreground text-background text-[9px] font-bold min-w-[18px] min-h-[18px] rounded-full flex items-center justify-center px-1">
            {pending.length}
          </span>
        )}
      </div>

      {/* Pending requests */}
      {pending.length > 0 && (
        <div className="mt-5">
          <div className="px-5 mb-3 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Connection Requests
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
                  <p className="text-xs text-muted-foreground mt-0.5">wants to connect with you</p>
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
              Earlier
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
                      ? "You accepted the request"
                      : "You declined the request"}
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

      {/* Empty state */}
      {requests.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 gap-3 px-8 text-center">
          <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center">
            <Bell size={22} className="text-muted-foreground" />
          </div>
          <p className="font-semibold text-sm text-foreground">No activity yet</p>
          <p className="text-xs text-muted-foreground">Connection requests will appear here.</p>
        </div>
      )}
    </div>
  );
};

export default ActivityPage;