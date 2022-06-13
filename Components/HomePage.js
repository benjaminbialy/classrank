import React from "react";
import Button from "./Button";
import { AuthService, signIn } from "../firebase/Auth";
import BoxLayout from "./BoxLayout";

function HomePage() {
  return (
    <div class="px-4 py-12 mx-auto max-w-7xl sm:px-6 md:px-12 lg:px-24 lg:py-24">
      <div class="flex flex-col w-full mb-12 text-center items-center">
        <h1 class="max-w-5xl text-2xl font-bold leading-none tracking-tighter text-neutral-600 md:text-5xl lg:text-6xl lg:max-w-7xl">
          Welcome to ClassRank
        </h1>
        <p class="max-w-xl mx-auto mt-8 text-base leading-relaxed text-center text-gray-500">
          Leave the guesswork of where you rank in your class to us.
        </p>
        <Button
          buttonText={"Login with Google"}
          buttonFunction={signIn}
          margin={"my-4"}
        />
      </div>
      <BoxLayout
        toggleField={"Show schools"}
        fieldItems={[
          {
            school: "Saint Paul's Anglican Grammar School Warragul",
            address: "spags",
          },
          { school: "Marist Sion College Warragul", address: "mscw" },
        ]}
        parentPage={"school"}
      />
    </div>
  );
}

export default HomePage;
