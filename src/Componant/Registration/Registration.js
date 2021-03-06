import React from "react";
import "../../Style/Main.css";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";

function Registration() {
  const [regdata, setRegData] = React.useState({
    Name: "",
    Email: "",
    Address: "",
    Password: "",
  });
  const [validation, setValidation] = React.useState({
    Name: "",
    Email: "",
    Address: "",
    Password: "",
  });
  const [token, steToken] = React.useState("");
  const [loader, setLoader] = React.useState(false);

  const navigate = useNavigate();

  const registerAPI = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      name: regdata.Name,
      email: regdata.Email,
      address: regdata.Address,
      password: regdata.Password,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    await toast.promise(
      fetch("http://localhost:5000/register", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          toast.success("successfull Registration");
          steToken(result);
        })
        .catch((error) => toast.error("request failed"))
    );
  };

  React.useEffect(() => {
    if (token) {
      setLoader(true);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
      console.log(token.token);
    } else {
      setLoader(false);
    }
  }, [token]);

  let filterEmail =
    /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  let filterName = /^[a-zA-Z\s]*$/;

  const validationHandler = () => {
    if (
      regdata.Name === "" &&
      regdata.Email === "" &&
      regdata.Address === "" &&
      regdata.Password === ""
    ) {
      setValidation({
        ...validation,
        Name: "*",
        Email: "*",
        Address: "*",
        Password: "*",
      });
    } else if (regdata.Name === "") {
      setValidation({ ...validation, Name: "*" });
    } else if (!filterName.test(regdata.Name)) {
      setValidation({ ...validation, Name: "*Invalid field*" });
    } else if (regdata.Email === "") {
      setValidation({ ...validation, Name: "", Email: "*" });
    } else if (!filterEmail.test(regdata.Email)) {
      setValidation({ ...validation, Email: "*Email is Wrong*" });
    } else if (regdata.Address === "") {
      setValidation({
        ...validation,
        Email: "",
        Address: "*",
      });
    } else if (regdata.Password === "") {
      setValidation({
        ...validation,
        Address: "",
        Password: "*",
      });
    } else if (regdata.Password.length < 8 || regdata.Password.length > 16) {
      setValidation({
        ...validation,
        Password: "Password is must be min 8 & max 16 characters",
      });
    } else {
      setValidation({ ...validation, Password: "" });
      console.log(" All Complate");
    }
  };
  React.useEffect(() => {
    validationHandler();
  }, [regdata]);
  console.log(validation, "###########validation#############");

  const HandleClick = (e) => {
    if (
      validation.Name === "" &&
      validation.Email === "" &&
      validation.Address === "" &&
      validation.Password === ""
    ) {
      registerAPI();
    } else {
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
            <div>
              <div className="mb-3 ">
                <label className="form-label fs-5 fw-light">Name</label>
                {validation.Name && (
                  <label className="form-label fs-5 fw-light text-danger">
                    {validation.Name}
                  </label>
                )}
                <input
                  type="text"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Name"
                  onChange={(e) =>
                    setRegData({ ...regdata, Name: e.target.value })
                  }
                />
              </div>
              <div className="mb-3 ">
                <label className="form-label fs-5 fw-light">Email</label>
                {validation.Email && (
                  <label className="form-label fs-5 fw-light text-danger">
                    {validation.Email}
                  </label>
                )}
                <input
                  type="email"
                  className="form-control"
                  id="exampleFormControlInput2"
                  placeholder="name@example.com"
                  onChange={(e) =>
                    setRegData({ ...regdata, Email: e.target.value })
                  }
                />
              </div>
              <div className="mb-3 ">
                <label className="form-label fs-5 fw-light">Address</label>
                {validation.Address && (
                  <label className="form-label fs-5 fw-light text-danger">
                    {validation.Address}
                  </label>
                )}
                <input
                  type="text"
                  className="form-control"
                  id="exampleFormControlInput3"
                  placeholder="Address"
                  onChange={(e) =>
                    setRegData({ ...regdata, Address: e.target.value })
                  }
                />
              </div>
              <div className="mb-3">
                <label className="form-label fs-5 fw-light">Password</label>
                {validation.Password && (
                  <label className="form-label fs-5 fw-light text-danger">
                    {validation.Password}
                  </label>
                )}
                <input
                  type="Password"
                  className="form-control"
                  id="exampleFormControlInput4"
                  placeholder="Password"
                  onChange={(e) =>
                    setRegData({ ...regdata, Password: e.target.value })
                  }
                />
              </div>
              <div className="mb-3">
                <button
                  className="btn btn-success"
                  onClick={() => HandleClick()}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}

export default Registration;
