"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Card from "@/components/Card";
import Input from "@/components/Input";
import Button from "@/components/Button";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Enter a valid email address.");
      return;
    }
    login({ name, email });
    router.push("/dashboard");
  }

  return (
    <div className="narrow">
      <Card title="Welcome to VitalCoach">
        <p className="muted">Demo sign-in: any valid email works. No password needed.</p>
        <form onSubmit={handleSubmit} noValidate>
          <Input
            id="name"
            label="Your name (optional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Aarav"
          />
          <Input
            id="email"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            error={error}
          />
          <Button type="submit">Continue</Button>
        </form>
      </Card>
    </div>
  );
}
