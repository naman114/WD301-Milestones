import React from "react";
import logo from "../logo.svg";

export default function Header(props: { title: string }) {
  return (
    <div className="flex items-center gap-2">
      <img
        src={logo}
        className="h-16 w-16 animate-spin"
        alt="logo"
        style={{ animation: "spin 2s linear infinite" }}
      />
      <div className="flex items-center gap-2">
        {[
          { page: "Home", url: "/" },
          { page: "About", url: "/about" },
        ].map((link) => (
          <a
            href={link.url}
            key={link.url}
            className="m-2 p-2 uppercase text-gray-800"
          >
            {link.page}
          </a>
        ))}
      </div>
    </div>
  );
}
