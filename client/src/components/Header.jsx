import React from "react";

export default ({ appName }) => {
  return (
    <div className="App_Header">
      <div className="App_MainDecoration">
        <span>git-info</span>
        <span className="App_UserBranding">&nbsp; — {appName}</span>
      </div>
    </div>
  );
};
