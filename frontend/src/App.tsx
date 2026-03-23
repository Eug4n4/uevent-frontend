import { Routes, Route } from 'react-router-dom'
import { AuthPage } from './pages/AuthPage'
import { HomePage } from './pages/HomePage'
import { AdminPage } from './pages/AdminPage'
import { EventDetailPage } from './pages/EventDetailPage'
import { EventCreatePage } from './pages/EventCreatePage'
import { CompanyCreatePage } from './pages/CompanyCreatePage'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/events/new" element={<EventCreatePage />} />
      <Route path="/events/:eventId" element={<EventDetailPage />} />
      <Route path="/companies/new" element={<CompanyCreatePage />} />
    </Routes>
  )
}

export default App
