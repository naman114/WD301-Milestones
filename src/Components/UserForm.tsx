import React, { useState } from "react";
import LabelledInput from "./LabelledInput";

const formFields = [
  { id: 1, label: "First Name", fieldType: "text" },
  { id: 2, label: "Last Name", fieldType: "text" },
  { id: 3, label: "Email", fieldType: "email" },
  { id: 4, label: "Date of Birth", fieldType: "date" },
  { id: 5, label: "Phone Number", fieldType: "tel" },
];

export default function UserForm(props: { closeFormCB: () => void }) {
  const [state, setState] = useState(formFields);

  const addField = () => {
    console.log(state);
    setState([
      ...state,
      { id: Number(new Date()), label: "New Field", fieldType: "text" },
    ]);
  };

  const removeField = (id: number) => {
    setState(state.filter((field) => field.id !== id));
  };

  return (
    <form>
      {state.map((field) => (
        <React.Fragment key={field.id}>
          <LabelledInput
            id={field.id}
            label={field.label}
            fieldType={field.fieldType}
            removeFieldCB={removeField}
          />
        </React.Fragment>
      ))}
      <div className="flex space-x-2">
        <button
          type="submit"
          className="group relative my-2 flex justify-center rounded-lg border border-transparent bg-blue-500 py-2 px-4 text-sm font-extrabold text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Submit
        </button>
        <button
          onClick={props.closeFormCB}
          className="group relative my-2 flex justify-center rounded-lg border border-transparent bg-blue-500 py-2 px-4 text-sm font-extrabold text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Close Form
        </button>
        <button
          type="button"
          onClick={addField}
          className="group relative my-2 flex justify-center rounded-lg border border-transparent bg-blue-500 py-2 px-4 text-sm font-extrabold text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Add Field
        </button>
      </div>
    </form>
  );
}
