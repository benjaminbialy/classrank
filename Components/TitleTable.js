import React, { useState } from "react";
import Link from "next/link";

function TitleTable({ title, array, path, itemPath }) {
  const [showTable, setShowTable] = useState(false);
  return (
    <div
      className="flex flex-col p-5 my-4 bg-slate-100 rounded-lg cursor-pointer "
      onClick={() => setShowTable((prev) => !prev)}
    >
      <h4 className=" font-semibold">{title}</h4>
      <div className={showTable ? "flex flex-wrap my-3" : "flex flex-wrap "}>
        {showTable &&
          array.map((item) => (
            <Link href={path + "/" + item[itemPath]}>
              <a className="block px-5 py-3 m-1 w-fit text-base font-medium text-center text-slate-900 transition duration-500 ease-in-out transform border-2 border-slate-600 lg:px-10 rounded-xl hover:text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-600">
                {item.name}
              </a>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default TitleTable;
