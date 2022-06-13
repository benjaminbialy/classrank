import React, { useId } from "react";

function ArrayNumberInput({
  placeholder,
  idLabel,
  value,
  firstArrayIndex,
  firstObjectField,
  noNestedDown,
  secondArrayIndex,
  secondObjectField,
  setValue,
  max,
  min,
  updateArray,
}) {
  const id = useId();

  return (
    <div className="flex-1 min-w-0 revue-form-group">
      <label for={idLabel + "-" + id} className="sr-only">
        {placeholder}
      </label>
      <input
        id={idLabel + "-" + id}
        type="number"
        value={value[firstArrayIndex][firstObjectField]}
        min={min}
        max={max}
        onChange={(e) => {
          updateArray(
            noNestedDown,
            firstArrayIndex,
            firstObjectField,
            secondArrayIndex,
            secondObjectField,
            e.target.value,
            value,
            setValue
          );
        }}
        className="block w-full px-5 py-3 text-base placeholder-gray-300 transition duration-500 ease-in-out transform bg-transparent border border-transparent rounded-md text-neutral-600 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
        placeholder={placeholder}
      />
    </div>
  );
}

export default ArrayNumberInput;
