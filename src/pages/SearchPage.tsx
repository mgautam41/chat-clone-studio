import { useState, useEffect } from "react";
import { Search, X, MailPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { users } from "@/data/chatData";

// Inject emails into mock users for Contacts UI
const contacts = users.slice(0, 5).map((u, i) => ({
  ...u,
  email: `user${i + 1}@example.com`
}));

const globalUsers = users.slice(5).map((u, i) => ({
  ...u,
  email: `user${i + 6}@example.com`
}));

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

  const onlineContacts = contacts.filter((c) => c.online);

  const searchLower = debouncedQuery.toLowerCase().trim();

  const filteredContacts = searchLower
    ? contacts.filter((c) => c.name.toLowerCase().includes(searchLower) || c.email.toLowerCase().includes(searchLower))
    : contacts;

  const filteredGlobal = searchLower
    ? globalUsers.filter((c) => c.name.toLowerCase().includes(searchLower) || c.email.toLowerCase().includes(searchLower))
    : [];

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
        {filteredContacts.length === 0 && filteredGlobal.length === 0 && debouncedQuery && (
          <div className="px-5 py-12 text-center flex flex-col items-center gap-2">
            <Search size={32} className="text-muted-foreground/30" />
            <p className="text-sm font-medium text-foreground">No users found</p>
            <p className="text-xs text-muted-foreground max-w-[200px] leading-relaxed">
              We couldn't find anyone matching that name or email address.
            </p>
          </div>
        )}

        {/* Global Search Results (Add Connection) */}
        {filteredGlobal.length > 0 && (
          <div className="mb-6">
            <div className="px-5 mb-3 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Search
              </span>
            </div>

            <div className="flex flex-col">
              {filteredGlobal.map((user) => {
                const requested = requestedIds.has(user.id);
                return (
                  <div
                    key={user.id}
                    className="w-full flex items-center gap-3.5 px-5 py-3.5 hover:bg-secondary transition-colors"
                  >
                    <div className="relative shrink-0">
                      <img
                        src={user.avatar}
                        className="w-11 h-11 rounded-full object-cover"
                        alt={user.name}
                      />
                    </div>
                    <div className="flex-1 min-w-0 text-left">
                      <p className="font-semibold text-sm text-foreground leading-tight">{user.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5 truncate">
                        {user.email}
                      </p>
                    </div>
                    <button
                      onClick={() => handleSendRequest(user.id)}
                      disabled={requested}
                      className={`shrink-0 px-4 py-1.5 rounded-full text-[13px] font-semibold transition-all ${requested
                        ? "bg-secondary text-muted-foreground border border-border"
                        : "bg-foreground text-background active:scale-95 hover:opacity-90"
                        }`}
                    >
                      {requested ? "Requested" : "Connect"}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Contacts list */}
        {filteredContacts.length > 0 && (
          <div className="mb-6">
            <div className="px-5 mb-3 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                {debouncedQuery ? `My Contacts (${filteredContacts.length})` : "My Contacts"}
              </span>
            </div>

            <div className="flex flex-col">
              {filteredContacts.map((contact) => (
                <button
                  key={contact.id}
                  onClick={() => navigate(`/chat/${contact.id}`)}
                  className="w-full flex items-center gap-3.5 px-5 py-3.5 hover:bg-secondary transition-colors"
                >
                  <div className="relative shrink-0">
                    <img
                      src={contact.avatar}
                      className="w-11 h-11 rounded-full object-cover"
                      alt={contact.name}
                    />
                    {contact.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-[2.5px] border-background" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <p className="font-semibold text-sm text-foreground leading-tight">{contact.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5 truncate">
                      {contact.email}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    {contact.online && <p className="text-[10px] text-green-500 font-medium">Online</p>}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;