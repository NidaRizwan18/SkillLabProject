"use client";

import { useEffect, useRef, useState } from "react";
import Protected from "@/components/Protected";
import Card from "@/components/Card";
import ChatBubble from "@/components/ChatBubble";
import Button from "@/components/Button";
import { useHealth } from "@/context/HealthContext";
import { quickPrompts } from "@/data/dummy";

export default function CoachPage() {
  return (
    <Protected>
      <Coach />
    </Protected>
  );
}

function Coach() {
  const { messages, typing, sendMessage } = useHealth();
  const [text, setText] = useState("");
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  function submit(e) {
    e.preventDefault();
    sendMessage(text);
    setText("");
  }

  return (
    <>
      <h1 className="h1">Your coach</h1>
      <Card className="chat">
        <div className="chat-body" aria-live="polite">
          {messages.map((m) => (
            <ChatBubble key={m.id} from={m.from}>{m.text}</ChatBubble>
          ))}
          {typing && <ChatBubble from="coach">Typing…</ChatBubble>}
          <div ref={endRef} />
        </div>

        <div className="chips">
          {quickPrompts.map((p) => (
            <button key={p} className="chip" onClick={() => sendMessage(p)}>{p}</button>
          ))}
        </div>

        <form className="chat-form" onSubmit={submit}>
          <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Ask about sugar, steps, sleep, meals…" aria-label="Message" />
          <Button type="submit">Send</Button>
        </form>
      </Card>
      <p className="small muted">Wellness guidance only. For urgent symptoms, contact a doctor or emergency services.</p>
    </>
  );
}
