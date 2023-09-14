

import React from "react";
import { BrowserRouter as Router, Route, Routes  } from "react-router-dom";
import App from "./App";
import AdminMap from "./components/AdminMap";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/admin-map" element={<AdminMap />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
