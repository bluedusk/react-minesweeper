import React, { useEffect, useState } from "react";
import { Square } from "./Square";
import { initGame, shallowClone2DArray, updateZero, gameOver } from "./utils";
import "./styles.css";
import clsx from "clsx";
import { Toolbar } from "./Toolbar";

export const Container = () => {
  //   const initSquares = Array(500).fill(1);
  const [squares, setSquares] = useState([]);
  // 0: not started, 1: playing, 2: game over, 3: game win
  const [gameStatus, setGameStatus] = useState(1);

  useEffect(() => {
    // init game board
    if (gameStatus === 0) {
      setGameStatus(1);
      setSquares(initGame());
    }
  }, [gameStatus]);

  const squareClickHandler = (squares, x, y) => {
    const newSquares = shallowClone2DArray(squares);
    if (squares[x][y].value === -1) {
      // game over
      gameOver(newSquares);
      setGameStatus(2);
    } else {
      console.log("zzzzz--------------->", { x, y });
      updateZero(newSquares, x, y);
    }

    setSquares(newSquares);
  };

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
            onClick={() => squareClickHandler(squares, i, j)}
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

  return (
    <>
      <Toolbar />
      <div className={clsx("container", { gameover: gameStatus === 2 })}>{renderSquares()}</div>;
    </>
  );
};
