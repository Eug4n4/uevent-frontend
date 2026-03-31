import { useState } from "react";
import { AuthCard } from "../../components/auth/cards/AuthCard";

export function AuthPage() {
  const [mode, setMode] = useState<"login" | "register">("login");

  return (
    <main className="auth-only">
      <section className="story-panel">
        <p className="eyebrow">Welcome back</p>
        <h2>Sign in to keep the conversations flowing</h2>
        <p className="lead">
          Use your nICE account to unlock attendee controls, organizer alerts, and payment flows without switching tabs.
        </p>
      </section>

      <section className="auth-card standalone" aria-live="polite">
        <AuthCard mode={mode} onModeChange={setMode} />
      </section>
    </main>
  );
}
