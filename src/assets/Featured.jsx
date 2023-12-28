import React from "react";

function Featured() {
  return (
    <div
      style={{
        backgroundColor: "#ffce32",
        width: "80px",
        height: "15px",
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "baseline",
      }}
    >
      <svg
        width="15px"
        height="15px"
        viewBox="0 0 16 16"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
      >
        <rect width="16" height="16" id="icon-bound" fill="none" />
        <path d="M10,1L3,9h4.5L6,15l7-8H8.5L10,1z" />
      </svg>
      <p style={{ fontSize: "10PX", fontWeight:"500"}} className="my-auto">FEATURED</p>
    </div>
  );
}

export default Featured;
