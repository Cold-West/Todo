import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";
import { ModalContextProvider } from "./components";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";
import "./firebase/firebase.ts"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ModalContextProvider>
        <App />
      </ModalContextProvider>
    </Provider>
  </StrictMode>,
);
