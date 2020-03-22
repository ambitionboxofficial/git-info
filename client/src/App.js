import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Environment from "./components/Environment";
import Loading from "./components/Loading";
import "./App.css";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  componentDidMount = () => {
    fetch("/config.json")
      .then(data => data.json())
      .then(data => {
        this.setState({ ...data, loading: false });
      });
  };

  render() {
    const { name, environments, loading } = this.state;
    const totalEnv = environments && environments.length;

    return (
      <div className="App">
        <Header appName={name}></Header>

        {loading && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "70vh"
            }}
          >
            <Loading height={50} width={50}></Loading>
          </div>
        )}

        {!loading && (
          <>
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
          </>
        )}
        <Footer></Footer>
      </div>
    );
  }
}
