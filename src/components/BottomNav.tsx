import { LayoutGrid, Search, Bell, User } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const tabs = [
  { icon: LayoutGrid, label: "Overview", path: "/messengers" },
  { icon: Search, label: "Search", path: "/search" },
  { icon: Bell, label: "Activity", path: "/activity" },
  { icon: User, label: "Profile", path: "/profile" },
];

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  if (location.pathname.startsWith("/chat/")) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-[400px]">
      <div
        className="flex items-center justify-around py-3 px-2 rounded-2xl border border-border/40"
        style={{
          background: "rgba(var(--glass-bg), 0.55)",
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.08)",
        }}
      >
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path;
          return (
            <button
              key={tab.label}
              onClick={() => navigate(tab.path)}
              className={`flex flex-col items-center gap-1 px-4 py-1.5 rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-foreground/10 text-foreground"
                  : "text-muted-foreground hover:text-foreground/70"
              }`}
            >
              <tab.icon size={20} strokeWidth={isActive ? 2.2 : 1.5} />
              <span className="text-[10px] font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;
