import React, { useContext, useEffect, useReducer, useState } from "react";
import { Link, navigate, useQueryParams } from "raviger";
import { reducer } from "../actions/formListActions";
import { FormListState } from "../types/formListTypes";
import Modal from "../common/Modal";
import CreateForm from "./CreateForm";
import { listForms } from "../utils/apiUtils";
import { ReceivedForm, FormData } from "../types/formTypes";
import { deleteForm } from "../utils/apiUtils";
import Paginate from "../common/Paginate";
import { Pagination } from "../types/common";
import { userContext } from "../utils/formUtils";

const initialState = (): FormListState => {
  const formListState: FormListState = {
    formData: [],
    searchString: "",
  };
  return formListState;
};

export default function FormList() {
  const [{ search }, setSearchQP] = useQueryParams();
  const [{ page }, setPageQP] = useQueryParams();
  const [state, dispatch] = useReducer(reducer, null, () => initialState());
  const [newForm, setNewForm] = useState(false);
  const [pageNum, setPageNum] = useState<number>(page ?? 1);
  const [count, setCount] = useState(0);
  const currentUser = useContext(userContext);

  useEffect(() => {
    setPageQP({ page: pageNum });
  }, [pageNum]);

  useEffect(() => {
    fetchForms();
  }, [page]);

  const fetchForms = async () => {
    try {
      const data: Pagination<ReceivedForm> = await listForms({
        offset: (pageNum - 1) * 5,
        limit: 5,
      });
      setCount(data.count);
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
      // console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchForms();
  }, []);

  const handleDeleteForm = async (id: number) => {
    dispatch({ type: "remove_form", id });
    setCount(count - 1);
    await deleteForm(id);
  };
  return (
    <div className="flex flex-col gap-5 divide-y-2 divide-dotted">
      <form
        className="flex justify-center"
        onSubmit={(e) => {
          e.preventDefault();
          setSearchQP({ search: state.searchString });
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
        <ul>
          {state.formData
            .filter((form) =>
              form.title.toLowerCase().includes(search?.toLowerCase() || "")
            )
            .map((form) => (
              <li
                key={form.id}
                className="flex items-center justify-between rounded-xl border-2 px-4"
                tabIndex={0}
              >
                <div className="flex flex-col py-1">
                  <p className=" text-lg ">{form.title}</p>
                  <p className=" text-slate-700 ">
                    {/* {form.formFields.length} Questions */}
                  </p>
                </div>

                <div className="flex space-x-2">
                  <button
                    disabled={!currentUser || !currentUser?.username}
                    type="button"
                    onClick={(_) => {
                      navigate(`/preview/${form.id}`);
                    }}
                    className="group relative my-2 flex justify-center rounded-lg border border-transparent bg-blue-500 py-2 px-4 text-sm font-extrabold text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-slate-300"
                  >
                    Preview
                  </button>
                  <button
                    disabled={!currentUser || !currentUser?.username}
                    onClick={(_) => {
                      navigate(`/forms/${form.id}`);
                    }}
                    type="button"
                    className="group relative my-2 flex justify-center rounded-lg border border-transparent bg-blue-500 py-2 px-4 text-sm font-extrabold text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-slate-300"
                  >
                    Edit
                  </button>
                  <button
                    disabled={!currentUser || !currentUser?.username}
                    type="button"
                    className="group relative my-2 flex justify-center rounded-lg border border-transparent bg-blue-500 py-2 px-4 text-sm font-extrabold text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-slate-300"
                    onClick={(_) => handleDeleteForm(form.id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
        </ul>
      </div>
      <Paginate count={count} pageNum={pageNum} setPageCB={setPageNum} />
      <div className="flex space-x-2">
        <button
          disabled={!currentUser || !currentUser?.username}
          className="group relative my-2 flex justify-center rounded-lg border border-transparent bg-blue-500 py-2 px-4 text-sm font-extrabold text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-slate-300"
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
