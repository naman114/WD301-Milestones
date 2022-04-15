import { MultiValue } from "react-select";

export type SaveUserInputAction = {
  type: "save_user_input";
  questionId: number;
  value: string;
};

export type SaveMultiSelectValues = {
  type: "save_multiselect_values";
  options: MultiValue<{ value: string; label: string }>;
};

export type SaveCurrentQuestion = {
  type: "save_current_question";
  questionId: number;
};

export type SaveFormSubmissionStatus = {
  type: "save_submission_status";
  isSubmitted: boolean;
};

export type PreviewAction =
  | SaveUserInputAction
  | SaveMultiSelectValues
  | SaveCurrentQuestion
  | SaveFormSubmissionStatus;
