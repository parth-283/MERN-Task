import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Componant/Home";
import Navigation from "./Componant/Navigation/Navigation";
import Login from "./Componant/Login/Login";
import Registration from "./Componant/Registration/Registration";
import ProtectedRoute from "./Componant/ProtectedRoute/ProtectedRoute";
import PublicRoute from "./Componant/PublicRoute/PublicRoute";

function App() {
  // const [token,setToken] = React.useState("")
  // const [checktoken, setCheckToken] = React.useState(false);
  
  // useEffect(() => {
  //   HandlerToken();
  // }, []);
  
  // const HandlerToken = () => {
  //   // debugger;
    
  //   let token = localStorage.getItem("login-token");
  //   if (token) {
  //     setCheckToken(true);
  //   } else {
  //     setCheckToken(false);
  //   }
  // };


  return (
    <div>
      <Routes>
        <Route
          element={
            <Navigation />
          }
        >
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route element={<PublicRoute />}>
            <Route
              path="/login"
              element={<Login  />}
            />
            <Route path="/registration" element={<Registration />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
