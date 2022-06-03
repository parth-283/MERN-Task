import React from "react";
import "../../Style/Main.css";
import "../../Style/login.css";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";

function Login({ HandlerToken }) {
  const [logindata, setLoginData] = React.useState({
    email: "",
    password: "",
  });
  const [Maintoken, setMainToken] = React.useState("");
  const navigate = useNavigate();

  const LoginAPI = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      email: logindata.email,
      password: logindata.password,
    });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    await toast.promise(
      fetch("http://localhost:5000/login", requestOptions)
        .then((response) => response.json())
        .then(async (result) => {
          setMainToken(result.token);
          localStorage.setItem("login-token", result.token);
        })
        .catch((error) => console.log("Error", error)),
      {
        pending: "Promise is pending",
        success: "Promise resolved 👌",
        error: "Promise rejected 🤯",
      }
    );

    // await fetch("http://localhost:5000/login", requestOptions)
    //   .then((response) => response.json())
    //   .then(async (result) => {
    //     setMainToken(result.token)
    //     localStorage.setItem("login-token",result.token )
    //   })
    //   .catch((error) => console.log("Error", error));
  };

  const HandleLogin = async () => {
    LoginAPI();
    setTimeout(() => {
      navigate("/");
    }, 3000);
  };

  return (
    <div className="Main">
      <div className="Main-header left-align">
        <div className="mb-3 ">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="name@example.com"
            onChange={(e) =>
              setLoginData({ ...logindata, email: e.target.value })
            }
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="Password"
            className="form-control"
            id="exampleFormControlInput2"
            placeholder="Password"
            onChange={(e) =>
              setLoginData({ ...logindata, password: e.target.value })
            }
          />
        </div>
        <div className="mb-3">
          <button className="btn btn-success" onClick={() => HandleLogin()}>
            Login
          </button>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
}

export default Login;
