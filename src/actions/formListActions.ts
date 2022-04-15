import { FormListAction } from "../types/formListActionTypes";
import { FormListState } from "../types/formListTypes";
export const reducer = (state: FormListState, action: FormListAction) => {
  switch (action.type) {
    case "remove_form": {
      return {
        ...state,
        formData: state.formData.filter((form) => form.id !== action.id),
      };
    }
    case "save_search_string": {
      return {
        ...state,
        searchString: action.searchString,
      };
    }
  }
};
