import React from "react";

export default function LabelledInput(props: {
  id: number;
  label: string;
  value: string;
  fieldType: string;
  updateFieldTypeCB: (id: number, type: string) => void;
  removeFieldCB: (id: number) => void;
  updateInputFieldLabelCB: (id: number, label: string) => void;
}) {
  return (
    <>
      <div className="flex gap-2">
        <input
          type="text"
          value={props.label}
          onChange={(e) => {
            props.updateInputFieldLabelCB(props.id, e.target.value);
          }}
          className="focus:border-blueGray-500 focus:shadow-outline my-2 flex flex-1 transform rounded-lg border-2 border-gray-200 bg-gray-100 p-2 ring-offset-2 ring-offset-current transition duration-500 ease-in-out focus:bg-white focus:outline-none focus:ring-2"
        />
        <select
          className="focus:border-blueGray-500 focus:shadow-outline my-2 flex transform rounded-lg border-2 border-gray-200 bg-gray-100 p-2 ring-offset-2 ring-offset-current transition duration-500 ease-in-out focus:bg-white focus:outline-none focus:ring-2"
          onChange={(e) => {
            props.updateFieldTypeCB(props.id, e.target.value);
          }}
          value={props.fieldType}
        >
          <option value="text">Text</option>
          <option value="email">Email</option>
          <option value="date">Date</option>
        </select>
        <button
          onClick={(_) => props.removeFieldCB(props.id)}
          className="group relative my-2 flex justify-center rounded-lg border border-transparent bg-blue-500 py-2 px-4 text-sm font-extrabold text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Remove
        </button>
      </div>
    </>
  );
}
