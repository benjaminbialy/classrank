import React from "react";
import Link from "next/link";

function TitleTable({ title, array, path, itemPath }) {
  return (
    <div>
      <h4>{title}</h4>
      {array.map((item) => (
        <Link href={path + "/" + item[itemPath]}>
          <a>{item.name}</a>
        </Link>
      ))}
    </div>
  );
}

export default TitleTable;
