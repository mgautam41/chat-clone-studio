import { useNavigate } from "react-router-dom";
import { users, latestMessages } from "@/data/chatData";
import { FiSearch, FiCamera, FiMoreVertical, FiPlus } from "react-icons/fi";
import { BsCheckAll, BsPinFill } from "react-icons/bs";
import { FaRegPenToSquare } from "react-icons/fa6";


const MessengersPage = () => {
  const navigate = useNavigate();
  const onlineUsers = users.filter((u) => u.online);

  return (
    <div className="min-h-screen bg-background pb-28 max-w-[430px] mx-auto font-sans">
      {/* Header */}
      <div className="px-5 pt-6 pb-2 flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Chats</h1>
        <div className="flex items-center gap-2">
          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-secondary/80 text-foreground transition-colors backdrop-blur-md">
            <FiSearch size={20} />
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-secondary/80 text-foreground transition-colors backdrop-blur-md">
            <FaRegPenToSquare size={20} />
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-secondary/80 text-foreground transition-colors backdrop-blur-md">
            <FiMoreVertical size={20} />
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="px-5 pb-6 flex items-center gap-2.5 overflow-x-auto scrollbar-none">
        {["All", "Favorites", "Work", "Groups", "Communities"].map((filter, i) => (
          <button
            key={filter}
            className={`shrink-0 px-4 py-1.5 rounded-full text-[14px] transition-colors font-medium ${i === 0
              ? "bg-foreground/20 text-foreground"
              : "bg-secondary/40 text-muted-foreground hover:bg-secondary/60"
              }`}
          >
            {filter}
          </button>
        ))}
        <button className="shrink-0 w-[30px] h-[30px] rounded-full bg-secondary/40 text-muted-foreground hover:bg-secondary/60 flex items-center justify-center transition-colors">
          <FiPlus size={16} />
        </button>
      </div>

      {/* Chat List */}
      <div className="flex flex-col pb-6">
        {latestMessages.map((msg, idx) => {
          const user = users.find((u) => u.id === msg.userId);
          if (!user) return null;

          const isPinned = idx === 0;
          const unreadCount = isPinned ? 4 : msg.unread > 0 ? msg.unread : (idx === 3 ? 2 : 0);

          return (
            <button
              key={msg.userId}
              onClick={() => navigate(`/chat/${user.id}`)}
              className="w-full flex items-center gap-4 px-5 py-3.5 hover:bg-secondary/50 transition-colors group"
            >
              <div className="relative shrink-0">
                <img
                  src={user.avatar}
                  className="w-[58px] h-[58px] rounded-full object-cover"
                  alt={user.name}
                />
              </div>

              <div className="flex-1 min-w-0 text-left self-center mt-1 pb-1">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-semibold text-[16px] text-foreground leading-tight truncate pr-2">{user.name}</p>
                  <span className={`text-[12px] shrink-0 ${unreadCount > 0 ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {idx === 0 ? "24 mins" : idx < 3 ? "2 mins" : idx === 3 ? "12 mins" : "20 mins"}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 justify-between">
                  <div className="flex items-center gap-1.5 truncate flex-1">
                    {idx > 0 && idx < 3 && <BsCheckAll size={20} className="text-[#4E89F0] shrink-0" />}
                    {idx === 0 && <span className="text-muted-foreground text-sm">Khai :</span>}
                    {idx === 4 && <span className="text-muted-foreground text-sm">You :</span>}
                    <p className={`text-[14px] truncate ${unreadCount > 0 && idx === 0 ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                      {idx === 0 ? "Are they still open at sunday?" : msg.text}
                    </p>
                  </div>

                  <div className="flex items-center gap-2.5 shrink-0 pl-2">
                    {isPinned && <BsPinFill size={14} className="text-muted-foreground" />}
                    {unreadCount > 0 && (
                      <span className="bg-[#24d366] text-white text-[11px] font-bold min-w-[20px] h-[20px] rounded-full flex items-center justify-center px-1">
                        {unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MessengersPage;