import React from "react";
import AppContainer from "./AppContainer";
import Header from "./Header";
import UserForm from "./UserForm";

const formFields = [
  { id: 1, label: "First Name", inputType: "text" },
  { id: 2, label: "Last Name", inputType: "text" },
  { id: 3, label: "Email", inputType: "email" },
  { id: 4, label: "Date of Birth", inputType: "date" },
  { id: 5, label: "Phone Number", inputType: "tel" },
];

function App() {
  return (
    <AppContainer>
      <div className="mx-auto w-full max-w-xl rounded-xl bg-white p-4 shadow-lg">
        <Header
          title={"Welcome to Lesson 5 of $react-typescript with #tailwindcss"}
        />
        <UserForm formFields={formFields} />
      </div>
    </AppContainer>
  );
}

export default App;
