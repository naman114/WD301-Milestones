import React from "react";
import AppContainer from "./AppContainer";
import Header from "./Header";

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
        ></Header>
        <form>
          {formFields.map((field) => (
            <React.Fragment key={field.id}>
              <label className="my-2 py-2">{field.label}</label>
              <input
                type={field.inputType}
                className="focus:border-blueGray-500 focus:shadow-outline my-2 w-full transform rounded-lg border-2 border-gray-200 bg-gray-100 p-2 ring-offset-2 ring-offset-current transition duration-500 ease-in-out focus:bg-white focus:outline-none focus:ring-2"
              />
            </React.Fragment>
          ))}
          <button
            type="submit"
            className="group relative my-2 flex justify-center rounded-lg border border-transparent bg-blue-500 py-2 px-4 text-sm font-extrabold text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Submit
          </button>
        </form>
      </div>
    </AppContainer>
  );
}

export default App;
