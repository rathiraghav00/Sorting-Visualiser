import React from "react";
import "./SortingVisualizer.css";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <p
        style={{
          position: "fixed",
          bottom: "0px",
          left: "0px",
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
    </footer>
  );
}

export default Footer;
