import React from "react";
import "../Style/Main.css";

function Home() {
  const [userdata, setUserData] = React.useState([]);
  let token = localStorage.getItem("login-token");

  const UserAPI = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Berear ${token}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    await fetch("http://localhost:5000/user", requestOptions)
      .then((response) => response.json())
      .then((result) => setUserData(result))
      .catch((error) => console.log("error", error));
  };
  React.useEffect(() => {
    UserAPI();
  }, []);

  return (
    <div className="Main">
      <div className="Main-header ">
        <h1>Wellcome to Home Page</h1>
        <div>
          <div className="user">
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
                  <span>{userdata?.result?.name}</span>
                    : expiredAt-
                  {userdata?.result?.expiredAt}{" "}
                </label>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
