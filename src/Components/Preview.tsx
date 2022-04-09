import { Link } from "raviger";
import React, { useState } from "react";
import { getLocalForms } from "../utils/storageUtils";
import { FormResponse, TextField } from "../types/formTypes";
import Select from "react-select";
import { MultiValue } from "react-select";

const initialState = (formId: number): FormResponse => {
  const savedForms = getLocalForms();
  return {
    id: Number(new Date()),
    formData: savedForms.filter((form) => form.id === formId)[0],
  };
};

const getFormResponses = (): FormResponse[] => {
  const savedResponsesJSON = localStorage.getItem("savedResponses");
  return savedResponsesJSON ? JSON.parse(savedResponsesJSON) : [];
};

const saveFormResponses = (responses: FormResponse[]) => {
  localStorage.setItem("savedResponses", JSON.stringify(responses));
};

const saveFormResponse = (response: FormResponse) => {
  let savedResponses = getFormResponses();
  savedResponses = [...savedResponses, response];
  saveFormResponses(savedResponses);
};

export default function Preview(props: { formId: number }) {
  const [state, setState] = useState(() => initialState(props.formId));
  const [multiSelectValues, setMultiSelectValues] = useState<
    MultiValue<{ value: string; label: string }>
  >([]);
  const [questionId, setQuestionId] = useState(
    state.formData.formFields[0]?.id || -1
  );
  const [isSubmitted, setIsSubmitted] = useState(false);

  const getQuestionLabel = () =>
    state.formData.formFields.find((field) => field.id === questionId)?.label;

  const getQuestionFieldType = () =>
    (
      state.formData.formFields.find(
        (field) => field.id === questionId
      ) as TextField
    )?.fieldType;

  const hasPreviousQuestion = (): boolean => {
    const index = state.formData.formFields.findIndex((formField) => {
      return formField.id === questionId;
    });
    return index > 0;
  };

  const hasNextQuestion = (): boolean => {
    const index = state.formData.formFields.findIndex((formField) => {
      return formField.id === questionId;
    });
    return index < state.formData.formFields.length - 1;
  };

  const showPreviousQuestion = () => {
    const index = state.formData.formFields.findIndex((formField) => {
      return formField.id === questionId;
    });
    setQuestionId(state.formData.formFields[index - 1].id);
  };

  const showNextQuestion = () => {
    const index = state.formData.formFields.findIndex((formField) => {
      return formField.id === questionId;
    });
    setQuestionId(state.formData.formFields[index + 1].id);
  };

  const saveUserInput = (value: string) => {
    setState({
      ...state,
      formData: {
        ...state.formData,
        formFields: state.formData.formFields.map((field) => {
          if (field.id === questionId)
            return {
              ...field,
              value,
            };
          return field;
        }),
      },
    });
  };

  const renderQuestion = () => {
    const field = state.formData.formFields.find(
      (field) => field.id === questionId
    )!;
    switch (field.kind) {
      case "text":
        return (
          <input
            className="mr-4 w-full rounded-2xl bg-slate-100 p-3 focus:outline-none"
            type={getQuestionFieldType()}
            value={
              state.formData.formFields.find((field) => field.id === questionId)
                ?.value
            }
            onChange={(e) => {
              saveUserInput(e.target.value);
            }}
          />
        );
      case "dropdown":
        return (
          <select
            value={field.value}
            onChange={(e) => {
              saveUserInput(e.target.value);
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

      case "radio":
        return (
          <div>
            {field.options.map((option, index) => {
              return (
                <React.Fragment key={index}>
                  <div className="ml-1 flex items-center space-x-2">
                    <input
                      type="radio"
                      name={field.label}
                      value={option}
                      onChange={(e) => saveUserInput(e.target.value)}
                    />
                    <label htmlFor={field.label}>{option}</label>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        );

      case "textarea":
        return (
          <textarea
            name={field.label}
            cols={4}
            rows={5}
            onChange={(e) => saveUserInput(e.target.value)}
          ></textarea>
        );

      case "multiselect":
        return (
          <Select
            isMulti
            onChange={(opt) => {
              setMultiSelectValues(opt);
              saveUserInput(opt.map((o) => o.label).join(","));
            }}
            options={field.options.map((option) => {
              return { label: option, value: option };
            })}
            value={multiSelectValues}
          />
        );
    }
  };

  return questionId === -1 ? (
    <>
      <p className="my-2">This form is empty!</p>
      <Link
        className="group relative my-4 flex justify-center rounded-lg border border-transparent bg-blue-500 py-2 px-4 text-sm font-extrabold text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        href="/forms/"
      >
        View More Forms
      </Link>
    </>
  ) : !isSubmitted ? (
    <div className="flex flex-col gap-4 divide-y-2 divide-dotted">
      <label className="mt-2 ml-1">{getQuestionLabel()}</label>
      {renderQuestion()}
      <div className="flex justify-between">
        {hasPreviousQuestion() ? (
          <button
            onClick={showPreviousQuestion}
            className="group relative my-2 flex justify-center rounded-lg border border-transparent bg-blue-500 py-2 px-4 text-sm font-extrabold text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Previous
          </button>
        ) : (
          <button className="group relative my-2 flex justify-center rounded-lg border border-transparent bg-slate-200 py-2 px-4 text-sm font-extrabold text-white">
            Previous
          </button>
        )}
        {hasNextQuestion() ? (
          <button
            onClick={showNextQuestion}
            className="group relative my-2 flex justify-center rounded-lg border border-transparent bg-blue-500 py-2 px-4 text-sm font-extrabold text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Next
          </button>
        ) : (
          <button
            onClick={(e) => {
              saveFormResponse(state);
              setIsSubmitted(true);
            }}
            className="group relative my-2 flex justify-center rounded-lg border border-transparent bg-blue-500 py-2 px-4 text-sm font-extrabold text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Submit
          </button>
        )}
      </div>
    </div>
  ) : (
    <div className="flex flex-col gap-4">
      Thanks for filling out the form!
      <br />
      Here's what we got:
      <br />
      <br />
      {state.formData.formFields.map((field) => (
        <React.Fragment key={field.id}>
          <p>
            {field.label}: {field.value}
          </p>
        </React.Fragment>
      ))}
      <Link
        className="group relative my-2 flex justify-center rounded-lg border border-transparent bg-blue-500 py-2 px-4 text-sm font-extrabold text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        href="/forms/"
      >
        View More Forms
      </Link>
    </div>
  );
}
