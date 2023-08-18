import React from "react";
import ReactDOM from "react-dom/client";
import { ImageProvider } from "./hooks/useImage";

import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ImageProvider>
      <App />
    </ImageProvider>
  </React.StrictMode>
);
