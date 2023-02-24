import React, { useState } from "react";
import "./styles.css";
import clsx from "clsx";

/**
 *
 * Square has a value and a displayValue,
 * displayValue is what is displayed on the screen
 *
 *
 * value is what is used to calculate the next state
 * - -1 is a mine
 * - 0 is an empty square
 *
 * @param {*} param0
 * @returns
 */
export const Square = ({ value, displayValue, onClick }) => {
  const [mouseIn, setMouseIn] = useState(false);

  return (
    <div
      className={clsx("square", { visited: displayValue !== "" })}
      onMouseOver={() => {
        setMouseIn(true);
      }}
      onMouseOut={() => {
        setMouseIn(false);
      }}
      onClick={onClick}
    >
      {mouseIn ? value : displayValue}
    </div>
  );
};
