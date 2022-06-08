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
  const [validation, setValidation] = React.useState({
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

  let filterEmail =
    /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

  const validationHandler = () => {
    if (logindata.email === "" && logindata.password === "") {
      setValidation({
        ...validation,
        email: "*",
        password: "*",
      });
    } else if (logindata.email === "") {
      setValidation({ ...validation, Name: "", email: "*" });
    } else if (!filterEmail.test(logindata.email)) {
      setValidation({ ...validation, email: "*Email is Wrong*" });
    } else if (logindata.password === "") {
      setValidation({
        ...validation,
        email: "",
        password: "*",
      });
    } else if (
      logindata.password.length < 8 ||
      logindata.password.length > 16
    ) {
      setValidation({
        ...validation,
        password: "Password is must be min 8 & max 16 characters",
      });
    } else {
      setValidation({ ...validation, password: "" });
      console.log(" All Complate");
    }
  };
console.log(validation);

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

  React.useEffect(() => {
    validationHandler();
  }, [logindata]);

  const HandleLogin = async () => {
    if (
      validation.email === "" &&
      validation.password === ""
    ) {
      LoginAPI();
    } else {
      console.log("Ubhi no ree");
      validationHandler();
    }
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
              {validation.email && (
                <label className="form-label fs-5 fw-light text-danger">
                  {validation.email}
                </label>
              )}
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
              {validation.password && (
                <label className="form-label fs-5 fw-light text-danger">
                  {validation.password}
                </label>
              )}
              <input
                type="password"
                className="form-control"
                id="exampleFormControlInput2"
                placeholder="password"
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
