import React, { useEffect, useState } from "react";
import logo from "./assets/x_logo.png";
import useDataFetch from "./hooks/useDataFetch";
import "./styles/App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useParams,
} from "react-router-dom";

function App() {
  const { data, loading, error } = useDataFetch();
  // const { accessToken, refreshToken } = useParams();
  // const [accessTokenLocal, setAccessToken] = useState(null);
  // const [refreshTokenLocal, setRefreshToken] = useState(null);

  // useEffect(() => {
  //   if (accessToken) {
  //     setAccessToken(accessToken);
  //   }
  //   if (refreshToken) {
  //     setRefreshToken(refreshToken);
  //   }
  // }, [accessToken, refreshToken]);

  const handleTwitterLogin = () => {
    // Redirect the user to the OAuth server's Twitter authentication route
    window.location.href = "http://localhost:3100/auth/twitter";
  };

  return (
    <div className="main-container">
      <div className="media-logo-div">
        <img src={logo} className="media-logo" alt="logo" />
      </div>

      <div>
        <h1>OAuth with Twitter</h1>
        <button onClick={handleTwitterLogin}>Sign in with Twitter</button>
      </div>

      <div className="content-div">
        {loading ? (
          "Loading..."
        ) : error ? (
          `Error: ${error.message}`
        ) : (
          <div>
            {/* Render your data here */}
            {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
            <Routes>
              <Route
                path="/:twitterAccessToken/:twitterRefreshToken"
                component={Callback}
              />
            </Routes>
          </div>
        )}
      </div>
    </div>
  );
}

function Callback() {
  const { accessToken, refreshToken } = useParams();
  const [accessTokenLocal, setAccessToken] = useState(null);
  const [refreshTokenLocal, setRefreshToken] = useState(null);

  useEffect(() => {
    if (accessToken) {
      setAccessToken(accessToken);
    }
    if (refreshToken) {
      setRefreshToken(refreshToken);
    }
    // You can store these tokens in your app's state, local storage, or a global state management solution
  }, [accessToken, refreshToken]);

  return (
    <div>
      <p>accessTokenLocal {{ accessTokenLocal }}</p>
    </div>
  );
}

export default App;
