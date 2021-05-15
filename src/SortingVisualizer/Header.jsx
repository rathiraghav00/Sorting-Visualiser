import React from "react";
import "./SortingVisualizer.css";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <div>
      <p
        style={{
          // position: "absolute",
          bottom: "0px",
          left: "0px",
          right: "0px",
          textAlign: "center",
          width: "100%",
        }}
      >
        {" "}
        Sorting Visualiser | Copyright ⓒ {year} |
        <a href={"https://forms.gle/sGiTmc9SdRcML5Ug7"}>
          {" "}
          Please leave a feedback
        </a>
      </p>
    </div>
  );
}

export default Footer;
