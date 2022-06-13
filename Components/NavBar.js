import React, { useContext } from "react";
import Button from "./Button";
import { AuthService, signIn } from "../firebase/Auth";
import OptionItem from "./OptionItem";
import UserContext from "../Contexts/UserContext";

function NavBar() {
  const userStatus = useContext(UserContext);

  return (
    <div>
      <h3 className="text-xl">ClassRank</h3>
      <OptionItem text={"Profile"} address={"profile/" + userStatus.uid} />
      <Button buttonText={"Login"} buttonFunction={signIn} />{" "}
    </div>
  );
}

export default NavBar;
