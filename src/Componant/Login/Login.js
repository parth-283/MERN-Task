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
  const [loader, setLoader] = React.useState(false);

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
          toast.success("Login successfull");
          localStorage.setItem("login-token", result.token);
          setMainToken(result.token);
        })
        .catch((error) => toast.error("request failed"))
    );

    // await fetch("http://localhost:5000/login", requestOptions)
    //   .then((response) => response.json())
    //   .then(async (result) => {
    //     setMainToken(result.token)
    //     localStorage.setItem("login-token",result.token )
    //   })
    //   .catch((error) => console.log("Error", error));
  };

  console.log(Maintoken);
  React.useEffect(() => {
    if (Maintoken.length > 0) {
      setLoader(true);
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } else {
      setLoader(false);
    }
  }, [Maintoken]);

  const HandleLogin = async () => {
    LoginAPI();
  };

  return (
    <div className="Main">
      <div className="Main-header left-align">
        {loader ? (
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        ) : (
          <div>

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
        )}
        <ToastContainer />
      </div>
    </div>
  );
}

export default Login;
