import React from "react";
import "../../Style/Main.css";
import "../../Style/login.css";
import { useNavigate } from "react-router-dom";

function Login({ HandlerToken }) {
  const [logindata, setLoginData] = React.useState({
    email: "",
    password: "",
  });
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

    await fetch("http://localhost:5000/login", requestOptions)
      .then((response) => response.json())
      .then(async(result) => {
        localStorage.setItem("login-token", result.token);
      })
      .catch((error) => console.log("Error", error));
  };

  const HandleLogin = async () => {
    LoginAPI();
    setTimeout(() => {
      navigate("/home");
    }, 500);
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
        </div>
      </div>
    </div>
  );
}

export default Login;
