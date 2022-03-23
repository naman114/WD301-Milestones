import React, { useState, useEffect } from "react";

export interface FormData {
  id: number;
  title: string;
  formFields: formField[];
}

export interface formField {
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

export const saveLocalForms = (localForms: FormData[]) => {
  localStorage.setItem("savedForms", JSON.stringify(localForms));
};

export const getLocalForms = (): FormData[] => {
  const savedFormsJSON = localStorage.getItem("savedForms");
  return savedFormsJSON ? JSON.parse(savedFormsJSON) : [];
};

export default function FormList() {
  const [state, setState] = useState(() => getLocalForms());

  useEffect(() => {
    saveLocalForms(state);
  }, [state]);

  const addForm = () => {
    setState([
      ...state,
      {
        id: Number(new Date()),
        title: "Untitled Form",
        formFields: initialFormFields,
      },
    ]);
  };

  const removeForm = (id: number) => {
    setState(state.filter((form) => form.id !== id));
  };

  return (
    <div className="flex flex-col gap-4 divide-y-2 divide-dotted">
      <div className="space-y-3">
        {state.map((form) => (
          <React.Fragment key={form.id}>
            <div className="flex items-center justify-between rounded-xl border-2 px-4">
              <p>{form.title}</p>
              <div className="flex space-x-2">
                <a
                  type="button"
                  href={`/forms/${form.id}`}
                  className="group relative my-2 flex justify-center rounded-lg border border-transparent bg-blue-500 py-2 px-4 text-sm font-extrabold text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Edit
                </a>
                <button
                  type="button"
                  className="group relative my-2 flex justify-center rounded-lg border border-transparent bg-blue-500 py-2 px-4 text-sm font-extrabold text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  onClick={(_) => removeForm(form.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
      <div className="flex space-x-2">
        <button
          type="button"
          className="group relative my-2 flex justify-center rounded-lg border border-transparent bg-blue-500 py-2 px-4 text-sm font-extrabold text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          onClick={addForm}
        >
          Add New Form
        </button>
        <a
          href="/"
          className="group relative my-2 flex justify-center rounded-lg border border-transparent bg-blue-500 py-2 px-4 text-sm font-extrabold text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Close
        </a>
      </div>
    </div>
  );
}
