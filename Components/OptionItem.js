import React from "react";
import Link from "next/link";

function OptionItem({ text, address }) {
  return (
    <Link href={"/" + address}>
      <a className="block px-5 py-3 m-8 w-fit text-base font-medium text-center text-white transition duration-500 ease-in-out transform bg-blue-600 lg:px-10 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
        {text}
      </a>
    </Link>
  );
}

export default OptionItem;
