import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import TitleTable from "../../../Components/TitleTable";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { database } from "../../../Firebase/config";
import Button from "../../../Components/Button";

function school() {
  const [status, setStatus] = useState("loading");
  const [schoolDetails, setSchoolDetails] = useState({
    name: "There's supposed to be the name of a school here.",
    location: "00 Tree Street, Fake Town, Fake State, Fake Country",
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

  const router = useRouter();

  const getSchool = async () => {
    const docSnap = await getDoc(
      doc(database, "school/" + router.query.school)
    );

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      let schoolData = docSnap.data();
      setSchoolDetails({
        name: schoolData.schoolName,
        location: schoolData.schoolLocation,
      });
      setYearLevels(schoolData.schoolYearLevels);
      setStatus(false);
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
      setStatus("error");
    }
  };

  const joinYear = async (index) => {
    // update students array within year level within school

    console.log(index);
    // await setDoc(doc(database, "school", schoolPath), {
    //   schoolName: schoolName,
    //   schoolLocation: schoolLocation,
    //   schoolPath: schoolPath,
    //   schoolYearLevels: [...schoolYearLevels],
    // })
    //   .then(async () => {
    //     await setDoc(doc(database, "schools", schoolPath), {
    //       schoolName: schoolName,
    //       schoolPath: schoolPath,
    //     });
    //   })
    //   .then(() => {
    //     alert("School saved");
    //     setSchoolName("");
    //     setSchoolImageURL("");
    //     setSchoolLocation("");
    //     setSchoolPath("");
    //     setSchoolYearLevels([
    //       {
    //         yearLevel: "",
    //         subjects: [{ name: "", path: "" }],
    //         students: [{ name: "", uid: "", picURL: "" }],
    //       },
    //     ]);
    //   })
    //   .catch((error) => {
    //     alert("Error saving school");
    //     console.log(error);
    //   });
  };

  useEffect(() => {
    if (!router.isReady) return;
    getSchool();
  }, [router.isReady]);

  // show join/leave depending on if studebt is in year level in school

  if (status === "loading") {
    return (
      <h1 className="text-3xl h-screen flex items-center justify-center">
        Just a second, we're fetching the schools data :)
      </h1>
    );
  } else if (status === "error") {
    return (
      <h1 className="text-3xl h-screen flex items-center justify-center">
        Sorry, an error was encountered. Refresh or try another way.
      </h1>
    );
  } else
    return (
      <div className="flex flex-col justify-center w-4/5 self-center mx-auto my-20">
        <div className="h-80 my-5 bg-slate-600 self-center w-full">
          Image of school
        </div>
        <h1 className="text-2xl font-bold">
          <span className="">{schoolDetails.name}</span>
        </h1>
        <p className="text-xl mb-10">{schoolDetails.location}</p>
        <h2 className="text-2xl font-bold">Year Levels</h2>
        {yearLevels.map((year) => (
          <div className="mx-6  ">
            <div className="flex w-full justify-between">
              <h3 className="text-xl self-center">Year {year.yearLevel}</h3>
              <Button
                buttonText="Join"
                buttonFunction={() => joinYear(year.yearLevel)}
              />{" "}
            </div>
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
          </div>
        ))}
      </div>
    );
}

export default school;
