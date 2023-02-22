import React, { useEffect } from "react";
import { Square } from "./Square";
import { initGame } from "./utils";
import "./styles.css";

export const Container = () => {
  //   const initSquares = Array(500).fill(1);
  const [squares, setSquares] = React.useState([]);

  useEffect(() => {
    // init game board
    setSquares(initGame());
  }, []);

  const renderSquares = () => {
    //console.log("render");
    if (squares.length === 0) return null;
    // arr = [].concat.apply([], arr);
    let res = [];
    let [m, n] = [squares.length, squares[0].length];
    // console.log(m, n);
    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        res.push(
          <Square
            // onClick={(x, y, LeftOrRight) => this.squareClickHandler(x, y, LeftOrRight)}
            key={[i, j]}
            index={[i, j]}
            value={squares[i][j].value}
            displayValue={squares[i][j].displayValue}
          />
        );
      }
    }

    console.log(res);
    return res;
  };

  return <div className="container">{renderSquares()}</div>;
};
