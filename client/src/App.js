import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Environment from "./components/Environment";
import "./App.css";

function App({ config }) {
  const { name, environments } = config;
  const totalEnv = environments && environments.length;

  return (
    <div className="App">
      <Header appName={name}></Header>
      <div
        className="Env_Listing"
        style={{
          justifyContent: totalEnv < 2 ? "space-between" : "space-around"
        }}
      >
        {environments.map((env, index) => {
          return <Environment data={env} key={index}></Environment>;
        })}
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;
