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

export type formField = TextField | DropDownField;

export type FormResponse = {
  id: number;
  formData: FormData;
};
