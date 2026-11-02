"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Button from "./Button";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/log", label: "Log" },
  { href: "/coach", label: "Coach" },
  { href: "/insights", label: "Insights" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  return (
    <header className="navbar">
      <div className="container nav-inner">
        <Link href="/" className="brand">
          <span aria-hidden="true">💚</span> VitalCoach
        </Link>

        {user && (
          <nav className="nav-links" aria-label="Main">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={pathname === l.href ? "active" : ""}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        )}

        <div>
          {user ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                logout();
                router.push("/");
              }}
            >
              Log out
            </Button>
          ) : (
            <Button href="/login" size="sm">
              Sign in
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
