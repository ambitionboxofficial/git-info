import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Environment from "./components/Environment";
import Loading from "./components/Loading";
import { API_URL } from "./constants";
import "./App.css";

const COMMON_STATE_STYLES = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "70vh"
};

const errors = {
  NO_CONFIG_FILE: "Couldn't fetch config from your server. Is it napping?"
};

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { environments: [], loading: true };
  }

  componentDidMount = () => {
    fetch(`${API_URL}/config.json`)
      .then(data => data.json())
      .then(data => {
        this.setState({ ...data, loading: false });
      })
      .catch(() => {
        this.setState({
          loading: false,
          error: true,
          errorMessage: errors.NO_CONFIG_FILE
        });
      });
  };

  render() {
    const { name, environments, loading, errorMessage, error } = this.state;
    const totalEnv = environments && environments.length;

    return (
      <div className="App">
        <Header appName={name}></Header>

        {loading && (
          <div style={COMMON_STATE_STYLES}>
            <Loading height={50} width={50}></Loading>
          </div>
        )}

        {!loading && error && (
          <div style={COMMON_STATE_STYLES}>
            <p>{errorMessage}</p>
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
