import { AuthService } from "@/lib/services/AuthService";
import {
  LoginAttributes,
  RegisterAttributes,
  type AuthDetails,
  type RegisterDetails,
} from "@/lib/services/types/auth.types";
import { loginSuccess } from "@/state/auth/auth.slice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState, type BaseSyntheticEvent } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import PasswordInput from "../../common/inputs/PasswordInput";

type AuthCardProps = {
  mode: "login" | "register";
  // eslint-disable-next-line no-unused-vars
  onModeChange: (mode: "login" | "register") => void;
};

type FeedbackState =
  | { status: "idle"; message?: string }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

const passwordHint = "Use at least 6 characters mixing upper, lower, digits, and a symbol.";

export function AuthCard({ mode, onModeChange }: AuthCardProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const resolver = useMemo(() => zodResolver(mode === "login" ? LoginAttributes : RegisterAttributes), [mode]);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm<AuthDetails>({ resolver, mode: "all" });

  const [feedback, setFeedback] = useState<FeedbackState>({ status: "idle" });
  const [showNameOnLists, setShowNameOnLists] = useState(false);

  const onSubmit = async (data: AuthDetails, event?: BaseSyntheticEvent) => {
    event?.preventDefault();

    if (!isValid) {
      return;
    }
    if (mode === "register") {
      AuthService.register(data as RegisterDetails)
        .then(() => {
          setFeedback({
            status: "success",
            message: "Account created. You can log in with your new credentials.",
          });
          onModeChange("login");
        })
        .catch(console.error);
    } else {
      const response = await AuthService.loginWithPassword(data);
      dispatch(loginSuccess(response));
      reset();
      setFeedback({
        status: "success",
        message: `Welcome back, ${response.username}!`,
      });
      setTimeout(() => navigate("/"), 2000);
    }
  };

  return (
    <section className="auth-card" id="auth-panel" aria-live="polite">
      <div className="tab-switch">
        <button
          className="tab-trigger"
          type="button"
          aria-pressed={mode === "login"}
          onClick={() => onModeChange("login")}
        >
          Log in
        </button>
        <button
          className="tab-trigger"
          type="button"
          aria-pressed={mode === "register"}
          onClick={() => onModeChange("register")}
        >
          Create account
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
        <label className="field">
          <span>Email address</span>
          <input type="email" inputMode="email" placeholder="alex@example.com" {...register("email")} />
          <small>We will send passes and reminders to this inbox.</small>
        </label>

        {mode === "register" && (
          <label className="field">
            <span>Username</span>
            <input type="text" placeholder="skyline.host" {...register("username")} />
            <small>Your public handle for comments and organizer posts.</small>
          </label>
        )}

        <label className="field">
          <span>Password</span>
          <PasswordInput placeholder="••••••••••" {...register("password")} />
          <small>{passwordHint}</small>
        </label>

        {mode === "register" && (
          <label className="privacy-toggle">
            <input type="checkbox" checked={showNameOnLists} onChange={() => setShowNameOnLists((value) => !value)} />
            <span>Display my name on attendee lists for networking purposes (you can change this later)</span>
          </label>
        )}

        {feedback.status !== "idle" && (
          <p className={`feedback ${feedback.status === "error" ? "error" : "success"}`}>{feedback.message}</p>
        )}

        {errors.email && <p className={"feedback error"}>{errors.email.message}</p>}
        {errors.password && <p className={"feedback error"}>{errors.password.message}</p>}
        {errors.username && <p className={"feedback error"}>{errors.username.message}</p>}

        <button className="primary-btn" type="submit" disabled={!isValid}>
          {isSubmitting ? "Please wait..." : mode === "login" ? "Log in and continue" : "Register account"}
        </button>
        <div className="divider">
          <span>or</span>
        </div>
        <button type="button" className="pill-btn google-btn" onClick={() => AuthService.loginWithGoogle()}>
          Continue with Google
        </button>
      </form>
    </section>
  );
}
