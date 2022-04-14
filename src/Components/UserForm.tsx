import React, { useState, useEffect, useRef } from "react";
import LabelledInput from "./LabelledInput";
import { saveLocalForms, getLocalForms } from "../utils/storageUtils";
import { Link, navigate } from "raviger";
import {
  DropDownField,
  FormData,
  formField,
  MultiSelectField,
  RadioField,
  TextAreaField,
  TextField,
  textFieldTypes,
  formFieldKind,
} from "../types/formTypes";
import LabelledDropdownInput from "./LabelledDropdownInput";
import LabelledTextAreaInput from "./LabelledTextAreaInput";

const initialFormFields: formField[] = [
  { kind: "text", id: 1, label: "Name", fieldType: "text", value: "" },
  { kind: "text", id: 3, label: "Email", fieldType: "email", value: "" },
  { kind: "text", id: 4, label: "Date of Birth", fieldType: "date", value: "" },
  {
    kind: "dropdown",
    id: 5,
    label: "Priority",
    options: ["High", "Low"],
    value: "",
  },
  {
    kind: "radio",
    id: 6,
    label: "Language",
    options: ["Python", "JS", "Java"],
    value: "",
  },
  {
    kind: "textarea",
    id: 7,
    label: "Brief about yourself",
    value: "",
  },
  {
    kind: "multiselect",
    id: 8,
    label: "Cars",
    options: ["BMW", "Audi", "Mercedes"],
    value: "",
  },
];

const inputTypes = {
  text: "Text",
  dropdown: "Dropdown",
  radio: "Radio",
  textarea: "Text Area",
  multiselect: "Multi Select",
};

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
  const [newFieldKind, setNewFieldKind] = useState<formFieldKind>("text");
  const [newFieldLabel, setNewFieldLabel] = useState("");
  const [newFieldOptions, setNewFieldOptions] = useState<string[]>([]);
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

  type RemoveAction = {
    type: "remove_field";
    id: number;
  };

  type AddAction = {
    type: "add_field";
    label: string;
    kind: formFieldKind;
  };

  type FormAction = AddAction | RemoveAction;

  // Action Reducer
  const reducer = (state: FormData, action: FormAction) => {
    switch (action.type) {
      case "add_field": {
        const newField = getNewField(action.kind);
        if (
          action.label === "" ||
          (["dropdown", "radio", "multiselect"].includes(action.kind) &&
            newFieldOptions.length === 0)
        )
          return state;

        return { ...state, formFields: [...state.formFields, newField] };
      }
      case "remove_field": {
        return {
          ...state,
          formFields: state.formFields.filter(
            (field) => field.id !== action.id
          ),
        };
      }
    }
  };

  const dispatchAction = (action: FormAction) => {
    setState((prevState) => {
      return reducer(prevState, action);
    });
  };

  const getNewField = (kind: string): formField => {
    switch (kind) {
      case "text":
        return {
          kind: kind,
          id: Number(new Date()),
          label: newFieldLabel,
          fieldType: newFieldType,
          value: "",
        };

      case "dropdown":
      case "radio":
      case "multiselect":
        return {
          kind: kind,
          id: Number(new Date()),
          label: newFieldLabel,
          options: newFieldOptions,
          value: "",
        };

      case "textarea":
        return {
          kind: kind,
          id: Number(new Date()),
          label: newFieldLabel,
          value: "",
        };
    }
    return {
      kind: "text",
      id: Number(new Date()),
      label: newFieldLabel,
      fieldType: newFieldType,
      value: "",
    };
  };

  // const addField = () => {
  //   if (
  //     newFieldLabel === "" ||
  //     (["dropdown", "radio"].includes(newFieldKind) &&
  //       newFieldOptions.length === 0)
  //   )
  //     return;

  //   let formFieldToAdd:
  //     | TextField
  //     | DropDownField
  //     | RadioField
  //     | TextAreaField
  //     | MultiSelectField = {
  //     kind: "text",
  //     id: Number(new Date()),
  //     label: newFieldLabel,
  //     fieldType: newFieldType,
  //     value: "",
  //   };

  //   if (
  //     newFieldKind === "dropdown" ||
  //     newFieldKind === "radio" ||
  //     newFieldKind === "multiselect"
  //   )
  //     formFieldToAdd = {
  //       kind: newFieldKind,
  //       id: Number(new Date()),
  //       label: newFieldLabel,
  //       options: newFieldOptions,
  //       value: "",
  //     };

  //   if (newFieldKind === "textarea")
  //     formFieldToAdd = {
  //       kind: newFieldKind,
  //       id: Number(new Date()),
  //       label: newFieldLabel,
  //       value: "",
  //     };

  //   setState({
  //     ...state,
  //     formFields: [...state.formFields, formFieldToAdd],
  //   });

  //   // Reset the input's value after adding a new field
  //   setNewFieldLabel("");
  //   setNewFieldOptions([]);
  // };

  // const removeField = (id: number) => {
  //   setState({
  //     ...state,
  //     formFields: state.formFields.filter((field) => field.id !== id),
  //   });
  // };

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

  const updateOptions = (id: number, options: string) => {
    setState({
      ...state,
      formFields: state.formFields.map((field) => {
        if (field.id === id) {
          return {
            ...field,
            options: parseOptions(options),
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

  const parseOptions = (options: string) => options.split(",");

  const renderAdditionalInputs = () => {
    switch (newFieldKind) {
      case "text":
        return (
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
        );

      case "radio":
      case "multiselect":
      case "dropdown":
        return (
          <input
            type="text"
            className="focus:border-blueGray-500 focus:shadow-outline my-2 flex flex-1 transform rounded-lg border-2 border-gray-200 bg-gray-100 p-2 ring-offset-2 ring-offset-current transition duration-500 ease-in-out focus:bg-white focus:outline-none focus:ring-2"
            onChange={(e) => {
              setNewFieldOptions(parseOptions(e.target.value));
            }}
            value={newFieldOptions}
            placeholder="Enter options"
          />
        );
      case "textarea":
        return;
    }
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
                  kind={inputTypes[field.kind]}
                  updateFieldTypeCB={updateFieldType}
                  removeFieldCB={(id) =>
                    dispatchAction({
                      type: "remove_field",
                      id: id,
                    })
                  }
                  updateInputFieldLabelCB={updateInputFieldLabel}
                />
              );

            case "radio":
            case "multiselect":
            case "dropdown":
              return (
                <LabelledDropdownInput
                  id={field.id}
                  label={field.label}
                  options={field.options}
                  value={field.value}
                  kind={inputTypes[field.kind]}
                  updateOptionsCB={updateOptions}
                  removeFieldCB={(id) =>
                    dispatchAction({
                      type: "remove_field",
                      id: id,
                    })
                  }
                  updateInputFieldLabelCB={updateInputFieldLabel}
                />
              );

            case "textarea":
              return (
                <LabelledTextAreaInput
                  id={field.id}
                  label={field.label}
                  value={field.value}
                  kind={inputTypes[field.kind]}
                  removeFieldCB={(id) =>
                    dispatchAction({
                      type: "remove_field",
                      id: id,
                    })
                  }
                  updateInputFieldLabelCB={updateInputFieldLabel}
                />
              );
          }
        })}
      </div>
      <div className="flex gap-2">
        <select
          className="focus:border-blueGray-500 focus:shadow-outline my-2 flex transform rounded-lg border-2 border-gray-200 bg-gray-100 p-2 ring-offset-2 ring-offset-current transition duration-500 ease-in-out focus:bg-white focus:outline-none focus:ring-2"
          onChange={(e) => {
            setNewFieldKind(e.target.value as formFieldKind);
          }}
          value={newFieldKind}
        >
          {Object.entries(inputTypes).map((item) => {
            return <option value={item[0]}>{item[1]}</option>;
          })}
        </select>
        <input
          type="text"
          className="focus:border-blueGray-500 focus:shadow-outline my-2 flex flex-1 transform rounded-lg border-2 border-gray-200 bg-gray-100 p-2 ring-offset-2 ring-offset-current transition duration-500 ease-in-out focus:bg-white focus:outline-none focus:ring-2"
          onChange={(e) => {
            setNewFieldLabel(e.target.value);
          }}
          value={newFieldLabel}
          placeholder="Enter a label for the new field"
        />
        {renderAdditionalInputs()}
        <button
          onClick={(_) =>
            dispatchAction({
              type: "add_field",
              label: newFieldLabel,
              kind: newFieldKind,
            })
          }
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
          href={`/preview/${props.formId}`}
          className="group relative my-2 flex justify-center rounded-lg border border-transparent bg-blue-500 py-2 px-4 text-sm font-extrabold text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Preview
        </Link>
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
