import React from "react";
import ReactDOM from "react-dom";
import "../style.css";
import Square from "./square.js";
import Timer from "./timer.js";

class Container extends React.Component {
  squaresCountX = 10;
  squaresCountY = 10;
  boomCount = 0;
  winCount = 0;
  unlockCount = 0;

  cachedHits = localStorage.getItem("record");
  if(cachedHits) {
    this.setState({ hits: JSON.parse(cachedHits) });
    return;
  }

  constructor(props) {
    super(props);
    this.state = {
      gameStatus: 0, // 0 init  / -1 Failed / -2 Successed,
      gameData: [[]],
      best: 0
    };
  }

  /**
   *
   * @param {*} arr array to update
   * @param {*} x
   * @param {*} y
   * @param {*} m
   * @param {*} n
   */
  updateNeighbours = (arr, x, y) => {
    let m = arr.length;
    let n = arr[0].length;
    if (x < 0 || y < 0 || x >= m || y >= n) {
      return;
    } else if (arr[x][y].value === -1) {
      this.boomCount++;
      return;
    } else {
      arr[x][y].value++;
    }
  };

  initGame() {
    this.winCount = 0;
    this.boomCount = 0;
    this.unlockCount = 0;
    let arr = Array.from(
      {
        length: this.squaresCountX
      },
      () =>
        Array.from(
          {
            length: this.squaresCountY
          },
          () =>
            Math.random() > 0.95
              ? { value: -1, displayValue: "" }
              : { value: 0, displayValue: "" }
        )
    );

    let m = arr.length;
    let n = arr[0].length;
    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        const x = arr[i][j];
        if (x.value === -1) {
          // update boom count of neighbours
          this.boomCount++;
          this.updateNeighbours(arr, i + 1, j);
          this.updateNeighbours(arr, i - 1, j);
          this.updateNeighbours(arr, i, j + 1);
          this.updateNeighbours(arr, i, j - 1);
        }
      }
    }
    this.winCount = this.squaresCountX * this.squaresCountY - this.boomCount;
    console.log(this.boomCount, this.winCount);
    return arr;
  }

  gameWin() {
    console.log("game win");
    this.setState({ gameStatus: 1 }, () => {
      this.toggleStyle();
    });
  }

  updateZero(arr, visited, x, y) {
    let m = arr.length;
    let n = arr[0].length;
    if (
      x < 0 ||
      y < 0 ||
      x >= m ||
      y >= n ||
      visited[x][y] ||
      arr[x][y].value !== 0
    ) {
      return;
    }
    this.unlockCount++;
    if (this.unlockCount === this.winCount) {
      this.gameWin();
    }
    visited[x][y] = true;
    arr[x][y].displayValue = 0;
    this.updateZero(arr, visited, x + 1, y);
    this.updateZero(arr, visited, x - 1, y);
    this.updateZero(arr, visited, x, y + 1);
    this.updateZero(arr, visited, x, y - 1);
  }

  updateGame(x, y) {
    let arr = this.state.gameData;
    let m = arr.length;
    let n = arr[0].length;
    let visited = Array(m)
      .fill()
      .map(x => Array(n).fill(false));
    this.updateZero(arr, visited, x, y);
    // arr
    // console.log(arr);
    this.setState({ gameData: [...arr] });
  }
  squareClickHandler(x, y, LeftOrRight) {
    let arr = this.state.gameData;
    let element = arr[x][y];
    if (LeftOrRight === "left") {
      if (
        element.displayValue === 0 ||
        (element.displayValue > 0 && element.displayValue < 5)
      ) {
        return;
      }
      if (element.value === -1) {
        this.setState({ gameStatus: -1 });
      }
      if (element.value === 0) {
        // unlock all neighbour that has value of 0
        // console.log("unlock all neighbour that has value of 0");
        this.updateGame(x, y);
      } else {
        this.unlockCount++;
        arr[x][y].displayValue = arr[x][y].value;
      }
    } else {
      if (arr[x][y].displayValue === 9) {
        arr[x][y].displayValue = "";
      } else if (arr[x][y].displayValue === "") {
        arr[x][y].displayValue = 9;
      }
    }
    this.setState({ gameData: arr });
    console.log(this.unlockCount);
    if (this.unlockCount === this.winCount) {
      this.gameWin();
    }
  }

  renderSquares(x) {
    //console.log("render");
    let arr = this.state.gameData;
    // arr = [].concat.apply([], arr);
    let res = [];
    let [m, n] = [arr.length, arr[0].length];
    // console.log(m, n);
    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        res.push(
          <Square
            onClick={(x, y, LeftOrRight) =>
              this.squareClickHandler(x, y, LeftOrRight)
            }
            gameStatus={this.state.gameStatus}
            key={[i, j]}
            index={[i, j]}
            value={arr[i][j].value}
            displayValue={arr[i][j].displayValue}
          />
        );
      }
    }
    // const squares = arr.map((value, index) => (
    //   <Square
    //     action={this.actionHandler}
    //     status={this.state.gameStatus}
    //     key={index}
    //     index={index}
    //     value={value}
    //   />
    // ));
    // console.log(res);
    return res;
  }

  reset() {
    this.setState(prevState => {
      return {
        gameData: this.initGame(),
        gameStatus: prevState.gameStatus + 1
      };
    });
  }

  toggleStyle() {
    switch (this.state.gameStatus) {
      case -1:
        return "container lose";
      case -2:
        return "container win";
      default:
        return "container";
    }
  }

  render() {
    console.log("render");
    return (
      <>
        <div className="toolbar">
          <div className="start" onClick={() => this.reset()}>
            <h1>START</h1>
          </div>
          <div className="best">
            <h3>BEST:{this.state.best}</h3>
          </div>
          <Timer gameStatus={this.state.gameStatus} />
        </div>
        <div className={this.toggleStyle()}>{this.renderSquares()}</div>
      </>
    );
  }
}

export default Container;
