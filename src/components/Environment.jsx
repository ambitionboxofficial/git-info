import React from "react";
import Project from "./Project";

import "./Environment.css";

export default ({ data }) => {
  const { name, domain, projects } = data;

  return (
    <div className="Env_MainContainer">
      <div className="Env_Name">
        <a className="Env_Link" href={`//${domain}`}>
          {name} &rarr;
        </a>
      </div>
      {projects.map((project, index) => {
        return <Project data={project} key={index}></Project>;
      })}
    </div>
  );
};
