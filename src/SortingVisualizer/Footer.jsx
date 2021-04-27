import React from "react";
function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <p
        style={{
          position: "fixed",
          bottom: "10px",
          width: "100%",
          height: "0.10rem",
          display: "relative",
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
