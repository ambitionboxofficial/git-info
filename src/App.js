import React from "react";
import Header from "./components/Header";
import "./App.css";

function App({ config }) {
  const { name } = config;

  return (
    <div className="App">
      <Header appName={name}></Header>
    </div>
  );
}

export default App;
