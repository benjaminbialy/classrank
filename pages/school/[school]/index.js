import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import TitleTable from "../../../Components/TitleTable";

function school() {
  const router = useRouter();
  useEffect(() => {
    console.log(router.route);
  }, []);

  const [schoolDetails, setSchoolDetails] = useState({
    name: "Saint Paul's Anglican Grammar School Warragul",
    location: "150 Bowen Street, Warragul, Victoria, Australia",
  });
  const [yearLevels, setYearLevels] = useState([
    {
      subjects: [
        { name: "Maths Methods", path: "mm" },
        { name: "English Language", path: "el" },
        { name: "Software Development", path: "sd" },
      ],
      yearLevel: 12,
      students: [{ name: "Benjamin Bialy", uid: "2982h9eh9hwd98q" }],
    },
  ]);
  return (
    <div>
      <div className="h-80 bg-slate-600">Image of school</div>
      <h1>School: {schoolDetails.name}</h1>
      <p>Location: {schoolDetails.location}</p>
      <h2>Year Levels</h2>
      {yearLevels.map((year) => (
        <>
          <h3>Year {year.yearLevel}</h3>
          <TitleTable
            title={"Subjects"}
            path={router.asPath + "/" + year.yearLevel}
            array={year.subjects}
            itemPath={"path"}
          />
          <TitleTable
            title={"Students"}
            path={"/profile"}
            array={year.students}
            itemPath={"uid"}
          />
        </>
      ))}
    </div>
  );
}

export default school;
