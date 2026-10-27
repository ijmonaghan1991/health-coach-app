import { useState } from "react";

import api from "../services/api";

export default function AICoach() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] =
    useState([]);

  const send = async (event) => {
    event.preventDefault();

    if (!message.trim()) return;

    const userMessage = {
      role: "user",
      text: message,
    };

    setMessages((current) => [
      ...current,
      userMessage,
    ]);

    const currentMessage = message;
    setMessage("");

    try {
      const { data } = await api.post(
        "/ai/chat",
        {
          message: currentMessage,
        }
      );

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          text: data.reply,
        },
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          text:
            "I couldn't respond right now. Please try again.",
        },
      ]);
    }
  };

  return (
    <main className="coachPage">
      <section className="coachHeader">
        <p className="eyebrow">
          AI WELLNESS COACH
        </p>

        <h1>
          What would you like to work on?
        </h1>

        <p>
          Talk about habits, motivation,
          sleep, nutrition or movement.
        </p>
      </section>

      <section className="chat">
        <div className="messages">
          {!messages.length && (
            <div className="assistantMessage">
              Tell me about a wellness goal
              you're working toward.
            </div>
          )}

          {messages.map((item, index) => (
            <div
              key={index}
              className={
                item.role === "user"
                  ? "userMessage"
                  : "assistantMessage"
              }
            >
              {item.text}
            </div>
          ))}
        </div>

        <form
          className="chatForm"
          onSubmit={send}
        >
          <input
            value={message}
            onChange={(event) =>
              setMessage(event.target.value)
            }
            placeholder="Ask your wellness coach..."
          />

          <button className="button">
            Send
          </button>
        </form>

        <small>
          AI coaching provides general wellness
          information and isn't a substitute for
          professional medical care.
        </small>
      </section>
    </main>
  );
}