import React, { useState } from "react";
import Button from "../Components/Button.js";
import ArrayTextInput from "../Components/Inputs/ArrayTextInput.js";
import ArrayNumberInput from "../Components/Inputs/ArrayNumberInput.js";
import TextInput from "../Components/Inputs/TextInput.js";
import { doc, setDoc } from "firebase/firestore";
import { database } from "../Firebase/config";

function admin() {
  const [schoolName, setSchoolName] = useState("");
  const [schoolLocation, setSchoolLocation] = useState("");
  const [schoolPath, setSchoolPath] = useState("");
  const [schoolImageURL, setSchoolImageURL] = useState("");
  const [schoolYearLevels, setSchoolYearLevels] = useState([
    {
      yearLevel: "",
      subjects: [{ name: "", path: "" }],
      students: [{ name: "", uid: "" }],
    },
  ]);

  const updateArray = (
    noNestedDown,
    firstArrayIndex,
    firstObjectField,
    secondArrayIndex,
    secondObjectField,
    newValue,
    oldValue,
    setValue
  ) => {
    if (noNestedDown == 2) {
      // a field within an object within an array
      let copyOfArray = [...oldValue];
      copyOfArray[firstArrayIndex][firstObjectField] = newValue;
      setValue([...copyOfArray]);
    } else if (noNestedDown == 4) {
      // a field within an object within an array within an object within an array
      // ie schoolYearLevels[0]["subjects"][0]["name"] - the name field of the first year level within the first subject
      let copyOfArray = [...oldValue];

      copyOfArray[firstArrayIndex][firstObjectField][secondArrayIndex][
        secondObjectField
      ] = newValue;
      setValue([...copyOfArray]);
    }
  };

  const addExtraYear = () => {
    setSchoolYearLevels((prev) => [
      ...prev,
      {
        yearLevel: "",
        subjects: [{ name: "", path: "" }],
        students: [{ name: "", uid: "" }],
      },
    ]);
  };

  const saveChanges = async () => {
    if (schoolPath) {
      await setDoc(doc(database, "school", schoolPath), {
        schoolName: schoolName,
        schoolLocation: schoolLocation,
        schoolPath: schoolPath,
        schoolYearLevels: [...schoolYearLevels],
      })
        .then(async () => {
          await setDoc(doc(database, "schools", schoolPath), {
            schoolName: schoolName,
            schoolPath: schoolPath,
          });
        })
        .then(() => {
          alert("School saved");
          setSchoolName("");
          setSchoolImageURL("");
          setSchoolLocation("");
          setSchoolPath("");
          setSchoolYearLevels([
            {
              yearLevel: "",
              subjects: [{ name: "", path: "" }],
              students: [{ name: "", uid: "", picURL: "" }],
            },
          ]);
        })
        .catch((error) => {
          alert("Error saving school");
          console.log(error);
        });
    } else {
      alert("Enter something for school path!");
    }
  };

  const addExtraNested = (index, field, newObj) => {
    let schoolYearLevelsCopy = [...schoolYearLevels];

    schoolYearLevelsCopy[index][field].push(newObj);

    setSchoolYearLevels([...schoolYearLevelsCopy]);
  };

  return (
    <div className="flex flex-col items-center my-10">
      <div className="w-full flex justify-between">
        <h1>Admin portal</h1>
      </div>
      <div className="flex flex-col w-2/3 bg-slate-50 p-8 rounded-lg">
        <div className="w-full flex justify-between items-center my-4">
          <h3 className="text-3xl">Create a school</h3>
          <Button
            buttonText="Add school"
            buttonFunction={() => saveChanges()}
          />
        </div>{" "}
        <TextInput
          placeholder={"School name"}
          value={schoolName}
          setValue={setSchoolName}
          idLabel={"school-name"}
        />
        <TextInput
          placeholder={"School path"}
          value={schoolPath}
          setValue={setSchoolPath}
          idLabel={"school-path"}
        />
        <TextInput
          placeholder={"School location"}
          value={schoolLocation}
          setValue={setSchoolLocation}
          idLabel={"school-location"}
        />
        <TextInput
          placeholder={"School Image"}
          value={schoolImageURL}
          setValue={setSchoolImageURL}
          idLabel={"school-image"}
        />
        <>
          {schoolYearLevels.map((yearLevel, index) => (
            <>
              <h3 className="text-2xl">Year {yearLevel.yearLevel}</h3>
              <ArrayNumberInput
                placeholder={"Year level " + index}
                idLabel={"year-level" + index}
                value={schoolYearLevels}
                setValue={setSchoolYearLevels}
                max={12}
                min={0}
                noNestedDown={2}
                firstArrayIndex={index}
                firstObjectField={"yearLevel"}
                secondArrayIndex={""}
                secondObjectField={""}
                updateArray={updateArray}
              />
              <>
                <h3 className="text-2xl">
                  Year {yearLevel.yearLevel} Subjects
                </h3>
                {yearLevel.subjects.map((subject, secondIndex) => (
                  <>
                    <ArrayTextInput
                      placeholder={"Subject name " + secondIndex}
                      idLabel={"subject-name" + "-" + index + "-" + secondIndex}
                      value={schoolYearLevels}
                      setValue={setSchoolYearLevels}
                      noNestedDown={4}
                      firstArrayIndex={index}
                      firstObjectField={"subjects"}
                      secondArrayIndex={secondIndex}
                      secondObjectField={"name"}
                      updateArray={updateArray}
                    />
                    <ArrayTextInput
                      placeholder={"Subject path " + secondIndex}
                      idLabel={"subject-path" + "-" + index + "-" + secondIndex}
                      value={schoolYearLevels}
                      setValue={setSchoolYearLevels}
                      noNestedDown={4}
                      firstArrayIndex={index}
                      firstObjectField={"subjects"}
                      secondArrayIndex={secondIndex}
                      secondObjectField={"path"}
                      updateArray={updateArray}
                    />
                  </>
                ))}
              </>
              <Button
                margin={"my-4"}
                buttonText="Add another subject"
                buttonFunction={() =>
                  addExtraNested(index, "subjects", {
                    name: "",
                    path: "",
                  })
                }
              />
              <>
                <h3 className="text-2xl">
                  Year {yearLevel.yearLevel} Students
                </h3>
                {yearLevel.students.map((subject, secondIndex) => (
                  <>
                    <ArrayTextInput
                      placeholder={"Student name " + secondIndex}
                      idLabel={"student-name" + "-" + index + "-" + secondIndex}
                      value={schoolYearLevels}
                      setValue={setSchoolYearLevels}
                      noNestedDown={4}
                      firstArrayIndex={index}
                      firstObjectField={"students"}
                      secondArrayIndex={secondIndex}
                      secondObjectField={"name"}
                      updateArray={updateArray}
                    />
                    <ArrayTextInput
                      placeholder={"Student uid " + secondIndex}
                      idLabel={"student-uid" + "-" + index + "-" + secondIndex}
                      value={schoolYearLevels}
                      setValue={setSchoolYearLevels}
                      noNestedDown={4}
                      firstArrayIndex={index}
                      firstObjectField={"students"}
                      secondArrayIndex={secondIndex}
                      secondObjectField={"uid"}
                      updateArray={updateArray}
                    />
                    <ArrayTextInput
                      placeholder={"Student Picture URL " + secondIndex}
                      idLabel={
                        "student-pic-url" + "-" + index + "-" + secondIndex
                      }
                      value={schoolYearLevels}
                      setValue={setSchoolYearLevels}
                      noNestedDown={4}
                      firstArrayIndex={index}
                      firstObjectField={"students"}
                      secondArrayIndex={secondIndex}
                      secondObjectField={"picURL"}
                      updateArray={updateArray}
                    />
                  </>
                ))}
              </>{" "}
              <Button
                buttonText="Add another student"
                margin={"my-4"}
                buttonFunction={() =>
                  addExtraNested(index, "students", {
                    name: "",
                    uid: "",
                  })
                }
              />
            </>
          ))}
        </>
        <Button buttonText="Add another year" buttonFunction={addExtraYear} />
      </div>
    </div>
  );
}

export default admin;
