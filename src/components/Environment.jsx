import React from "react";

export default ({ data }) => {
  const { name } = data;
  return (
    <div className="Env_MainContainer">
      <div className="Env_Name">{name}</div>
    </div>
  );
};
