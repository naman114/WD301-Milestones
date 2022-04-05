import React, { useState, useEffect, useRef } from "react";
import LabelledInput from "./LabelledInput";
import { saveLocalForms, getLocalForms } from "../utils/storageUtils";
import { Link, navigate } from "raviger";
import { FormData, formField, textFieldTypes } from "../types/formTypes";

const initialFormFields: formField[] = [
  { kind: "text", id: 1, label: "First Name", fieldType: "text", value: "" },
  { kind: "text", id: 2, label: "Last Name", fieldType: "text", value: "" },
  { kind: "text", id: 3, label: "Email", fieldType: "email", value: "" },
  { kind: "text", id: 4, label: "Date of Birth", fieldType: "date", value: "" },
  { kind: "text", id: 5, label: "Phone Number", fieldType: "text", value: "" },
  {
    kind: "dropdown",
    id: 6,
    label: "Priority",
    options: ["High", "Low"],
    value: "",
  },
];

const initialState = (formId: number): FormData => {
  if (formId === 0) {
    const newForm = {
      id: Number(new Date()),
      title: "Untitled Form",
      formFields: initialFormFields,
    };

    // Save newly added form to local storage
    const savedForms = getLocalForms();
    saveLocalForms([...savedForms, newForm]);

    return newForm;
  }

  const savedForms = getLocalForms();
  return savedForms.filter((form) => form.id === formId)[0];
};

const saveCurrentForm = (currentForm: FormData) => {
  const savedForms = getLocalForms();
  const updatedForms = savedForms.map((form) => {
    if (form.id === currentForm.id) return currentForm;
    return form;
  });
  saveLocalForms(updatedForms);
};

export default function UserForm(props: { formId: number }) {
  const [state, setState] = useState(() => initialState(props.formId));
  const [newFieldLabel, setNewFieldLabel] = useState("");
  const [newFieldType, setNewFieldType] = useState("text" as textFieldTypes);
  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    state.id !== props.formId && navigate(`/forms/${state.id}`);
  }, [state.id, props.formId]);

  useEffect(() => {
    console.log("Component is mounted");
    document.title = "User Form";
    titleRef.current?.focus();
    return () => {
      document.title = "React App";
    };
  }, []);

  useEffect(() => {
    let timeout = setTimeout(() => {
      saveCurrentForm(state);
      console.log("saving to local storage");
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [state]);

  const addField = () => {
    if (newFieldLabel === "") return;

    setState({
      ...state,
      formFields: [
        ...state.formFields,
        {
          kind: "text",
          id: Number(new Date()),
          label: newFieldLabel,
          fieldType: newFieldType,
          value: "",
        },
      ],
    });

    // Reset the input's value after adding a new field
    setNewFieldLabel("");
  };

  const removeField = (id: number) => {
    setState({
      ...state,
      formFields: state.formFields.filter((field) => field.id !== id),
    });
  };

  const updateInputFieldLabel = (id: number, label: string) => {
    setState({
      ...state,
      formFields: state.formFields.map((field) => {
        if (field.id === id) {
          return {
            ...field,
            label,
          };
        }
        return field;
      }),
    });
  };

  const updateFieldType = (id: number, type: textFieldTypes) => {
    setState({
      ...state,
      formFields: state.formFields.map((field) => {
        if (field.id === id) {
          return {
            ...field,
            fieldType: type,
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

  const saveUserInput = (id: number, value: string) => {
    setState({
      ...state,
      formFields: state.formFields.map((field) => {
        if (field.id === id)
          return {
            ...field,
            value,
          };
        return field;
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
        ref={titleRef}
      />
      <div>
        {state.formFields.map((field) => {
          switch (field.kind) {
            case "text":
              return (
                <LabelledInput
                  id={field.id}
                  label={field.label}
                  fieldType={field.fieldType}
                  value={field.value}
                  updateFieldTypeCB={updateFieldType}
                  removeFieldCB={removeField}
                  updateInputFieldLabelCB={updateInputFieldLabel}
                />
              );
            case "dropdown":
              return (
                <select
                  value={field.value}
                  onChange={(e) => {
                    saveUserInput(field.id, e.target.value);
                  }}
                >
                  <option value="">Select an option</option>
                  {field.options.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              );
          }
        })}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          className="focus:border-blueGray-500 focus:shadow-outline my-2 flex flex-1 transform rounded-lg border-2 border-gray-200 bg-gray-100 p-2 ring-offset-2 ring-offset-current transition duration-500 ease-in-out focus:bg-white focus:outline-none focus:ring-2"
          onChange={(e) => {
            setNewFieldLabel(e.target.value);
          }}
          value={newFieldLabel}
          placeholder="Enter a label for the new field"
        />
        <select
          className="focus:border-blueGray-500 focus:shadow-outline my-2 flex transform rounded-lg border-2 border-gray-200 bg-gray-100 p-2 ring-offset-2 ring-offset-current transition duration-500 ease-in-out focus:bg-white focus:outline-none focus:ring-2"
          onChange={(e) => {
            setNewFieldType(e.target.value as textFieldTypes);
          }}
          value={newFieldType}
        >
          <option value="text">Text</option>
          <option value="email">Email</option>
          <option value="date">Date</option>
        </select>
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
          onClick={(_) => saveCurrentForm(state)}
        >
          Save
        </button>
        <button
          onClick={resetForm}
          className="group relative my-2 flex justify-center rounded-lg border border-transparent bg-blue-500 py-2 px-4 text-sm font-extrabold text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Reset
        </button>
        <Link
          href="/forms/"
          className="group relative my-2 flex justify-center rounded-lg border border-transparent bg-blue-500 py-2 px-4 text-sm font-extrabold text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Close Form
        </Link>
      </div>
    </div>
  );
}
