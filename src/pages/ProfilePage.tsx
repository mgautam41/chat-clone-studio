import { currentUser } from "@/data/chatData";

const ProfilePage = () => (
  <div className="min-h-screen bg-background pb-20 max-w-[430px] mx-auto">
    <div className="px-4 pt-4 pb-2">
      <h1 className="text-xl font-bold text-foreground">Profile</h1>
    </div>
    <div className="px-4 mt-8 flex flex-col items-center text-center gap-3">
      <img src={currentUser.avatar} className="w-20 h-20 rounded-full object-cover" alt="" />
      <p className="font-semibold text-foreground text-lg">{currentUser.name}</p>
      <p className="text-sm text-muted-foreground">Online</p>
    </div>
  </div>
);

export default ProfilePage;
