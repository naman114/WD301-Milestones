import React, { useEffect, useReducer, useState } from "react";
import { Link, useQueryParams } from "raviger";
import { reducer } from "../actions/formListActions";
import { FormListState } from "../types/formListTypes";
import Modal from "../common/Modal";
import CreateForm from "./CreateForm";
import { listForms } from "../utils/apiUtils";
import { Pagination } from "../types/common";
import { ReceivedForm, FormData } from "../types/formTypes";
import { deleteForm } from "../utils/apiUtils";

const initialState = (): FormListState => {
  const formListState: FormListState = {
    formData: [],
    searchString: "",
  };
  return formListState;
};

export default function FormList() {
  const [{ search }, setQueryParams] = useQueryParams();
  const [state, dispatch] = useReducer(reducer, null, () => initialState());
  const [newForm, setNewForm] = useState(false);

  const fetchForms = async () => {
    try {
      const data: Pagination<ReceivedForm> = await listForms({});
      const forms: FormListState = {
        formData: data.results.map((result) => {
          const form: FormData = {
            id: result.id,
            title: result.title,
            formFields: [],
          };
          return form;
        }),
        searchString: "",
      };
      forms.formData.sort((field1: FormData, field2: FormData) =>
        field1.id < field2.id ? -1 : 1
      );
      dispatch({ type: "populate_form_list", forms });
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchForms();
  }, []);

  const handleDeleteForm = async (id: number) => {
    dispatch({ type: "remove_form", id });
    await deleteForm(id);
  };
  return (
    <div className="flex flex-col gap-5 divide-y-2 divide-dotted">
      <form
        className="flex justify-center"
        onSubmit={(e) => {
          e.preventDefault();
          setQueryParams({ search: state.searchString });
        }}
      >
        <input
          className="mr-4 w-full rounded-2xl bg-slate-100 p-3 focus:outline-none"
          type="text"
          name="search"
          placeholder="Enter string to search"
          value={state.searchString}
          onChange={(e) => {
            dispatch({
              type: "save_search_string",
              searchString: e.target.value,
            });
          }}
        />
        <input
          className="group relative my-2 flex justify-center rounded-lg border border-transparent bg-blue-500 py-2 px-4 text-sm font-extrabold text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          type="submit"
          value="Search"
        />
      </form>
      <div className="space-y-3">
        {state.formData
          .filter((form) =>
            form.title.toLowerCase().includes(search?.toLowerCase() || "")
          )
          .map((form) => (
            <React.Fragment key={form.id}>
              <div className="flex items-center justify-between rounded-xl border-2 px-4">
                <div className="flex flex-col py-1">
                  <p className=" text-lg ">{form.title}</p>
                  <p className=" text-slate-700 ">
                    {/* {form.formFields.length} Questions */}
                  </p>
                </div>

                <div className="flex space-x-2">
                  <Link
                    type="button"
                    href={`/preview/${form.id}`}
                    className="group relative my-2 flex justify-center rounded-lg border border-transparent bg-blue-500 py-2 px-4 text-sm font-extrabold text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Preview
                  </Link>
                  <Link
                    type="button"
                    href={`/forms/${form.id}`}
                    className="group relative my-2 flex justify-center rounded-lg border border-transparent bg-blue-500 py-2 px-4 text-sm font-extrabold text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    className="group relative my-2 flex justify-center rounded-lg border border-transparent bg-blue-500 py-2 px-4 text-sm font-extrabold text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    onClick={(_) => handleDeleteForm(form.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </React.Fragment>
          ))}
      </div>
      <div className="flex space-x-2">
        <button
          className="group relative my-2 flex justify-center rounded-lg border border-transparent bg-blue-500 py-2 px-4 text-sm font-extrabold text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          onClick={(_) => {
            setNewForm(true);
          }}
        >
          Add New Form
        </button>
        <Link
          href="/"
          className="group relative my-2 flex justify-center rounded-lg border border-transparent bg-blue-500 py-2 px-4 text-sm font-extrabold text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Close
        </Link>
      </div>
      <Modal open={newForm} closeCB={() => setNewForm(false)}>
        <CreateForm />
      </Modal>
    </div>
  );
}
