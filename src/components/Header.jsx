import React from "react";

export default ({ appName }) => {
  return (
    <div className="App_Header">
      <div className="App_MainDecoration">
        <span>git-info</span>
      </div>
      <div className="App_UserBranding">
        <span>{appName}</span>
      </div>
      <div className="App_GitPromotion">
        <span>Find us on</span>
        <a href="//github.com" target="_blank" rel="noopener noreferrer">
          <img
            width="20"
            src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/github.svg"
            alt="go to git-info git page"
          ></img>
        </a>
      </div>
    </div>
  );
};
