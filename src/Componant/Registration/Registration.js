import React from "react";
import "../../Style/Main.css";
import { useNavigate } from 'react-router-dom';

function Registration() {
  const [regdata, setRegData] = React.useState({
    Name: "",
    Email: "",
    Address: "",
    Password: "",
  });
  const [token, steToken] = React.useState("")
  const navigate = useNavigate()
  
  const registerAPI = () => {
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

    fetch("http://localhost:5000/register", requestOptions)
      .then((response) => response.json())
      .then((result) => steToken(result))
      .catch((error) => console.log("error", error));
  };

  const HandleClick = (e) => {
    registerAPI()
    navigate('/login')
  };


  return (
    <div className="Main">
      <div className="Main-header left-align">
        <div>
          <div className="mb-3 ">
            <label className="form-label fs-5 fw-light">Name</label>
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Name"
              onChange={(e) => setRegData({ ...regdata, Name: e.target.value })}
            />
          </div>
          <div className="mb-3 ">
            <label className="form-label fs-5 fw-light">Email</label>
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
            <button className="btn btn-success" onClick={() => HandleClick()}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registration;
