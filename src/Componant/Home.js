import React from "react";
import "../Style/Main.css";

import { ToastContainer, toast } from "react-toastify";

function Home() {
  const [userdata, setUserData] = React.useState([]);
  const [loader, setLoader] = React.useState(false);
  let token = localStorage.getItem("login-token");

  const UserAPI = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Berear ${token}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    await toast.promise(
      fetch("http://localhost:5000/user", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          // toast.success("successfull request");
          setUserData(result);
        })
        .catch((error) => toast.error("request failed"))
    );
  };

  React.useEffect(() => {
    if (userdata.length > 0) {
      setLoader(true);
      console.log(userdata);
    } else {
      setLoader(false);
    }
  }, [userdata]);

  React.useEffect(() => {
    UserAPI();
  }, []);

  return (
    <div className="Main">
      <div className="Main-header ">
        <h1>Wellcome to Home Page</h1>
        <div>
          <div className="user">
            <div>
              {!loader ? (
                <div class="spinner-border" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              ) : (
                <div>
                  {!userdata.result && (
                    <table className="table table-primary table-striped ">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Name</th>
                          <th scope="col">Email</th>
                          <th scope="col">Address</th>
                        </tr>
                      </thead>
                      <tbody className="left-align">
                        {userdata?.map((user, index) => (
                          <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.address}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                  {userdata.result && (
                    <div>
                      <label>
                        <span>{userdata?.result?.name}</span>: expiredAt-
                        {userdata?.result?.expiredAt}{" "}
                      </label>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Home;
