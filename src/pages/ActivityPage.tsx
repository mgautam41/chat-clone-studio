import { useState } from "react";
import { Check, X } from "lucide-react";
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

  return (
    <div className="min-h-screen bg-background pb-20 max-w-[430px] mx-auto">
      <div className="px-4 pt-4 pb-2">
        <h1 className="text-xl font-bold text-foreground">Activity</h1>
      </div>

      <div className="px-4 mt-2">
        <p className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
          Connection Requests
        </p>

        <div className="space-y-2">
          {requests.map((req) => (
            <div
              key={req.id}
              className="flex items-center gap-3 bg-card rounded-xl p-3 border border-border"
            >
              <img
                src={req.user.avatar}
                className="w-11 h-11 rounded-full object-cover"
                alt=""
              />
              <div className="flex-1">
                <p className="font-medium text-sm text-foreground">
                  {req.user.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {req.status === "pending"
                    ? "wants to connect with you"
                    : req.status === "accepted"
                    ? "You accepted the request ✓"
                    : "You declined the request"}
                </p>
              </div>

              {req.status === "pending" ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateStatus(req.id, "accepted")}
                    className="w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center active:scale-95 transition-transform"
                  >
                    <Check size={16} />
                  </button>
                  <button
                    onClick={() => updateStatus(req.id, "rejected")}
                    className="w-9 h-9 rounded-full bg-secondary text-muted-foreground flex items-center justify-center active:scale-95 transition-transform"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <span
                  className={`text-xs font-medium px-2 py-1 rounded-full ${
                    req.status === "accepted"
                      ? "bg-success/15 text-success"
                      : "bg-destructive/15 text-destructive"
                  }`}
                >
                  {req.status === "accepted" ? "Accepted" : "Declined"}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActivityPage;
