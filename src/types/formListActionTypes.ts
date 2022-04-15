export type RemoveAction = {
  type: "remove_form";
  id: number;
};

export type SaveSearchString = {
  type: "save_search_string";
  searchString: string;
};

export type FormListAction = RemoveAction | SaveSearchString;
