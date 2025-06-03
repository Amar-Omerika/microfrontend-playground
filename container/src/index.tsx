import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

const App = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-500">
    <h1 className="text-4xl font-bold text-white">Hello Tailwind + TypeScript!</h1>
  </div>
);

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(<App />);
