import type { IRootState } from "@/state/store"
import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import UserIcon from "./icons/UserIcon"

const IceLogo = () => (
  <svg
    className="ice-logo"
    viewBox="0 0 96 120"
    role="img"
    aria-label="nICE ice cube mascot"
  >
    <defs>
      <linearGradient id="iceGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#dfffff" />
        <stop offset="65%" stopColor="#9df2ff" />
        <stop offset="100%" stopColor="#26b7d8" />
      </linearGradient>
    </defs>
    <rect
      x="12"
      y="12"
      width="64"
      height="56"
      rx="18"
      fill="url(#iceGradient)"
      stroke="#0d8fbd"
      strokeWidth="3"
    />
    <path
      d="M20 40C30 28 40 24 56 26"
      stroke="rgba(255,255,255,0.75)"
      strokeWidth="4"
      strokeLinecap="round"
      fill="none"
    />
    <circle cx="36" cy="35" r="4" fill="#ffffff" />
    <circle cx="54" cy="35" r="4" fill="#ffffff" />
    <path
      d="M34 47c4 6 12 6 16 0"
      stroke="#ffffff"
      strokeWidth="4"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M36 68c0 10 4 30-2 36"
      stroke="#0f7893"
      strokeWidth="5"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M58 68c0 10 2 32 12 36"
      stroke="#0f7893"
      strokeWidth="5"
      strokeLinecap="round"
      fill="none"
    />
    <circle cx="32" cy="108" r="6" fill="#0f7893" />
    <circle cx="76" cy="108" r="6" fill="#0f7893" />
  </svg>
)


export function Header() {
  const { isAuthenticated } = useSelector((state: IRootState) => state.auth)
  return (
    <header className="hero-header">
      <div className="brand">
        <IceLogo />
        <div>
          <p className="eyebrow">nICE platform</p>
          <h1>Stay cool, spark bold conversations</h1>
        </div>
      </div>

      <nav>
        
        <NavLink
          to="/"
          className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
        >
          Home
        </NavLink>
        {!isAuthenticated ? (
          <NavLink
            to="/auth"
            className={({ isActive }) => `nav-cta ${isActive ? "active" : ""}`}
          >
            Login / Register
          </NavLink>
        ) : <UserIcon />}
        
      </nav>
    </header>
  )
}
