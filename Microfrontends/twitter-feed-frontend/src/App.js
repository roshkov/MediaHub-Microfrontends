import React from "react";
import logo from "./assets/x_logo.png";
import useDataFetch from "./hooks/useDataFetch";
import "./styles/App.css";

function App() {
  const { data, loading, error } = useDataFetch();

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
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
