import React, { useState, useEffect } from "react";
import LabelledInput from "./LabelledInput";

interface FormData {
  title: string;
  formFields: formField[];
}

interface formField {
  id: number;
  label: string;
  fieldType: string;
  value: string;
}

const initialFormFields: formField[] = [
  { id: 1, label: "First Name", fieldType: "text", value: "" },
  { id: 2, label: "Last Name", fieldType: "text", value: "" },
  { id: 3, label: "Email", fieldType: "email", value: "" },
  { id: 4, label: "Date of Birth", fieldType: "date", value: "" },
  { id: 5, label: "Phone Number", fieldType: "text", value: "" },
];

const saveFormData = (currentState: FormData) => {
  localStorage.setItem("formData", JSON.stringify(currentState));
};

const initialState = (): FormData => {
  const formFieldsJSON = localStorage.getItem("formData");
  const persistentFormFields = formFieldsJSON
    ? JSON.parse(formFieldsJSON)
    : { title: "Untitled Form", formFields: initialFormFields };
  return persistentFormFields;
};

export default function UserForm(props: { closeFormCB: () => void }) {
  const [state, setState] = useState(initialState());
  const [newField, setNewField] = useState("");

  useEffect(() => {
    console.log("Component is mounted");
    document.title = "User Form";

    return () => {
      document.title = "React App";
    };
  }, []);

  useEffect(() => {
    let timeout = setTimeout(() => {
      saveFormData(state);
      console.log("saving to local storage");
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [state]);

  const addField = () => {
    setState({
      ...state,
      formFields: [
        ...state.formFields,
        {
          id: Number(new Date()),
          label: newField,
          fieldType: "text",
          value: "",
        },
      ],
    });
    // Reset the input's value after adding a new field
    setNewField("");
  };

  const removeField = (id: number) => {
    setState({
      ...state,
      formFields: state.formFields.filter((field) => field.id !== id),
    });
  };

  const updateInputFieldValue = (id: number, value: string) => {
    setState({
      ...state,
      formFields: state.formFields.map((field) => {
        if (field.id === id) {
          return {
            ...field,
            value,
          };
        }
        return field;
      }),
    });
  };

  const resetForm = () => {
    setState({
      ...state,
      formFields: state.formFields.map((field) => {
        return {
          ...field,
          value: "",
        };
      }),
    });
  };

  return (
    <div className="flex flex-col gap-4 divide-y-2 divide-dotted">
      <input
        type="text"
        className="focus:border-blueGray-500 focus:shadow-outline my-2 flex flex-1 transform rounded-lg border-2 border-gray-200 bg-gray-100 p-2 ring-offset-2 ring-offset-current transition duration-500 ease-in-out focus:bg-white focus:outline-none focus:ring-2"
        onChange={(e) => {
          setState({
            ...state,
            title: e.target.value,
          });
        }}
        value={state.title}
      />
      <div>
        {state.formFields.map((field) => (
          <React.Fragment key={field.id}>
            <LabelledInput
              id={field.id}
              label={field.label}
              fieldType={field.fieldType}
              value={field.value}
              removeFieldCB={removeField}
              updateInputFieldValueCB={updateInputFieldValue}
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
          onClick={(_) => saveFormData(state)}
        >
          Save
        </button>
        <button
          onClick={resetForm}
          className="group relative my-2 flex justify-center rounded-lg border border-transparent bg-blue-500 py-2 px-4 text-sm font-extrabold text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Reset
        </button>
        <button
          onClick={props.closeFormCB}
          className="group relative my-2 flex justify-center rounded-lg border border-transparent bg-blue-500 py-2 px-4 text-sm font-extrabold text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Close Form
        </button>
      </div>
    </div>
  );
}
