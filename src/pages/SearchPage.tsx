import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { users } from "@/data/chatData";

const SearchPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-20 max-w-[430px] mx-auto">
      <div className="px-4 pt-4 pb-2">
        <h1 className="text-xl font-bold text-foreground">Search Users</h1>
      </div>

      <div className="px-4 mt-2">
        <div className="flex items-center gap-2 bg-secondary rounded-xl px-3 py-2.5">
          <Search size={16} className="text-muted-foreground" />
          <input
            placeholder="Search people..."
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
          />
        </div>
      </div>

      <div className="px-4 mt-4 space-y-1">
        {users.map((user) => (
          <button
            key={user.id}
            onClick={() => navigate(`/chat/${user.id}`)}
            className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-secondary transition-colors"
          >
            <div className="relative">
              <img src={user.avatar} className="w-10 h-10 rounded-full object-cover" alt="" />
              {user.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-success rounded-full border-2 border-card" />}
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
