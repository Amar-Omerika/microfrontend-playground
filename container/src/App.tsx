import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

// Layout and components
import Layout from "./components/Layout";
import Home from "./components/Home";
import MicroFrontendWrapper from "./components/MicroFrontendWrapper";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route 
            path="app1/*" 
            element={<MicroFrontendWrapper name="app1" host="http://localhost:3001" />} 
          />
          <Route 
            path="app2/*" 
            element={<MicroFrontendWrapper name="app2" host="http://localhost:3002" />} 
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
