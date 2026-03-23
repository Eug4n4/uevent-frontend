import { Outlet } from "react-router-dom"
import "./App.css"
import { Header } from "./components/Header"

function App() {

  return (
    <div className="app-shell">
      <div className="aura aura-one"></div>
      <div className="aura aura-two"></div>
      <Header />
      <Outlet />
    </div>
  )

}

export default App
