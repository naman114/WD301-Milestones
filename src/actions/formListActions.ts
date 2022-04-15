import { FormData } from "../types/formTypes";
import { FormListAction } from "../types/formListActionTypes";

export const reducer = (state: FormData[], action: FormListAction) => {
  switch (action.type) {
    case "remove_form": {
      return state.filter((form) => form.id !== action.id);
    }
  }
};
