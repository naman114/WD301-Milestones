export type SaveUserInputAction = {
  type: "save_user_input";
  questionId: number;
  value: string;
};

export type PreviewAction = SaveUserInputAction;
