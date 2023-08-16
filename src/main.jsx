import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import "./index.scss";
import { AuthProvider } from "./components/context/AuthContext";
import { SearchProvider } from "./components/context/SearchContext.jsx";
import { ChatProvider } from "./components/context/ChatContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <SearchProvider>
          <ChatProvider>
            <App />
          </ChatProvider>
        </SearchProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
