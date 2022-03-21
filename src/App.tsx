import React, { useState } from "react";
import AppContainer from "./Components/AppContainer";
import Header from "./Components/Header";
import Home from "./Components/Home";
import FormList from "./Components/FormList";

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
          <FormList closeFormCB={closeForm} />
        )}
      </div>
    </AppContainer>
  );
}

export default App;
