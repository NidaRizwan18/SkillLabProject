"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { demoUser } from "@/data/dummy";

const AuthContext = createContext(null);
const KEY = "vc_user";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  // Restore the demo session after the first render (localStorage is browser-only).
  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY);
      if (saved) setUser(JSON.parse(saved));
    } catch {}
    setReady(true);
  }, []);

  function login({ name, email }) {
    const next = { ...demoUser, name: name?.trim() || demoUser.name, email };
    setUser(next);
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {}
  }

  function logout() {
    setUser(null);
    try {
      localStorage.removeItem(KEY);
    } catch {}
  }

  return (
    <AuthContext.Provider value={{ user, ready, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
