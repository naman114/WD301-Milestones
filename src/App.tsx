import React, { useState } from "react";
import AppContainer from "./AppContainer";
import Header from "./Header";
import UserForm from "./UserForm";
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
          <>
            <Home />
            <button
              className="group relative my-2 flex justify-center rounded-lg border border-transparent bg-blue-500 py-2 px-4 text-sm font-extrabold text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 "
              onClick={openForm}
            >
              Open Form
            </button>
          </>
        ) : (
          <UserForm formFields={formFields} closeForm={closeForm} />
        )}
      </div>
    </AppContainer>
  );
}

export default App;
