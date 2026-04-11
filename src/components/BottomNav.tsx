import { Home, Search, Bell, User } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

// Watches the .dark class on <html> so we react to theme changes in real time
function useIsDark() {
  const [isDark, setIsDark] = useState(() =>
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  return isDark;
}

const tabs = [
  { icon: Home, label: "Overview", path: "/messengers" },
  { icon: Search, label: "Search", path: "/search" },
  { icon: Bell, label: "Activity", path: "/activity" },
  { icon: User, label: "Profile", path: "/profile" },
];

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isDark = useIsDark();

  if (location.pathname.startsWith("/chat/")) return null;

  // ── Theme tokens ──────────────────────────────────────────────
  const pill = isDark
    ? {
      background: "rgba(20, 20, 20, 0.65)",
      border: "1px solid rgba(255,255,255,0.10)",
      boxShadow:
        "0 8px 32px rgba(0,0,0,0.45), 0 1px 0 rgba(255,255,255,0.06) inset, 0 -1px 0 rgba(0,0,0,0.3) inset",
    }
    : {
      background: "rgba(255, 255, 255, 0.72)",
      border: "1px solid rgba(0,0,0,0.08)",
      boxShadow:
        "0 4px 24px rgba(0,0,0,0.10), 0 1px 0 rgba(255,255,255,0.9) inset, 0 -1px 0 rgba(0,0,0,0.04) inset",
    };

  const token = isDark
    ? {
      activeColor: "rgba(255,255,255,1)",
      inactiveColor: "rgba(255,255,255,0.40)",
      activeBg: "rgba(255,255,255,0.18)",
      activeBoxShadow:
        "0 2px 12px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.15)",
      hoverColor: "rgba(255,255,255,0.80)",
      hoverBg: "rgba(255,255,255,0.07)",
    }
    : {
      activeColor: "rgba(0,0,0,0.90)",
      inactiveColor: "rgba(0,0,0,0.35)",
      activeBg: "rgba(0,0,0,0.07)",
      activeBoxShadow:
        "0 2px 10px rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,0.70)",
      hoverColor: "rgba(0,0,0,0.65)",
      hoverBg: "rgba(0,0,0,0.04)",
    };
  // ─────────────────────────────────────────────────────────────

  return (
    <div
      style={{
        position: "fixed",
        bottom: "12px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 50,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "8px 10px",
          borderRadius: "9999px",
          border: pill.border,
          background: pill.background,
          backdropFilter: "blur(24px) saturate(180%)",
          WebkitBackdropFilter: "blur(24px) saturate(180%)",
          boxShadow: pill.boxShadow,
        }}
      >
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path;
          return (
            <button
              key={tab.label}
              onClick={() => navigate(tab.path)}
              title={tab.label}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: isActive ? "56px" : "44px",
                height: "44px",
                borderRadius: "9999px",
                border: "none",
                cursor: "pointer",
                transition: "all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)",
                background: isActive ? token.activeBg : "transparent",
                color: isActive ? token.activeColor : token.inactiveColor,
                outline: "none",
                boxShadow: isActive ? token.activeBoxShadow : "none",
                flexShrink: 0,
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLButtonElement).style.color =
                    token.hoverColor;
                  (e.currentTarget as HTMLButtonElement).style.background =
                    token.hoverBg;
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLButtonElement).style.color =
                    token.inactiveColor;
                  (e.currentTarget as HTMLButtonElement).style.background =
                    "transparent";
                }
              }}
            >
              <tab.icon size={20} strokeWidth={isActive ? 2.2 : 1.6} />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;
