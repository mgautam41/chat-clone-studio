import { useState } from "react";
import { Search, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { fakeUsers, connectedUserIds } from "@/data/fakeData";
import { toast } from "sonner";

const SearchPage = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [sentRequests, setSentRequests] = useState<Set<string>>(new Set());

  const activeUsers = fakeUsers.filter(u => u.online);

  const displayed = query
    ? fakeUsers.filter(u => u.name.toLowerCase().includes(query.toLowerCase()) || u.email.toLowerCase().includes(query.toLowerCase()))
    : fakeUsers;

  const getStatus = (id: string) => {
    if (connectedUserIds.has(id)) return "connected";
    if (sentRequests.has(id)) return "pending";
    return "none";
  };

  const sendRequest = (id: string) => {
    setSentRequests(prev => new Set(prev).add(id));
    toast.success("Connection request sent!");
  };

  return (
    <div className="min-h-screen bg-background pb-24 max-w-[430px] mx-auto">
      <div className="px-5 pt-6 pb-2">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Discover</h1>
      </div>

      {/* Search input */}
      <div className="px-5 mt-3">
        <div className="flex items-center gap-2.5 bg-secondary rounded-full px-4 py-3">
          <Search size={15} className="text-muted-foreground shrink-0" />
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search by name or email..." className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none" />
          {query && (
            <button onClick={() => setQuery("")}><X size={15} className="text-muted-foreground hover:text-foreground transition-colors" /></button>
          )}
        </div>
      </div>

      {/* Active users horizontal */}
      {!query && (
        <div className="px-5 mt-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground/60 mb-3 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 opacity-70" />
            Active Now
          </p>
          <div className="flex gap-4 overflow-x-auto scrollbar-none pb-2">
            {activeUsers.map(u => (
              <button key={u._id} onClick={() => navigate(`/user/${u._id}`)} className="flex flex-col items-center gap-1.5 shrink-0">
                <div className="relative">
                  <img src={u.avatar} className="w-14 h-14 rounded-full object-cover border-2 border-green-500/30" alt={u.name} />
                  <div className="absolute bottom-0.5 right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                </div>
                <span className="text-[11px] text-muted-foreground font-medium max-w-[60px] truncate">{u.name.split(" ")[0]}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mx-5 mt-4 border-t border-border" />

      {/* Users list */}
      <div className="mt-2">
        {displayed.length === 0 ? (
          <div className="px-5 py-12 text-center flex flex-col items-center gap-2">
            <Search size={32} className="text-muted-foreground/30" />
            <p className="text-sm font-medium text-foreground">No users found</p>
          </div>
        ) : (
          <>
            {/* Connected */}
            {displayed.some(u => getStatus(u._id) === "connected") && (
              <div className="mt-3">
                <div className="px-5 mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground/60 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 opacity-70" />
                    Connected
                  </span>
                </div>
                {displayed.filter(u => getStatus(u._id) === "connected").map(u => (
                  <UserRow key={u._id} user={u} status="connected" onConnect={() => {}} onNavigate={() => navigate(`/user/${u._id}`)} onMessage={() => navigate(`/chat/${u._id}`)} />
                ))}
              </div>
            )}
            {/* New people */}
            {displayed.some(u => getStatus(u._id) !== "connected") && (
              <div className="mt-4">
                <div className="px-5 mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground/60 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-foreground/20" />
                    New People
                  </span>
                </div>
                {displayed.filter(u => getStatus(u._id) !== "connected").map(u => (
                  <UserRow key={u._id} user={u} status={getStatus(u._id)} onConnect={() => sendRequest(u._id)} onNavigate={() => navigate(`/user/${u._id}`)} onMessage={() => {}} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

function UserRow({ user, status, onConnect, onNavigate, onMessage }: any) {
  return (
    <div className="w-full flex items-center gap-3.5 px-5 py-3.5 hover:bg-secondary/40 transition-all border-b border-border/10 last:border-0">
      <button onClick={onNavigate} className="relative shrink-0">
        <img src={user.avatar} className="w-12 h-12 rounded-full object-cover shadow-sm border border-border/20" alt={user.name} />
        {user.online && <div className="absolute bottom-0.5 right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />}
      </button>
      <button onClick={onNavigate} className="flex-1 min-w-0 text-left">
        <p className="font-bold text-[15px] text-foreground leading-none tracking-tight">{user.name}</p>
        <p className="text-[11px] text-muted-foreground mt-1.5 truncate opacity-60 font-medium">{user.status}</p>
      </button>
      {status === "connected" ? (
        <button onClick={onMessage} className="px-5 py-1.5 rounded-xl bg-foreground/5 hover:bg-foreground/[0.08] text-foreground text-[11px] font-bold transition-all active:scale-95 border border-foreground/5">Message</button>
      ) : status === "pending" ? (
        <div className="px-5 py-1.5 rounded-xl bg-secondary/80 text-muted-foreground/60 text-[11px] font-bold border border-border/40">Pending</div>
      ) : (
        <button onClick={onConnect} className="px-5 py-1.5 rounded-xl bg-foreground text-background hover:opacity-90 text-[11px] font-black transition-all active:scale-95 shadow-md shadow-foreground/10">Connect</button>
      )}
    </div>
  );
}

export default SearchPage;
