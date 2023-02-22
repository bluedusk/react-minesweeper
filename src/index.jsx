import React from "react";
import ReactDOM from "react-dom";
import { GameBoard } from "./GameBoard";
import "./styles.css";

function App() {
  return (
    <div className="App">
      <GameBoard />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
