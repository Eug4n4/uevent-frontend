import { APIProvider } from "@vis.gl/react-google-maps";
import { Outlet } from "react-router-dom";
import "./App.css";
import CheckAuth from "./components/CheckAuth";
import { Header } from "./components/common/Header";

function App() {
  return (
    <div className="app-shell">
      <div className="aura aura-one"></div>
      <div className="aura aura-two"></div>
      <CheckAuth>
        <Header />
      </CheckAuth>
      <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        <Outlet />
      </APIProvider>
    </div>
  );
}

export default App;
