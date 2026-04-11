import { useState } from "react";
import { Search } from "lucide-react";
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
    <div className="min-h-screen bg-background pb-20 max-w-[430px] mx-auto">
      <div className="px-4 pt-4 pb-2">
        <h1 className="text-xl font-bold text-foreground">Search</h1>
      </div>

      {/* Search input */}
      <div className="px-4 mt-2">
        <div className="flex items-center gap-2 bg-secondary rounded-xl px-3 py-2.5">
          <Search size={16} className="text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search people..."
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
          />
        </div>
      </div>

      {/* Active users horizontal bar */}
      {!query && (
        <div className="px-4 mt-4">
          <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">Active Now</p>
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            {onlineUsers.map((user) => (
              <button
                key={user.id}
                onClick={() => navigate(`/user/${user.id}`)}
                className="flex flex-col items-center gap-1 min-w-[60px]"
              >
                <div className="relative">
                  <img src={user.avatar} className="w-12 h-12 rounded-full object-cover" alt="" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-success rounded-full border-2 border-card" />
                </div>
                <span className="text-[10px] text-foreground font-medium text-center leading-tight truncate w-[60px]">
                  {user.name.split(" ")[0]}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* User list */}
      <div className="px-4 mt-3 space-y-0.5">
        <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
          {query ? "Results" : "All Users"}
        </p>
        {filtered.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-8">No users found.</p>
        )}
        {filtered.map((user) => (
          <button
            key={user.id}
            onClick={() => navigate(`/user/${user.id}`)}
            className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-secondary transition-colors"
          >
            <div className="relative">
              <img src={user.avatar} className="w-11 h-11 rounded-full object-cover" alt="" />
              {user.online && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-success rounded-full border-2 border-card" />
              )}
            </div>
            <div className="flex-1 text-left">
              <p className="font-medium text-sm text-foreground">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.online ? "Online" : "Offline"}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
