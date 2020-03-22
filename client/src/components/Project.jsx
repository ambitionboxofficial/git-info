import React from "react";
import Loading from "./Loading";
import "./Project.css";

export default class Project extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...props.data, loading: true };
  }

  getRepoInfo = path => {
    return fetch(
      `http://localhost:3001/api/repo/info?path=${path}`
    ).then(data => data.json());
  };

  componentDidMount = () => {
    // fetch project info here
    this.getRepoInfo(this.state.path).then(data => {
      this.setState({ ...data.data, loading: false });
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
      loading
    } = this.state;

    return (
      <div className="Project" style={{ background, borderColor }}>
        <div className="Project_Name">{projectName}</div>

        {loading && <Loading></Loading>}
        {!loading && (
          <>
            <div className="Project_Info">
              <img
                alt="github logo"
                width="15"
                src="https://upload.wikimedia.org/wikipedia/commons/e/ed/Octicons-git-branch.svg"
              />
              <span className="Branch_Name">{branch}</span>
            </div>

            <div class="Commit_Info">
              <span>
                {hash} — {subject}
              </span>
              <span class="Commit_Author">
                <strong>by </strong>
                {authorName}
              </span>
              <span class="Commit_Date">
                {relativeDate} ({date})
              </span>
            </div>
          </>
        )}
      </div>
    );
  }
}
