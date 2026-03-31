import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import { Router } from "./router";
import store from "./state/store";

const root = createRoot(document.getElementById("root")!);

async function enableMocks() {
  if (import.meta.env.DEV) {
    const { worker } = await import("./dev/mocks/browser");
    await worker.start({
      onUnhandledRequest: "bypass",
    });
  }
}

enableMocks().finally(() => {
  root.render(
    <StrictMode>
      <Provider store={store}>
        <Router />
      </Provider>
    </StrictMode>,
  );
});
