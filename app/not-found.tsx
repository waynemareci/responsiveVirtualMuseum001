import Link from "next/link";
import React from "react";
import "./styles/notFound.css"

export default function NotFound() {
  return (
    <div
      style={{
        color: "white",
        backgroundSize: "cover",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="notFoundText">
        <h2>Not Found</h2>
        <p>something went wrong</p>
        <Link style={{ color: "white" }} href="/">
          return to search page
        </Link>
      </div>
    </div>
  );
}
