import React from "react";
import { Container } from "./Container";
import { Timer } from "./Timer";

export const GameBoard = () => {
  return (
    <div>
      <h1>GameBoard</h1>
      <Timer />
      <main className="main">
        <Container />
      </main>
    </div>
  );
};
