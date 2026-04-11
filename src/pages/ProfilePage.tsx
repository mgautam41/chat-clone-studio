import { useState } from "react";
import { Users, ChevronRight, ArrowLeft } from "lucide-react";
import { currentUser, users } from "@/data/chatData";
import { useNavigate } from "react-router-dom";

const connectedFriends = [users[1], users[3], users[5], users[7]];

const ProfilePage = () => {
  const navigate = useNavigate();
  const [showFriends, setShowFriends] = useState(false);

  if (showFriends) {
    return (
      <div className="min-h-screen bg-background pb-20 max-w-[430px] mx-auto">
        <div className="flex items-center gap-3 px-4 py-3 bg-card border-b border-border">
          <button onClick={() => setShowFriends(false)}>
            <ArrowLeft size={22} className="text-foreground" />
          </button>
          <span className="font-semibold text-foreground">Connected Friends</span>
        </div>
        <div className="px-4 mt-3 space-y-0.5">
          {connectedFriends.map((friend) => (
            <button
              key={friend.id}
              onClick={() => navigate(`/chat/${friend.id}`)}
              className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-secondary transition-colors"
            >
              <div className="relative">
                <img src={friend.avatar} className="w-11 h-11 rounded-full object-cover" alt="" />
                {friend.online && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-success rounded-full border-2 border-card" />
                )}
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium text-sm text-foreground">{friend.name}</p>
                <p className="text-xs text-muted-foreground">{friend.online ? "Online" : "Offline"}</p>
              </div>
              <ChevronRight size={16} className="text-muted-foreground" />
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20 max-w-[430px] mx-auto">
      <div className="px-4 pt-4 pb-2">
        <h1 className="text-xl font-bold text-foreground">My Profile</h1>
      </div>

      <div className="px-4 mt-6 flex flex-col items-center text-center gap-2">
        <img src={currentUser.avatar} className="w-24 h-24 rounded-full object-cover" alt="" />
        <p className="font-bold text-lg text-foreground mt-2">{currentUser.name}</p>
        <p className="text-sm text-muted-foreground">Online</p>
      </div>

      <div className="px-4 mt-8">
        <button
          onClick={() => setShowFriends(true)}
          className="w-full flex items-center gap-3 bg-card border border-border rounded-xl p-4 active:scale-[0.98] transition-transform"
        >
          <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
            <Users size={18} className="text-foreground" />
          </div>
          <div className="flex-1 text-left">
            <p className="font-medium text-sm text-foreground">Connected Friends</p>
            <p className="text-xs text-muted-foreground">{connectedFriends.length} friends</p>
          </div>
          <ChevronRight size={18} className="text-muted-foreground" />
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
