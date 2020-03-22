import React from "react";
import Loading from "./Loading";
import "./Project.css";

export default class Project extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...props.data, loading: true };
    console.log("data", this.state);
  }

  componentDidMount = () => {
    // fetch project info here
  };

  render() {
    const { name, path, branch, loading } = this.state;
    return (
      <div className="Project">
        <div className="Project_Name">{name}</div>

        {loading && <Loading></Loading>}
        {!loading && (
          <div className="Project_Info">
            <img
              alt="github logo"
              width="20"
              src="https://upload.wikimedia.org/wikipedia/commons/e/ed/Octicons-git-branch.svg"
            />
            <span className="Project_Branch_Name">{branch}</span>
          </div>
        )}
      </div>
    );
  }
}
