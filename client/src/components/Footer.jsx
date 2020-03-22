import React from "react";

export default ({ appName }) => {
  return (
    <div className="Footer">
      <span className="Footer_Branding">
        Made with &#x2665; at{" "}
        <a className="Footer_Link" href="https://www.ambitionbox.com">
          <strong>AmbitionBox</strong>
        </a>
      </span>
    </div>
  );
};
