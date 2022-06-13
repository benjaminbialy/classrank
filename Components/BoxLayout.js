import React, { useState } from "react";
import Button from "./Button";
import OptionItem from "./OptionItem";

function BoxLayout({
  toggleField,
  fieldItems = ["Saint Paul's Warragul"],
  parentPage,
}) {
  const [toggle, setToggle] = useState(false);

  const setToggleFunction = () => {
    setToggle((prev) => !prev);
  };

  return (
    <div className="y-fit">
      <div>
        <Button buttonText={toggleField} buttonFunction={setToggleFunction} />
      </div>
      <div>
        {toggle && (
          <>
            {fieldItems.map((item, index) => (
              <OptionItem
                key={item.address}
                text={item.school}
                address={parentPage + "/" + item.address}
                margin={"my-4"}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default BoxLayout;
