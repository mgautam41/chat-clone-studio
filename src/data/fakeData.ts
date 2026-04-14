// ── Fake Users ──────────────────────────────────────────────────────
export interface FakeUser {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  online: boolean;
  status: string;
  lastSeen?: string;
  bio?: string;
  phone?: string;
}

export const fakeUsers: FakeUser[] = [
  { _id: "u1", name: "Sophia Martinez", email: "sophia@mail.com", avatar: "https://i.pravatar.cc/150?img=5", online: true, status: "Living my best life ✨", bio: "Designer & coffee lover. Based in NYC.", phone: "+1 555-0101" },
  { _id: "u2", name: "James Wilson", email: "james@mail.com", avatar: "https://i.pravatar.cc/150?img=12", online: true, status: "At work 💻", bio: "Full-stack dev. Open source contributor.", phone: "+1 555-0102" },
  { _id: "u3", name: "Emma Thompson", email: "emma@mail.com", avatar: "https://i.pravatar.cc/150?img=9", online: false, status: "On vacation 🏖️", lastSeen: "2 hours ago", bio: "Travel blogger & photographer.", phone: "+1 555-0103" },
  { _id: "u4", name: "Liam Chen", email: "liam@mail.com", avatar: "https://i.pravatar.cc/150?img=11", online: true, status: "Gaming 🎮", bio: "Gamer, streamer, and tech nerd.", phone: "+1 555-0104" },
  { _id: "u5", name: "Olivia Brown", email: "olivia@mail.com", avatar: "https://i.pravatar.cc/150?img=25", online: false, status: "Reading 📚", lastSeen: "30 min ago", bio: "Book worm. Cat mom. Tea addict.", phone: "+1 555-0105" },
  { _id: "u6", name: "Noah Davis", email: "noah@mail.com", avatar: "https://i.pravatar.cc/150?img=53", online: true, status: "Coding away 🚀", bio: "Startup founder. Building the future.", phone: "+1 555-0106" },
  { _id: "u7", name: "Ava Johnson", email: "ava@mail.com", avatar: "https://i.pravatar.cc/150?img=32", online: false, status: "Busy", lastSeen: "1 hour ago", bio: "Marketing lead at TechCo.", phone: "+1 555-0107" },
  { _id: "u8", name: "Ethan Park", email: "ethan@mail.com", avatar: "https://i.pravatar.cc/150?img=59", online: true, status: "Available", bio: "Music producer & DJ.", phone: "+1 555-0108" },
  { _id: "u9", name: "Mia Rodriguez", email: "mia@mail.com", avatar: "https://i.pravatar.cc/150?img=44", online: false, status: "Sleeping 😴", lastSeen: "5 hours ago", bio: "Fitness coach. Early riser.", phone: "+1 555-0109" },
  { _id: "u10", name: "Lucas Kim", email: "lucas@mail.com", avatar: "https://i.pravatar.cc/150?img=60", online: true, status: "Chilling 🎵", bio: "Photographer. Nature lover.", phone: "+1 555-0110" },
];

// ── Fake Messages ───────────────────────────────────────────────────
export interface FakeMessage {
  id: string;
  senderId: "me" | "other";
  text?: string;
  timestamp: string;
  status: "sent" | "delivered" | "seen";
  images?: string[];
}

export const fakeConversations: Record<string, FakeMessage[]> = {
  u1: [
    { id: "m1", senderId: "other", text: "Hey! Did you see the new design updates?", timestamp: "9:30 AM", status: "seen" },
    { id: "m2", senderId: "me", text: "Yes! They look amazing 🔥", timestamp: "9:31 AM", status: "seen" },
    { id: "m3", senderId: "other", text: "Right? I spent the whole weekend on the color palette", timestamp: "9:32 AM", status: "seen" },
    { id: "m4", senderId: "me", text: "The gradient on the hero section is chef's kiss 👨‍🍳", timestamp: "9:33 AM", status: "seen" },
    { id: "m5", senderId: "other", text: "Haha thanks! Can you review the mobile version too?", timestamp: "9:35 AM", status: "seen" },
    { id: "m6", senderId: "me", text: "Sure, I'll check it out tonight", timestamp: "9:36 AM", status: "delivered" },
    { id: "m7", senderId: "other", text: "Perfect! Let me know if the bottom nav feels right", timestamp: "9:38 AM", status: "seen" },
  ],
  u2: [
    { id: "m1", senderId: "other", text: "The API is ready for testing", timestamp: "11:00 AM", status: "seen" },
    { id: "m2", senderId: "me", text: "Great! What endpoints should I hit first?", timestamp: "11:02 AM", status: "seen" },
    { id: "m3", senderId: "other", text: "Start with /auth/login and /users. I documented everything in Notion", timestamp: "11:03 AM", status: "seen" },
    { id: "m4", senderId: "me", text: "On it! Will push the frontend integration by EOD", timestamp: "11:05 AM", status: "delivered" },
    { id: "m5", senderId: "other", text: "Awesome. Let's sync at 3pm?", timestamp: "11:06 AM", status: "seen" },
  ],
  u3: [
    { id: "m1", senderId: "other", text: "Look at this sunset from Bali! 🌅", timestamp: "3:00 PM", status: "seen", images: ["https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop"] },
    { id: "m2", senderId: "me", text: "Wow that's breathtaking!", timestamp: "3:15 PM", status: "seen" },
    { id: "m3", senderId: "other", text: "I know right? You should visit sometime", timestamp: "3:16 PM", status: "seen" },
    { id: "m4", senderId: "me", text: "Adding it to my bucket list 📝", timestamp: "3:20 PM", status: "delivered" },
  ],
  u4: [
    { id: "m1", senderId: "other", text: "Wanna play some Valorant tonight?", timestamp: "6:00 PM", status: "seen" },
    { id: "m2", senderId: "me", text: "I'm down! What time?", timestamp: "6:05 PM", status: "seen" },
    { id: "m3", senderId: "other", text: "8pm? I'll create the lobby", timestamp: "6:06 PM", status: "seen" },
    { id: "m4", senderId: "me", text: "See you there 🎯", timestamp: "6:07 PM", status: "delivered" },
  ],
  u5: [
    { id: "m1", senderId: "other", text: "Have you read 'Atomic Habits'?", timestamp: "2:00 PM", status: "seen" },
    { id: "m2", senderId: "me", text: "Not yet, is it good?", timestamp: "2:30 PM", status: "seen" },
    { id: "m3", senderId: "other", text: "Life changing! I'll lend you my copy", timestamp: "2:31 PM", status: "seen" },
    { id: "m4", senderId: "me", text: "That would be awesome, thank you!", timestamp: "2:35 PM", status: "delivered" },
  ],
  u6: [
    { id: "m1", senderId: "other", text: "We just closed our seed round! 🎉", timestamp: "10:00 AM", status: "seen" },
    { id: "m2", senderId: "me", text: "Congratulations!! That's huge! 🥳", timestamp: "10:01 AM", status: "seen" },
    { id: "m3", senderId: "other", text: "Thanks! We're hiring if you're interested 😏", timestamp: "10:02 AM", status: "seen" },
    { id: "m4", senderId: "me", text: "Haha tempting! Send me the JD", timestamp: "10:03 AM", status: "delivered" },
  ],
  u7: [
    { id: "m1", senderId: "me", text: "Hey Ava, got the campaign metrics?", timestamp: "1:00 PM", status: "delivered" },
    { id: "m2", senderId: "other", text: "Just pulled them. CTR is up 23% this week!", timestamp: "1:30 PM", status: "seen" },
    { id: "m3", senderId: "me", text: "Amazing work! Let's double down on that channel", timestamp: "1:32 PM", status: "delivered" },
  ],
  u8: [
    { id: "m1", senderId: "other", text: "Check out this beat I just made 🎵", timestamp: "8:00 PM", status: "seen" },
    { id: "m2", senderId: "me", text: "This slaps! 🔥🔥🔥", timestamp: "8:10 PM", status: "seen" },
    { id: "m3", senderId: "other", text: "Want to collab on a track?", timestamp: "8:11 PM", status: "seen" },
    { id: "m4", senderId: "me", text: "Absolutely! Let's set up a session this weekend", timestamp: "8:15 PM", status: "delivered" },
  ],
  u9: [
    { id: "m1", senderId: "other", text: "Your workout plan is ready! 💪", timestamp: "7:00 AM", status: "seen" },
    { id: "m2", senderId: "me", text: "Thanks Mia! Starting tomorrow morning", timestamp: "7:30 AM", status: "delivered" },
  ],
  u10: [
    { id: "m1", senderId: "other", text: "Shot some incredible wildlife photos today", timestamp: "4:00 PM", status: "seen", images: ["https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=400&h=300&fit=crop"] },
    { id: "m2", senderId: "me", text: "These are National Geographic level! 📸", timestamp: "4:15 PM", status: "seen" },
    { id: "m3", senderId: "other", text: "Haha you're too kind. Want to join me next time?", timestamp: "4:16 PM", status: "seen" },
    { id: "m4", senderId: "me", text: "Count me in!", timestamp: "4:20 PM", status: "delivered" },
  ],
};

// ── Latest chats for Messenger page ─────────────────────────────────
export interface FakeChatPreview {
  userId: string;
  lastMessage: string;
  time: string;
  unread: number;
  isSentByMe: boolean;
  isRead: boolean;
}

export const fakeChatPreviews: FakeChatPreview[] = [
  { userId: "u1", lastMessage: "Perfect! Let me know if the bottom nav feels right", time: "9:38 AM", unread: 1, isSentByMe: false, isRead: false },
  { userId: "u2", lastMessage: "Awesome. Let's sync at 3pm?", time: "11:06 AM", unread: 2, isSentByMe: false, isRead: false },
  { userId: "u4", lastMessage: "See you there 🎯", time: "6:07 PM", unread: 0, isSentByMe: true, isRead: true },
  { userId: "u6", lastMessage: "Haha tempting! Send me the JD", time: "10:03 AM", unread: 0, isSentByMe: true, isRead: false },
  { userId: "u3", lastMessage: "Adding it to my bucket list 📝", time: "3:20 PM", unread: 0, isSentByMe: true, isRead: true },
  { userId: "u8", lastMessage: "Absolutely! Let's set up a session this weekend", time: "8:15 PM", unread: 0, isSentByMe: true, isRead: true },
  { userId: "u5", lastMessage: "That would be awesome, thank you!", time: "2:35 PM", unread: 0, isSentByMe: true, isRead: false },
  { userId: "u10", lastMessage: "Count me in!", time: "4:20 PM", unread: 0, isSentByMe: true, isRead: true },
];

// ── Fake Activities ─────────────────────────────────────────────────
export interface FakeActivity {
  id: string;
  type: "connection_request" | "accepted" | "message" | "missed_call" | "liked_photo";
  userId: string;
  text: string;
  time: string;
  isRead: boolean;
  status?: "pending" | "accepted" | "rejected";
}

export const fakeActivities: FakeActivity[] = [
  { id: "a1", type: "connection_request", userId: "u7", text: "wants to connect with you", time: "5 min ago", isRead: false, status: "pending" },
  { id: "a2", type: "connection_request", userId: "u9", text: "wants to connect with you", time: "20 min ago", isRead: false, status: "pending" },
  { id: "a3", type: "accepted", userId: "u1", text: "accepted your connection request", time: "1 hour ago", isRead: false },
  { id: "a4", type: "missed_call", userId: "u2", text: "Missed voice call", time: "2 hours ago", isRead: true },
  { id: "a5", type: "liked_photo", userId: "u3", text: "liked your profile photo", time: "3 hours ago", isRead: true },
  { id: "a6", type: "message", userId: "u4", text: "sent you a game invite", time: "5 hours ago", isRead: true },
  { id: "a7", type: "accepted", userId: "u10", text: "accepted your connection request", time: "Yesterday", isRead: true },
  { id: "a8", type: "missed_call", userId: "u8", text: "Missed video call", time: "Yesterday", isRead: true },
];

// ── Simulated auto-replies ──────────────────────────────────────────
const autoReplies = [
  "That sounds great! 😊",
  "Haha, I totally agree!",
  "Let me think about it and get back to you",
  "Sure thing! 👍",
  "Wow, didn't expect that!",
  "Can we talk about this later?",
  "You're absolutely right",
  "I was just thinking the same thing!",
  "That's hilarious 😂",
  "Interesting perspective!",
  "Let me check and confirm",
  "On my way! 🏃",
  "Got it, thanks!",
  "Sounds like a plan 🎯",
  "Can't wait! 🎉",
];

export const getRandomReply = () => autoReplies[Math.floor(Math.random() * autoReplies.length)];

// Helper to find user by ID
export const getUserById = (id: string) => fakeUsers.find(u => u._id === id);

// Connected users (have conversations)
export const connectedUserIds = new Set(fakeChatPreviews.map(c => c.userId));
