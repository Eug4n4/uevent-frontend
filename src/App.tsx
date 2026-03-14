import { useState } from 'react'
import { AuthCard } from './components/AuthCard'
import { Header } from './components/Header'
import './App.css'

const categories = [
  // тута верхнеуровневые треки, бэкенд потом подставит реальные
  'Conferences',
  'Lectures',
  'Workshops',
  'Fests',
  'Retreats',
  'Community Labs',
]

const highlights = [
  { label: 'Active organizers', value: '140+' },
  { label: 'Cities covered', value: '38' },
  { label: 'Avg. response time', value: '<4h' },
]

function App() {
  // режим вкладки логин/регистрация, пока живём локально
  const [mode, setMode] = useState<'login' | 'register'>('login')
  // выбранный фильтр для текста, фактическая выдача прилетит с апи позже
  const [category, setCategory] = useState(categories[0])

  return (
    <div className="app-shell">
      <div className="aura aura-one"></div>
      <div className="aura aura-two"></div>

      <Header
        categories={categories}
        activeCategory={category}
        onSelect={setCategory}
      />

      <main className="main-grid">
        <section className="story-panel">
          <p className="eyebrow">Powered by nICE</p>
          <h2>Chilled spaces for warm introductions</h2>
          <p className="lead">
            nICE is NICE
          </p>

          <div className="chips-row">
            <span className="chip">Instant tickets</span>
            <span className="chip glow">Organizer alerts</span>
            <span className="chip">Private attendee mode</span>
          </div>

          <div className="highlight-panel">
            {highlights.map((item) => (
              <div key={item.label}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </section>

        <AuthCard
          mode={mode}
          onModeChange={setMode}
          featuredCategory={category}
        />
      </main>
    </div>
  )
}

export default App
