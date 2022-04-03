import React, { useState, useEffect } from "react";
import { Link, useQueryParams } from "raviger";

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

export const saveLocalForms = (localForms: FormData[]) => {
  localStorage.setItem("savedForms", JSON.stringify(localForms));
};

export const getLocalForms = (): FormData[] => {
  const savedFormsJSON = localStorage.getItem("savedForms");
  return savedFormsJSON ? JSON.parse(savedFormsJSON) : [];
};

export default function FormList() {
  const [{ search }, setQueryParams] = useQueryParams();
  const [searchString, setSearchString] = useState("");
  const [state, setState] = useState(() => getLocalForms());

  useEffect(() => {
    saveLocalForms(state);
  }, [state]);

  const removeForm = (id: number) => {
    setState(state.filter((form) => form.id !== id));
  };

  return (
    <div className="flex flex-col gap-5 divide-y-2 divide-dotted">
      <form
        className="flex justify-center"
        onSubmit={(e) => {
          e.preventDefault();
          setQueryParams({ search: searchString });
        }}
      >
        <input
          className="mr-4 w-full rounded-2xl bg-slate-100 p-3 focus:outline-none"
          type="text"
          name="search"
          placeholder="Enter string to search"
          value={searchString}
          onChange={(e) => {
            setSearchString(e.target.value);
          }}
        />
        <input
          className="group relative my-2 flex justify-center rounded-lg border border-transparent bg-blue-500 py-2 px-4 text-sm font-extrabold text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          type="submit"
          value="Search"
        />
      </form>
      <div className="space-y-3">
        {state
          .filter((form) =>
            form.title.toLowerCase().includes(search?.toLowerCase() || "")
          )
          .map((form) => (
            <React.Fragment key={form.id}>
              <div className="flex items-center justify-between rounded-xl border-2 px-4">
                <div className="flex flex-col py-1">
                  <p className=" text-lg ">{form.title}</p>
                  <p className=" text-slate-700 ">
                    {form.formFields.length} Questions
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
                    onClick={(_) => removeForm(form.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </React.Fragment>
          ))}
      </div>
      <div className="flex space-x-2">
        <Link
          type="button"
          className="group relative my-2 flex justify-center rounded-lg border border-transparent bg-blue-500 py-2 px-4 text-sm font-extrabold text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          href={"/forms/0"}
        >
          Add New Form
        </Link>
        <Link
          href="/"
          className="group relative my-2 flex justify-center rounded-lg border border-transparent bg-blue-500 py-2 px-4 text-sm font-extrabold text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Close
        </Link>
      </div>
    </div>
  );
}
