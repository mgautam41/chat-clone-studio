import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, MessageCircle, Check } from "lucide-react";
import { users } from "@/data/chatData";

const UserProfilePage = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const [requested, setRequested] = useState(false);

  const user = users.find((u) => u.id === userId);
  if (!user) return null;

  const handleAskToChat = () => {
    setRequested(true);
  };

  return (
    <div className="min-h-screen bg-background max-w-[430px] mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 bg-card border-b border-border">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft size={22} className="text-foreground" />
        </button>
        <span className="font-semibold text-foreground">Profile</span>
      </div>

      {/* Profile card */}
      <div className="flex flex-col items-center text-center px-6 pt-10 pb-6">
        <div className="relative">
          <img src={user.avatar} className="w-24 h-24 rounded-full object-cover" alt="" />
          {user.online && (
            <div className="absolute bottom-1 right-1 w-4 h-4 bg-success rounded-full border-2 border-card" />
          )}
        </div>
        <p className="font-bold text-lg text-foreground mt-4">{user.name}</p>
        <p className="text-sm text-muted-foreground mt-1">
          {user.online ? "Online" : "Offline"}
        </p>
      </div>

      {/* Ask to Chat button */}
      <div className="px-6">
        {requested ? (
          <button
            disabled
            className="w-full flex items-center justify-center gap-2 bg-secondary text-muted-foreground rounded-xl py-3 text-sm font-semibold"
          >
            <Check size={18} />
            Request Sent
          </button>
        ) : (
          <button
            onClick={handleAskToChat}
            className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground rounded-xl py-3 text-sm font-semibold active:scale-[0.98] transition-transform"
          >
            <MessageCircle size={18} />
            Ask to Chat
          </button>
        )}
      </div>

      {/* Extra info */}
      <div className="px-6 mt-6 space-y-3">
        <div className="bg-card rounded-xl p-4 border border-border">
          <p className="text-xs text-muted-foreground">Status</p>
          <p className="text-sm text-foreground mt-0.5">
            {user.online ? "🟢 Available to chat" : "🔴 Currently away"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
