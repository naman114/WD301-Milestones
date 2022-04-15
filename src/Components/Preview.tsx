import { Link } from "raviger";
import React, { useReducer } from "react";
import { getLocalForms } from "../utils/storageUtils";
import { TextField } from "../types/formTypes";
import { FormResponse } from "../types/previewTypes";
import Select from "react-select";
import { reducer } from "../actions/previewActions";

const initialState = (formId: number): FormResponse => {
  const savedForms = getLocalForms();
  const currentFormData = savedForms.filter((form) => form.id === formId)[0];
  return {
    id: Number(new Date()),
    formData: currentFormData,
    multiSelectValues: [],
    questionId: currentFormData.formFields[0]?.id || -1,
    isSubmitted: false,
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
  const [state, dispatch] = useReducer(reducer, null, () =>
    initialState(props.formId)
  );

  const getQuestionLabel = () =>
    state.formData.formFields.find((field) => field.id === state.questionId)
      ?.label;

  const getQuestionFieldType = () =>
    (
      state.formData.formFields.find(
        (field) => field.id === state.questionId
      ) as TextField
    )?.fieldType;

  const hasPreviousQuestion = (): boolean => {
    const index = state.formData.formFields.findIndex((formField) => {
      return formField.id === state.questionId;
    });
    return index > 0;
  };

  const hasNextQuestion = (): boolean => {
    const index = state.formData.formFields.findIndex((formField) => {
      return formField.id === state.questionId;
    });
    return index < state.formData.formFields.length - 1;
  };

  const showPreviousQuestion = () => {
    const index = state.formData.formFields.findIndex((formField) => {
      return formField.id === state.questionId;
    });
    dispatch({
      type: "save_current_question",
      questionId: state.formData.formFields[index - 1].id,
    });
  };

  const showNextQuestion = () => {
    const index = state.formData.formFields.findIndex((formField) => {
      return formField.id === state.questionId;
    });
    dispatch({
      type: "save_current_question",
      questionId: state.formData.formFields[index + 1].id,
    });
  };

  const renderQuestion = () => {
    const field = state.formData.formFields.find(
      (field) => field.id === state.questionId
    )!;
    switch (field.kind) {
      case "text":
        return (
          <input
            className="mr-4 w-full rounded-2xl bg-slate-100 p-3 focus:outline-none"
            type={getQuestionFieldType()}
            value={
              state.formData.formFields.find(
                (field) => field.id === state.questionId
              )?.value
            }
            onChange={(e) => {
              dispatch({
                type: "save_user_input",
                value: e.target.value,
                questionId: state.questionId,
              });
            }}
          />
        );
      case "dropdown":
        return (
          <select
            value={field.value}
            onChange={(e) => {
              dispatch({
                type: "save_user_input",
                value: e.target.value,
                questionId: state.questionId,
              });
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
                      onChange={(e) =>
                        dispatch({
                          type: "save_user_input",
                          value: e.target.value,
                          questionId: state.questionId,
                        })
                      }
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
            onChange={(e) =>
              dispatch({
                type: "save_user_input",
                value: e.target.value,
                questionId: state.questionId,
              })
            }
          ></textarea>
        );

      case "multiselect":
        return (
          <Select
            isMulti
            onChange={(opt) => {
              dispatch({ type: "save_multiselect_values", options: opt });
              dispatch({
                type: "save_user_input",
                value: opt.map((o) => o.label).join(","),
                questionId: state.questionId,
              });
            }}
            options={field.options.map((option) => {
              return { label: option, value: option };
            })}
            value={state.multiSelectValues}
          />
        );
    }
  };

  return state.questionId === -1 ? (
    <>
      <p className="my-2">This form is empty!</p>
      <Link
        className="group relative my-4 flex justify-center rounded-lg border border-transparent bg-blue-500 py-2 px-4 text-sm font-extrabold text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        href="/forms/"
      >
        View More Forms
      </Link>
    </>
  ) : !state.isSubmitted ? (
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
              dispatch({ type: "save_submission_status", isSubmitted: true });
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
