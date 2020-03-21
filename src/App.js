import React from "react";
import "./App.css";

function App({ config }) {
  const { name } = config;

  return (
    <div className="App">
      <h1 className="pageTitle">{name}</h1>
    </div>
  );
}

export default App;
