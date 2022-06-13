import { useContext, useEffect } from "react";
import Button from "../Components/Button";
import HomePage from "../Components/HomePage";
import NavBar from "../Components/NavBar";
import UserContext from "../Contexts/UserContext";

export default function Home() {
  const userStatus = useContext(UserContext);
  console.log(userStatus);

  useEffect(() => {}, []);

  return (
    <div>
      <NavBar />
      <HomePage />
    </div>
  );
}
