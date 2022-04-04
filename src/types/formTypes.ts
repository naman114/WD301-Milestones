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

export interface FormResponse {
  id: number;
  formData: FormData;
}
