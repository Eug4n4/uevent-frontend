import { useState } from 'react'
import { Header } from '../components/Header'
import { AuthCard } from '../components/AuthCard'

const categories = [
  'Conferences',
  'Lectures',
  'Workshops',
  'Fests',
  'Retreats',
  'Community Labs',
]

export function AuthPage() {
  const [mode, setMode] = useState<'login' | 'register'>('login')

  return (
    <div className="app-shell auth-view">
      <div className="aura aura-one"></div>
      <div className="aura aura-two"></div>

      <Header
        categories={categories}
        activeCategory={categories[0]}
        onSelect={() => undefined}
        showCategories={false}
      />

      <main className="auth-only">
        <section className="story-panel">
          <p className="eyebrow">Welcome back</p>
          <h2>Sign in to keep the conversations flowing</h2>
          <p className="lead">
            Use your nICE account to unlock attendee controls, organizer alerts, and payment
            flows without switching tabs.
          </p>
        </section>

        <section className="auth-card standalone" aria-live="polite">
          <AuthCard
            mode={mode}
            onModeChange={setMode}
            featuredCategory="featured"
          />
        </section>
      </main>
    </div>
  )
}
