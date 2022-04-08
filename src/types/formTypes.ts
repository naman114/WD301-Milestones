export type FormData = {
  id: number;
  title: string;
  formFields: formField[];
};

export type textFieldTypes = "text" | "email" | "date";

export type TextField = {
  kind: "text";
  id: number;
  label: string;
  fieldType: textFieldTypes;
  value: string;
};

export type DropDownField = {
  kind: "dropdown";
  id: number;
  label: string;
  options: string[];
  value: string;
};

export type RadioField = {
  kind: "radio";
  id: number;
  label: string;
  options: string[];
  value: string;
};

export type TextAreaField = {
  kind: "textarea";
  id: number;
  label: string;
  value: string;
};

export type MultiSelectField = {
  kind: "multiselect";
  id: number;
  label: string;
  options: string[];
  value: string;
};

export type formField =
  | TextField
  | DropDownField
  | RadioField
  | TextAreaField
  | MultiSelectField;

export type FormResponse = {
  id: number;
  formData: FormData;
};
