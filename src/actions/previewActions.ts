import { FormResponse } from "../types/formTypes";
import { PreviewAction } from "../types/previewActionTypes";

export const reducer = (state: FormResponse, action: PreviewAction) => {
  switch (action.type) {
    case "save_user_input": {
      return {
        ...state,
        formData: {
          ...state.formData,
          formFields: state.formData.formFields.map((field) => {
            if (field.id === action.questionId)
              return {
                ...field,
                value: action.value,
              };
            return field;
          }),
        },
      };
    }
  }
};
