import React from "react";

export default function UserForm(props: {
  formFields: Array<{ id: number; label: string; inputType: string }>;
}) {
  return (
    <form>
      {props.formFields.map((field) => (
        <React.Fragment key={field.id}>
          <label className="my-2 py-2">{field.label}</label>
          <input
            type={field.inputType}
            className="focus:border-blueGray-500 focus:shadow-outline my-2 w-full transform rounded-lg border-2 border-gray-200 bg-gray-100 p-2 ring-offset-2 ring-offset-current transition duration-500 ease-in-out focus:bg-white focus:outline-none focus:ring-2"
          />
        </React.Fragment>
      ))}
      <button
        type="submit"
        className="group relative my-2 flex justify-center rounded-lg border border-transparent bg-blue-500 py-2 px-4 text-sm font-extrabold text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Submit
      </button>
    </form>
  );
}
