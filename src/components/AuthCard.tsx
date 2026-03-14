import type { FormEvent } from 'react'
import { useEffect, useMemo, useState } from 'react'
import { loginAccount, registerAccount } from '../lib/api'
import type { ProfileAttributes } from '../lib/api'

type AuthCardProps = {
  mode: 'login' | 'register'
  onModeChange: (mode: 'login' | 'register') => void
  featuredCategory: string
}

type FeedbackState =
  | { status: 'idle'; message?: string }
  | { status: 'success'; message: string }
  | { status: 'error'; message: string }

const passwordHint =
  'Use at least 10 characters mixing upper, lower, digits, and a symbol.'

export function AuthCard({
  mode,
  onModeChange,
  featuredCategory,
}: AuthCardProps) {
  // локальный стейт пока API не возвращает готовые формы
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(false)
  const [profile, setProfile] = useState<ProfileAttributes | null>(null)
  const [feedback, setFeedback] = useState<FeedbackState>({ status: 'idle' })
  const [showNameOnLists, setShowNameOnLists] = useState(() => {
    if (typeof window === 'undefined') {
      return true
    }
    const stored = window.localStorage.getItem('uevent:showName')
    // маленький мемо-флаг, потом синканём с реальным профилем
    return stored ? stored === 'true' : true
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('uevent:showName', String(showNameOnLists))
    }
  }, [showNameOnLists])

  useEffect(() => {
    setFeedback({ status: 'idle' })
    setProfile(null)
  }, [mode])

  const canSubmit = useMemo(() => {
    if (!email || !password) return false
    if (mode === 'register' && !username) return false
    return true
  }, [email, password, username, mode])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!canSubmit) return

    setLoading(true)
    setFeedback({ status: 'idle' })

    try {
      if (mode === 'register') {
        // тута ждём бэка, пока просто шлём JSON:API
        await registerAccount({
          email,
          username,
          password,
        })

        setFeedback({
          status: 'success',
          message: 'Account created. You can log in with your new credentials.',
        })
        onModeChange('login')
      } else {
        // логин сразу ждёт профиль чтобы чекнуть куки в браузере
        const result = await loginAccount({
          email,
          password,
        })
        setProfile(result)
        setFeedback({
          status: 'success',
          message: `Welcome back, ${result.username}!`,
        })
      }
    } catch (error) {
      setFeedback({
        status: 'error',
        message:
          error instanceof Error
            ? error.message
            : 'Something went wrong. Please try again.',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="auth-card" id="auth-panel" aria-live="polite">
      <div className="tab-switch">
        <button
          className="tab-trigger"
          type="button"
          aria-pressed={mode === 'login'}
          onClick={() => onModeChange('login')}
        >
          Log in
        </button>
        <button
          className="tab-trigger"
          type="button"
          aria-pressed={mode === 'register'}
          onClick={() => onModeChange('register')}
        >
          Create account
        </button>
      </div>

      <p className="panel-subtitle">
        {mode === 'login'
          ? 'Access curated communities, direct organizer messaging, and ticketless entry.'
          : `Reserve seats for future ${featuredCategory.toLowerCase()} while slots are still available.`}
      </p>

      <form onSubmit={handleSubmit} className="auth-form">
        <label className="field">
          <span>Email address</span>
          <input
            type="email"
            inputMode="email"
            placeholder="alex@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <small>We will send passes and reminders to this inbox.</small>
        </label>

        {mode === 'register' && (
          <label className="field">
            <span>Username</span>
            <input
              type="text"
              placeholder="skyline.host"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              minLength={3}
              required
            />
            <small>Your public handle for comments and organizer posts.</small>
          </label>
        )}

        <label className="field">
          <span>Password</span>
          <input
            type="password"
            placeholder="••••••••••"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            minLength={8}
            required
          />
          <small>{passwordHint}</small>
        </label>

        {mode === 'register' && (
          <label className="privacy-toggle">
            <input
              type="checkbox"
              checked={showNameOnLists}
              onChange={() => setShowNameOnLists((value) => !value)}
            />
            <span>
              Display my name on attendee lists for networking purposes (you can
              change this later)
            </span>
          </label>
        )}

        {feedback.status !== 'idle' && (
          <p
            className={`feedback ${feedback.status === 'error' ? 'error' : 'success'}`}
          >
            {feedback.message}
          </p>
        )}

        <button
          className="primary-btn"
          type="submit"
          disabled={!canSubmit || loading}
        >
          {loading
            ? 'Please wait...'
            : mode === 'login'
              ? 'Log in and continue'
              : 'Register account'}
        </button>
      </form>

      {profile && (
        <div className="profile-preview">
          <p>Session ready</p>
          <div className="profile-details">
            <img
              src={profile.avatar || 'https://placehold.co/64x64?text=UE'}
              alt=""
              width={64}
              height={64}
              loading="lazy"
            />
            <div>
              <strong>{profile.username}</strong>
              <span>ID: {profile.id}</span>
              <span>Member since {new Date(profile.created_at).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
