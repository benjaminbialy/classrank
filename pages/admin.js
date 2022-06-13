import React, { useState } from "react";
import Button from "../Components/Button.js";
import ArrayTextInput from "../Components/Inputs/ArrayTextInput.js";
import ArrayNumberInput from "../Components/Inputs/ArrayNumberInput.js";
import TextInput from "../Components/Inputs/TextInput.js";

function admin() {
  const [schoolName, setSchoolName] = useState("");
  const [schoolLocation, setSchoolLocation] = useState("");
  const [schoolYearLevels, setSchoolYearLevels] = useState([
    {
      yearLevel: 12,
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
        yearLevel: 12,
        subjects: [{ name: "", path: "" }],
        students: [{ name: "", uid: "" }],
      },
    ]);
  };

  return (
    <div>
      <h1>Admin portal</h1>
      <h2>Create school</h2>
      <TextInput
        placeholder={"School name"}
        value={schoolName}
        setValue={setSchoolName}
        idLabel={"school-name"}
      />
      <TextInput
        placeholder={"School location"}
        value={schoolLocation}
        setValue={setSchoolLocation}
        idLabel={"school-location"}
      />
      <>
        {schoolYearLevels.map((yearLevel, index) => (
          <>
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
              <h3>Year {yearLevel.yearLevel} Subjects</h3>
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
            <>
              <h3>Year {yearLevel.yearLevel} Students</h3>
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
                </>
              ))}
            </>
          </>
        ))}
      </>
      <Button buttonText="Add another year" buttonFunction={addExtraYear} />
    </div>
  );
}

export default admin;
