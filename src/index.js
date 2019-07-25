import React from "react";
import ReactDOM from "react-dom";
import Container from "../components/container";
import "./styles.css";

function App() {
  return (
    <div className="App">
      <Container />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
