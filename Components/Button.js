import React from "react";

function Button({ buttonText = "Click me!", buttonFunction }) {
  return (
    <button
      onClick={() => {
        buttonFunction();
      }}
      className="px-5 py-3 m-8 w-fit text-base font-medium text-center text-white transition duration-500 ease-in-out transform bg-blue-600 lg:px-10 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      {buttonText}
    </button>
  );
}

export default Button;
