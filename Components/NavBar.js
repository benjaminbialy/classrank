import React, { useContext } from "react";
import Button from "./Button";
import { signIn } from "../firebase/Auth";
import OptionItem from "./OptionItem";
import UserContext from "../Contexts/UserContext";
import Link from "next/link";

function NavBar() {
  const userStatus = useContext(UserContext);

  return (
    <div className="flex justify-between items-center h-20 bg-yellow-300">
      <Link href={"/"}>
        <a className="text-xl">ClassRank</a>
      </Link>
      <div className="flex">
        <OptionItem
          text={"Profile"}
          address={"profile/" + userStatus.uid}
          margin={"m-1"}
        />
        <Button buttonText={"Login"} buttonFunction={signIn} margin={"m-1"} />
      </div>
    </div>
  );
}

export default NavBar;
