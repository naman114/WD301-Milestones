import React, { useState } from "react";
import AppContainer from "./AppContainer";
import Header from "./Components/Header";
import UserForm from "./Components/UserForm";
import Home from "./Components/Home";

function App() {
  const [state, setState] = useState("HOME");

  const openForm = () => {
    setState("FORM");
  };

  const closeForm = () => {
    setState("HOME");
  };

  return (
    <AppContainer>
      <div className="mx-auto w-full max-w-xl rounded-xl bg-white p-4 shadow-lg">
        <Header
          title={"Welcome to Lesson 5 of $react-typescript with #tailwindcss"}
        />
        {state === "HOME" ? (
          <Home openFormCB={openForm} />
        ) : (
          <UserForm closeFormCB={closeForm} />
        )}
      </div>
    </AppContainer>
  );
}

export default App;
