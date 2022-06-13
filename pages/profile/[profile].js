import React, { useContext, useState } from "react";
import Button from "../../Components/Button";
import NavBar from "../../Components/NavBar";
import UserContext from "../../Contexts/UserContext";

function profile() {
  const [editDetails, setEditDetails] = useState(false);

  const [yearLevel, setYearLevel] = useState(0);
  const [description, setDescription] = useState("");
  const [school, setSchool] = useState("");
  const [subjects, setSubjects] = useState("");

  const userStatus = useContext(UserContext);

  const setEditDetailsFunction = () => {
    setEditDetails((prev) => !prev);
  };
  return (
    <div>
      <NavBar />
      <div>
        <img src={userStatus.picUrl} alt={"Profile Picture"} />
        <h3>{userStatus.userName}</h3>
        <div>
          <Button
            buttonText="Edit Details"
            buttonFunction={setEditDetailsFunction}
          />
          {editDetails ? (
            <>
              <div>Editing</div>
              <Button
                buttonText="Save Changes"
                buttonFunction={setEditDetailsFunction}
              />
            </>
          ) : (
            <div>
              <p>Year Level: {}</p>
              <p>Description: {}</p>
              <p>School: {}</p>
              <p>Subjects: {}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default profile;
