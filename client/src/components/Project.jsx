import React from "react";
import Loading from "./Loading";
import { API_URL } from "../constants";

import "./Project.css";

const errors = {
  API_ERROR: "Is your server down?",
  BAD_REQUEST: "BAD_REQUEST: "
};

export default class Project extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props.data,
      loading: true,
      error: false,
      errorMessage: ""
    };
  }

  getRepoInfo = path => {
    return fetch(`${API_URL}/api/repo/info?path=${path}`).then(data =>
      data.json()
    );
  };

  componentDidMount = () => {
    // fetch project info here
    this.getRepoInfo(this.state.path)
      .then(data => {
        const { data: repoInfo, success, message } = data;

        if (success) {
          this.setState({ ...repoInfo, loading: false });
        } else {
          this.setState({
            error: true,
            loading: false,
            errorMessage: errors.BAD_REQUEST + message
          });
        }
      })
      .catch(() => {
        this.setState({
          error: true,
          loading: false,
          errorMessage: errors.API_ERROR
        });
      });
  };

  render() {
    const {
      authorName,
      projectName,
      email,
      date,
      relativeDate,
      path,
      hash,
      subject,
      branch,
      background,
      borderColor,
      loading,
      errorMessage,
      error
    } = this.state;

    return (
      <div className="Project" style={{ background, borderColor }}>
        <div className="Project_Name">{projectName}</div>

        {loading && !error && <Loading></Loading>}
        {!loading && error && <p>{errorMessage}</p>}
        {!loading && !error && (
          <>
            <div className="Project_Info">
              <img
                alt="github logo"
                width="15"
                src="https://upload.wikimedia.org/wikipedia/commons/e/ed/Octicons-git-branch.svg"
              />
              <span className="Branch_Name">{branch}</span>
            </div>

            <div className="Commit_Info">
              <span>
                {hash} — {subject}
              </span>
              <span className="Commit_Author">
                <strong>by </strong>
                {authorName}
              </span>
              <span className="Commit_Date">
                {relativeDate} ({date})
              </span>
            </div>
          </>
        )}
      </div>
    );
  }
}
