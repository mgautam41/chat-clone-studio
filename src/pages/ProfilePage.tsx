import { useState, useEffect } from "react";
import { Users, ChevronRight, ArrowLeft, Sun, Moon, LogOut, Mail, MapPin } from "lucide-react";
import { currentUser, users } from "@/data/chatData";
import { useNavigate } from "react-router-dom";

const connectedFriends = [users[1], users[3], users[5], users[7]];

const ProfilePage = () => {
  const navigate = useNavigate();
  const [showFriends, setShowFriends] = useState(false);
  const [dark, setDark] = useState(() =>
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  /* ── Friends sub-page ──────────────────────────────────────── */
  if (showFriends) {
    return (
      <div className="min-h-screen bg-background pb-24 max-w-[430px] mx-auto">

        {/* Header */}
        <div className="px-5 pt-6 pb-2 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowFriends(false)}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-secondary text-muted-foreground hover:text-foreground transition-colors shrink-0"
            >
              <ArrowLeft size={17} />
            </button>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Friends</h1>
          </div>
          <span className="text-xs text-muted-foreground">{connectedFriends.length} connected</span>
        </div>

        {/* Divider */}
        <div className="mx-5 mt-3 border-t border-border" />

        {/* Friends list */}
        <div className="mt-4">
          <div className="px-5 mb-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Connected
            </span>
          </div>
          <div className="flex flex-col">
            {connectedFriends.map((friend) => (
              <button
                key={friend.id}
                onClick={() => navigate(`/chat/${friend.id}`)}
                className="w-full flex items-center gap-3.5 px-5 py-3.5 hover:bg-secondary transition-colors"
              >
                <div className="relative shrink-0">
                  <img
                    src={friend.avatar}
                    className="w-11 h-11 rounded-full object-cover"
                    alt={friend.name}
                  />
                  {friend.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                  )}
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <p className="font-semibold text-sm text-foreground leading-tight">{friend.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {friend.online ? "Active now" : "Offline"}
                  </p>
                </div>
                <ChevronRight size={15} className="text-muted-foreground shrink-0" />
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* ── Main profile page ─────────────────────────────────────── */
  return (
    <div className="min-h-screen bg-background pb-24 max-w-[430px] mx-auto">

      {/* Header */}
      <div className="px-5 pt-6 pb-2 flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Profile</h1>
        <button
          onClick={() => setDark(!dark)}
          className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors active:scale-95"
        >
          {dark
            ? <Sun size={17} className="text-foreground" />
            : <Moon size={17} className="text-foreground" />}
        </button>
      </div>

      {/* Avatar + info */}
      <div className="px-5 mt-6 flex items-center gap-4">
        <div className="relative shrink-0">
          <div className="w-20 h-20 rounded-full p-[2.5px] bg-gradient-to-br from-green-400 to-emerald-500">
            <img
              src={currentUser.avatar}
              className="w-full h-full rounded-full object-cover border-2 border-background"
              alt={currentUser.name}
            />
          </div>
          <div className="absolute bottom-1 right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-lg text-foreground leading-tight">{currentUser.name}</p>
          <div className="flex items-center gap-1.5 mt-1">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
            <span className="text-xs text-muted-foreground">Active now</span>
          </div>
          <div className="flex items-center gap-3 mt-2">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Mail size={11} />
              <span>me@mail.com</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin size={11} />
              <span>San Francisco</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="mx-5 mt-6 grid grid-cols-3 divide-x divide-border rounded-2xl bg-secondary overflow-hidden">
        {[
          { label: "Friends", value: connectedFriends.length },
          { label: "Messages", value: "128" },
          { label: "Groups", value: "4" },
        ].map((stat) => (
          <div key={stat.label} className="flex flex-col items-center py-4 gap-0.5">
            <span className="text-base font-bold text-foreground">{stat.value}</span>
            <span className="text-[10px] text-muted-foreground uppercase tracking-widest">{stat.label}</span>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="mx-5 mt-6 border-t border-border" />

      {/* Menu items */}
      <div className="mt-4 flex flex-col">
        <button
          onClick={() => setShowFriends(true)}
          className="w-full flex items-center gap-3.5 px-5 py-4 hover:bg-secondary transition-colors border-b border-border"
        >
          <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center shrink-0">
            <Users size={17} className="text-foreground" />
          </div>
          <div className="flex-1 text-left">
            <p className="font-semibold text-sm text-foreground">Connected Friends</p>
            <p className="text-xs text-muted-foreground mt-0.5">{connectedFriends.length} friends</p>
          </div>
          <ChevronRight size={15} className="text-muted-foreground" />
        </button>

        <button
          onClick={() => {
            localStorage.removeItem("chat_auth");
            navigate("/welcome", { replace: true });
          }}
          className="w-full flex items-center gap-3.5 px-5 py-4 hover:bg-secondary transition-colors"
        >
          <div className="w-9 h-9 rounded-full bg-destructive/10 flex items-center justify-center shrink-0">
            <LogOut size={17} className="text-destructive" />
          </div>
          <div className="flex-1 text-left">
            <p className="font-semibold text-sm text-destructive">Log out</p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;