import { useState, useEffect } from "react";
import { Search, X, MailPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "../lib/api";

const SearchPage = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [requestedIds, setRequestedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);
    return () => clearTimeout(handler);
  }, [query]);

  const { data: searchResults = [], isLoading } = useQuery({
    queryKey: ["users", debouncedQuery],
    queryFn: async () => {
      const res = await api.get(`/users?search=${debouncedQuery}`);
      return res.data;
    },
    enabled: !!debouncedQuery
  });

  const { data: allUsers = [], isLoading: loadingAll } = useQuery({
    queryKey: ["users", "all"],
    queryFn: async () => {
      const res = await api.get("/users");
      return res.data;
    },
    enabled: !debouncedQuery
  });

  const displayedUsers = debouncedQuery ? searchResults : allUsers;
  const loading = debouncedQuery ? isLoading : loadingAll;

  // Simulate contact requests
  const handleSendRequest = (id: string) => {
    setRequestedIds(new Set([...requestedIds, id]));
  };

  return (
    <div className="min-h-screen bg-background pb-24 max-w-[430px] mx-auto">

      {/* Header */}
      <div className="px-5 pt-6 pb-2">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">New Chat</h1>
      </div>

      {/* Search input */}
      <div className="px-5 mt-3">
        <div className="flex items-center gap-2.5 bg-secondary rounded-full px-4 py-3">
          <Search size={15} className="text-muted-foreground shrink-0" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search users by name or email..."
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
          />
          {query && (
            <button onClick={() => setQuery("")}>
              <X size={15} className="text-muted-foreground hover:text-foreground transition-colors" />
            </button>
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="mx-5 mt-5 border-t border-border" />

      {/* New Chat Action / Empty State */}
      <div className="mt-4">
        {loading && (
          <div className="px-5 py-12 text-center flex flex-col items-center gap-2">
            <span className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground" />
            <p className="text-sm font-medium text-muted-foreground">Searching...</p>
          </div>
        )}

        {!loading && displayedUsers.length === 0 && (
          <div className="px-5 py-12 text-center flex flex-col items-center gap-2">
            <Search size={32} className="text-muted-foreground/30" />
            <p className="text-sm font-medium text-foreground">No users found</p>
            <p className="text-xs text-muted-foreground max-w-[200px] leading-relaxed">
              We couldn't find anyone matching that name or email address.
            </p>
          </div>
        )}

        {/* Users list */}
        {!loading && displayedUsers.length > 0 && (
          <div className="mb-6">
            <div className="px-5 mb-3 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                {debouncedQuery ? "Search Results" : "All Users"}
              </span>
            </div>

            <div className="flex flex-col">
              {displayedUsers.map((user: any) => {
                const requested = requestedIds.has(user._id);
                return (
                  <button
                    key={user._id}
                    onClick={() => navigate(`/chat/${user._id}`)}
                    className="w-full flex items-center gap-3.5 px-5 py-3.5 hover:bg-secondary transition-colors"
                  >
                    <div className="relative shrink-0">
                      <img
                        src={user.avatar || "https://i.pravatar.cc/150"}
                        className="w-11 h-11 rounded-full object-cover"
                        alt={user.name}
                      />
                      {user.online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-[2.5px] border-background" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0 text-left">
                      <p className="font-semibold text-sm text-foreground leading-tight">{user.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5 truncate">
                        {user.email}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1 shrink-0">
                      {user.online && <p className="text-[10px] text-green-500 font-medium">Online</p>}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;