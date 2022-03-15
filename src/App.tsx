import React, { useState } from "react";
import AppContainer from "./AppContainer";
import Header from "./Components/Header";
import UserForm from "./Components/UserForm";
import Home from "./Components/Home";

const formFields = [
  { id: 1, label: "First Name", inputType: "text" },
  { id: 2, label: "Last Name", inputType: "text" },
  { id: 3, label: "Email", inputType: "email" },
  { id: 4, label: "Date of Birth", inputType: "date" },
  { id: 5, label: "Phone Number", inputType: "tel" },
];

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
          <UserForm formFields={formFields} closeFormCB={closeForm} />
        )}
      </div>
    </AppContainer>
  );
}

export default App;
