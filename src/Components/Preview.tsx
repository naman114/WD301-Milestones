import { Link } from "raviger";
import React, { useState } from "react";
import { FormData, formField, saveLocalForms, getLocalForms } from "./FormList";

interface FormResponse {
  id: number;
  formData: FormData;
}

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
  const [questionId, setQuestionId] = useState(state.formData.formFields[0].id);

  const getQuestionLabel = () => state.formData.formFields[questionId].label;

  const getQuestionFieldType = () =>
    state.formData.formFields[questionId].fieldType;

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

  return (
    <div className="flex flex-col gap-4 divide-y-2 divide-dotted">
      <label>{getQuestionLabel()}</label>
      <input
        className="mr-4 w-full rounded-2xl bg-slate-100 p-3 focus:outline-none"
        type={getQuestionFieldType()}
        value={state.formData.formFields[questionId].value}
        onChange={(e) => saveUserInput(e.target.value)}
      />
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
            onClick={() => saveFormResponse(state)}
            className="group relative my-2 flex justify-center rounded-lg border border-transparent bg-blue-500 py-2 px-4 text-sm font-extrabold text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
}
