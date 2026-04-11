import { useState } from "react";
import { Search, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { users } from "@/data/chatData";

const SearchPage = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const onlineUsers = users.filter((u) => u.online);
  const filtered = query.trim()
    ? users.filter((u) => u.name.toLowerCase().includes(query.toLowerCase()))
    : users;

  return (
    <div className="min-h-screen bg-background pb-24 max-w-[430px] mx-auto">

      {/* Header */}
      <div className="px-5 pt-6 pb-2">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Search</h1>
      </div>

      {/* Search input */}
      <div className="px-5 mt-3">
        <div className="flex items-center gap-2.5 bg-secondary rounded-2xl px-4 py-3">
          <Search size={15} className="text-muted-foreground shrink-0" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search people…"
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
          />
          {query && (
            <button onClick={() => setQuery("")}>
              <X size={15} className="text-muted-foreground hover:text-foreground transition-colors" />
            </button>
          )}
        </div>
      </div>

      {/* Online now — hidden while searching */}
      {!query && (
        <div className="mt-5">
          <div className="px-5 mb-3 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Online now
            </span>
            <span className="text-xs text-muted-foreground">{onlineUsers.length} active</span>
          </div>
          <div className="px-5 flex gap-4 overflow-x-auto pb-1 scrollbar-none">
            {onlineUsers.map((user) => (
              <button
                key={user.id}
                onClick={() => navigate(`/user/${user.id}`)}
                className="flex flex-col items-center gap-1.5 min-w-[52px] group"
              >
                <div className="relative">
                  <div className="w-13 h-13 rounded-full p-[2px] bg-gradient-to-br from-green-400 to-emerald-500">
                    <img
                      src={user.avatar}
                      className="w-full h-full rounded-full object-cover border-2 border-background"
                      alt={user.name}
                    />
                  </div>
                  <div className="absolute bottom-0.5 right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-background" />
                </div>
                <span className="text-[10px] text-muted-foreground font-medium group-hover:text-foreground transition-colors truncate w-[52px] text-center leading-tight">
                  {user.name.split(" ")[0]}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Divider */}
      <div className="mx-5 mt-5 border-t border-border" />

      {/* User list */}
      <div className="mt-4">
        <div className="px-5 mb-3 flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            {query ? `Results for "${query}"` : "All People"}
          </span>
          <span className="text-xs text-muted-foreground">{filtered.length} users</span>
        </div>

        {filtered.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-12">No users found.</p>
        )}

        <div className="flex flex-col">
          {filtered.map((user) => (
            <button
              key={user.id}
              onClick={() => navigate(`/user/${user.id}`)}
              className="w-full flex items-center gap-3.5 px-5 py-3.5 hover:bg-secondary transition-colors"
            >
              <div className="relative shrink-0">
                <img
                  src={user.avatar}
                  className="w-11 h-11 rounded-full object-cover"
                  alt={user.name}
                />
                {user.online && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                )}
              </div>
              <div className="flex-1 min-w-0 text-left">
                <p className="font-semibold text-sm text-foreground leading-tight">{user.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {user.online ? "Active now" : "Offline"}
                </p>
              </div>
              <div className={`w-2 h-2 rounded-full shrink-0 ${user.online ? "bg-green-500" : "bg-border"}`} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;