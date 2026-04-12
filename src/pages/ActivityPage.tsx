import { useState } from "react";
import { Check, X, Bell, PhoneMissed, Video, ShieldAlert } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../lib/api";
import { useAuth } from "../lib/auth";



const ActivityPage = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: connections = [], isLoading: loadingConnections } = useQuery({
    queryKey: ["connections"],
    queryFn: async () => {
      const res = await api.get("/connections");
      return res.data; // Assuming it returns pending requests
    }
  });

  const { data: notifications = [], isLoading: loadingNotifications } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const res = await api.get("/notifications");
      return res.data;
    }
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: "accepted" | "rejected" }) => {
      return api.put(`/connections/${id}`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["connections"] });
      queryClient.invalidateQueries({ queryKey: ["chats"] });
    }
  });

  const pendingRequests = connections.filter((c: any) => c.status === "pending" && c.recipientId === user?._id);
  const unreadCount = pendingRequests.length + notifications.filter((n: any) => !n.isRead).length;

  const isLoading = loadingConnections || loadingNotifications;

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
      {pendingRequests.length > 0 && (
        <div className="mt-5">
          <div className="px-5 mb-3 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Message Requests
            </span>
            <span className="text-xs text-muted-foreground">{pendingRequests.length} pending</span>
          </div>
          <div className="flex flex-col">
            {pendingRequests.map((req: any) => (
              <div
                key={req._id}
                className="flex items-center gap-3.5 px-5 py-3.5 border-b border-border last:border-0"
              >
                <img
                  src={req.requesterId.avatar || "https://i.pravatar.cc/150"}
                  className="w-11 h-11 rounded-full object-cover shrink-0"
                  alt={req.requesterId.name}
                />
                <div className="flex-1 min-w-0 text-left">
                  <p className="font-semibold text-sm text-foreground leading-tight">{req.requesterId.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">wants to connect with you</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => updateStatusMutation.mutate({ id: req._id, status: "rejected" })}
                    className="w-9 h-9 rounded-full bg-secondary text-muted-foreground flex items-center justify-center hover:bg-destructive/10 hover:text-destructive transition-colors active:scale-95"
                  >
                    <X size={16} />
                  </button>
                  <button
                    onClick={() => updateStatusMutation.mutate({ id: req._id, status: "accepted" })}
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

      {/* Notifications */}
      {notifications.length > 0 && (
        <div className="mt-2">
          <div className="px-5 mb-2 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Alerts
            </span>
          </div>
          <div className="flex flex-col">
            {notifications.map((act: any) => {
              const Icon = act.type === "message" ? Bell : ShieldAlert;
              return (
                <button
                  key={act._id}
                  className={`flex items-center gap-3.5 px-5 py-3.5 border-b border-border last:border-0 text-left active:bg-secondary/40 transition-colors ${!act.isRead ? "bg-secondary/20" : ""}`}
                >
                  <div className="w-11 h-11 rounded-full bg-secondary border border-border flex items-center justify-center shrink-0">
                    <Icon size={18} className="text-foreground" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className={`text-[13px] leading-tight ${act.isRead ? "opacity-80" : "font-medium"}`}>
                      {act.title} - {act.content}
                    </p>
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
      {!isLoading && pendingRequests.length === 0 && notifications.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 gap-3 px-8 text-center">
          <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center">
            <Bell size={22} className="text-muted-foreground" />
          </div>
          <p className="font-semibold text-sm text-foreground">No activity yet</p>
          <p className="text-xs text-muted-foreground">Message requests or alerts will appear here.</p>
        </div>
      )}
    </div>
  );
};

export default ActivityPage;