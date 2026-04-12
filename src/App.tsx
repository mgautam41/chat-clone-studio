import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
import { getAuthSession, RequireAuth, GuestOnly } from "./lib/auth";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import MessengersPage from "./pages/MessengersPage";
import ChatPage from "./pages/ChatPage";
import SearchPage from "./pages/SearchPage";
import ActivityPage from "./pages/ActivityPage";
import ProfilePage from "./pages/ProfilePage";
import ChatUserProfile from "./pages/ChatUserProfile";
import BottomNav from "./components/BottomNav";
import NotFound from "./pages/NotFound";
import WelcomePage from "./pages/WelcomePage";
import LoginPage from "./pages/LoginPage";



function RootRedirect() {
  return getAuthSession()
    ? <Navigate to="/messengers" replace />
    : <Navigate to="/welcome" replace />;
}

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HashRouter>
        <Routes>
          {/* Guest-only: redirect logged-in users to /messengers */}
          <Route path="/welcome" element={<GuestOnly><WelcomePage /></GuestOnly>} />
          <Route path="/login" element={<GuestOnly><LoginPage /></GuestOnly>} />

          {/* Root redirect — welcome for guests, messages for authed */}
          <Route path="/" element={<RootRedirect />} />


          {/* Protected routes */}
          <Route path="/messengers" element={<RequireAuth><MessengersPage /></RequireAuth>} />
          <Route path="/chat/:userId" element={<RequireAuth><ChatPage /></RequireAuth>} />
          <Route path="/chat/:userId/profile" element={<RequireAuth><ChatUserProfile /></RequireAuth>} />
          <Route path="/search" element={<RequireAuth><SearchPage /></RequireAuth>} />
          <Route path="/activity" element={<RequireAuth><ActivityPage /></RequireAuth>} />
          <Route path="/profile" element={<RequireAuth><ProfilePage /></RequireAuth>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <BottomNav />
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
