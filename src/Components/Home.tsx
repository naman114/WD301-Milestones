import React from "react";
import logo from "../logo.svg";

export default function Home(props: { openFormCB: () => void }) {
  return (
    <div className="flex flex-col justify-center">
      <div className="flex">
        <img src={logo} className="h-48" />
        <div className="flex flex-1 items-center justify-center">
          <p>Welcome to the home page</p>
        </div>
      </div>
      <button
        className="group relative my-2 flex justify-center rounded-lg border border-transparent bg-blue-500 py-2 px-4 text-sm font-extrabold text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 "
        onClick={props.openFormCB}
      >
        Open Form
      </button>
    </div>
  );
}
