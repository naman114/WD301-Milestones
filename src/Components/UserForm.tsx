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
  const [newField, setNewField] = useState("");

  const addField = () => {
    setState([
      ...state,
      { id: Number(new Date()), label: newField, fieldType: "text" },
    ]);
    // Input value after adding a new field
    setNewField("");
  };

  const removeField = (id: number) => {
    setState(state.filter((field) => field.id !== id));
  };

  return (
    <form className="flex flex-col gap-4 divide-y-2 divide-dotted">
      <div>
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
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          className="focus:border-blueGray-500 focus:shadow-outline my-2 flex flex-1 transform rounded-lg border-2 border-gray-200 bg-gray-100 p-2 ring-offset-2 ring-offset-current transition duration-500 ease-in-out focus:bg-white focus:outline-none focus:ring-2"
          onChange={(e) => {
            setNewField(e.target.value);
          }}
          value={newField}
        />
        <button
          type="button"
          onClick={addField}
          className="group relative my-2 flex justify-center rounded-lg border border-transparent bg-blue-500 py-2 px-4 text-sm font-extrabold text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Add Field
        </button>
      </div>
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
      </div>
    </form>
  );
}
