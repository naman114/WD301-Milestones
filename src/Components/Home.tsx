import React from "react";
import logo from "../logo.svg";

export default function Home() {
  return (
    <div className="flex">
      <img src={logo} className="h-48" />
      <div className="flex flex-1 items-center justify-center">
        <p>Welcome to the home page</p>
      </div>
    </div>
  );
}
