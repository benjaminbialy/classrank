import { useRouter } from "next/router";
import React, { useContext, useState, useEffect } from "react";
import Button from "../../Components/Button";
import TextInput from "../../Components/Inputs/TextInput";
import NavBar from "../../Components/NavBar";
import UserContext from "../../Contexts/UserContext";

import { doc, getDoc } from "firebase/firestore";
import { app, database } from "../../Firebase/config.js";

function profile() {
  const [editDetails, setEditDetails] = useState(false);
  const [yearLevel, setYearLevel] = useState(0);
  const [school, setSchool] = useState("");
  const [subjects, setSubjects] = useState([
    { name: "", path: "", schoolPath: "" },
  ]);

  const router = useRouter();

  const userStatus = useContext(UserContext);

  const setEditDetailsFunction = () => {
    setEditDetails((prev) => !prev);
  };

  const getSchool = async () => {
    const docSnap = await getDoc(
      doc(database, "school/" + router.query.school)
    );

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      let schoolData = docSnap.data();
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  useEffect(() => {
    if (!router.isReady) return;
    getSchool();
  }, [router.isReady]);

  return (
    <div>
      <NavBar />
      <div>
        <img src={userStatus.picUrl} alt={"Profile Picture"} />
        <h3>{userStatus.userName}</h3>
        <div>
          <div>
            <p>Year Level: {}</p>
            <p>School: {}</p>
            <p>Subjects: {}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default profile;
