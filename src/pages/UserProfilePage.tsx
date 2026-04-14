import { useState } from "react";
import { ArrowLeft, MessageCircle, Phone, Video } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserById, connectedUserIds } from "@/data/fakeData";
import { toast } from "sonner";

const UserProfilePage = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const user = getUserById(userId || "");
  const [requested, setRequested] = useState(false);
  const isConnected = connectedUserIds.has(userId || "");

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center max-w-[430px] mx-auto">
        <p className="text-muted-foreground">User not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background max-w-[430px] mx-auto pb-24">
      {/* Header */}
      <div className="px-5 pt-6 pb-4 flex items-center">
        <button onClick={() => navigate(-1)} className="w-9 h-9 flex items-center justify-center rounded-full bg-secondary text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft size={17} />
        </button>
      </div>

      {/* Profile */}
      <div className="flex flex-col items-center px-5 mt-4">
        <div className="relative">
          <img src={user.avatar} className="w-24 h-24 rounded-full object-cover shadow-lg border-4 border-background" alt={user.name} />
          {user.online && <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 rounded-full border-3 border-background" />}
        </div>
        <h2 className="text-xl font-bold text-foreground mt-4">{user.name}</h2>
        <p className="text-sm text-muted-foreground mt-1">{user.status}</p>
        {user.bio && <p className="text-xs text-muted-foreground/70 mt-2 text-center max-w-[260px]">{user.bio}</p>}

        {/* Action buttons */}
        <div className="flex items-center gap-3 mt-6">
          {isConnected ? (
            <>
              <button onClick={() => navigate(`/chat/${user._id}`)} className="flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-foreground text-background text-sm font-bold active:scale-95 transition-transform shadow-md">
                <MessageCircle size={16} /> Message
              </button>
              <button className="w-11 h-11 rounded-full bg-secondary flex items-center justify-center text-foreground active:scale-95 transition-transform">
                <Phone size={18} />
              </button>
              <button className="w-11 h-11 rounded-full bg-secondary flex items-center justify-center text-foreground active:scale-95 transition-transform">
                <Video size={18} />
              </button>
            </>
          ) : requested ? (
            <div className="px-8 py-2.5 rounded-2xl bg-secondary text-muted-foreground text-sm font-bold">Request Sent ✓</div>
          ) : (
            <button onClick={() => { setRequested(true); toast.success("Connection request sent!"); }} className="px-8 py-2.5 rounded-2xl bg-foreground text-background text-sm font-bold active:scale-95 transition-transform shadow-md">
              Ask to Chat 💬
            </button>
          )}
        </div>
      </div>

      {/* Info cards */}
      <div className="px-5 mt-8 flex flex-col gap-3">
        <div className="bg-secondary/30 rounded-2xl p-4 border border-border/40">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-2">About</p>
          <p className="text-sm text-foreground">{user.bio || user.status}</p>
        </div>
        <div className="bg-secondary/30 rounded-2xl p-4 border border-border/40">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-2">Contact</p>
          <p className="text-sm text-foreground">{user.email}</p>
          {user.phone && <p className="text-sm text-muted-foreground mt-1">{user.phone}</p>}
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
