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

  return state === "HOME" ? (
    <Home openFormCB={openForm} />
  ) : (
    <FormList closeFormCB={closeForm} />
  );
}

export default App;
