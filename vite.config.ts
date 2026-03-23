import react from "@vitejs/plugin-react"
import { fileURLToPath } from "url"
import { defineConfig, loadEnv, type UserConfig } from "vite"


const getConfig = (config: UserConfig): UserConfig => {
  const envData = loadEnv(config.mode!, process.cwd(), "VITE")
  return {
    plugins: [react()],
    server: { port: parseInt(envData.VITE_FRONTEND_PORT) },
    resolve: {
      alias: [
        {
          find: "@",
          replacement: fileURLToPath(new URL("./src", import.meta.url))
        }
      ]
    }
  }

}

// https://vite.dev/config/
export default defineConfig(getConfig)
