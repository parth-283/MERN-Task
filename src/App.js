import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./Componant/Home";
import Navigation from "./Componant/Navigation/Navigation";
import Login from "./Componant/Login/Login";
import Registration from "./Componant/Registration/Registration";
import ProtectedRoute from "./Componant/ProtectedRoute/ProtectedRoute";
import PublicRoute from "./Componant/PublicRoute/PublicRoute";

import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route path="/" element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
          </Route>

          <Route path="/" element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
