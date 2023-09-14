

import React from "react";
import { BrowserRouter as Router, Route, Routes  } from "react-router-dom";

import AdminMap from "./components/AdminMap";
import LocMap from "./components/LocMap";
const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LocMap />} />
        <Route path="/admin-map" element={<AdminMap />} />

      </Routes>
    </Router>
  );
};

export default AppRouter;
