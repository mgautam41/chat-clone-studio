import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

/** Returns the stored fake session or null */
export function getAuthSession() {
  try {
    const raw = localStorage.getItem("chat_auth");
    return raw ? (JSON.parse(raw) as { name: string; email: string }) : null;
  } catch {
    return null;
  }
}

/** Redirects to /welcome if there is no session */
export function RequireAuth({ children }: { children: ReactNode }) {
  const session = getAuthSession();
  if (!session) return <Navigate to="/welcome" replace />;
  return <>{children}</>;
}

/** Redirects logged-in users away from welcome/login */
export function GuestOnly({ children }: { children: ReactNode }) {
  const session = getAuthSession();
  if (session) return <Navigate to="/messengers" replace />;
  return <>{children}</>;
}
