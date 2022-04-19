import { Overwrite } from "./common";

export type FormData = {
  id: number;
  title: string;
  formFields: formField[];
};

export type Form = {
  id?: number;
  title: string;
  description?: string;
  is_public?: boolean;
};

export type ReceivedForm = Overwrite<Form, { id: number }>;

export type Errors<T> = Partial<Record<keyof T, string>>;

export const validateForm = (form: Form) => {
  const errors: Errors<Form> = {};
  if (form.title.length < 1) {
    errors.title = "Title is Required";
  }
  if (form.title.length > 100) {
    errors.title = "Title must be less than 100 characters";
  }
  return errors;
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

export type formFieldKind =
  | "text"
  | "dropdown"
  | "radio"
  | "textarea"
  | "multiselect";

export type formField =
  | TextField
  | DropDownField
  | RadioField
  | TextAreaField
  | MultiSelectField;
