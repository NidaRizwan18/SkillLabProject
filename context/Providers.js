"use client";

import { AuthProvider } from "./AuthContext";
import { HealthProvider } from "./HealthContext";

export default function Providers({ children }) {
  return (
    <AuthProvider>
      <HealthProvider>{children}</HealthProvider>
    </AuthProvider>
  );
}
