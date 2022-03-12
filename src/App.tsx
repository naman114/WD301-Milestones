import React from "react";
import AppContainer from "./AppContainer";
import Header from "./Header";

const formFields = [
  { id: 1, label: "First Name" },
  { id: 2, label: "Last Name" },
  { id: 3, label: "Email" },
];

function App() {
  return (
    <AppContainer>
      <div className="p-4 mx-auto bg-white shadow-lg rounded-xl">
        <Header
          title={"Welcome to the lesson 5 of react-typescript with tailwindcss"}
        ></Header>
        {formFields.map((field) => (
          <React.Fragment key={field.id}>
            <label>{field.label}</label>
            <input
              type="text"
              className="border-2 border-gray-200 rounded-lg p-2 m-2 w-full"
            />
          </React.Fragment>
        ))}
      </div>
    </AppContainer>
  );
}

export default App;
