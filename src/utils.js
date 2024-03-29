/**
 *
 * Init game, return a 2d array with random bombs
 *
 * @returns
 */
export const initGame = () => {
  let hardLevel = 0.8; // The smaller the harder
  let squaresCountX = 25;
  let squaresCountY = 20;
  let winCount = 0;
  let boomCount = 0;
  let unlockCount = 0;
  let totalSquares = squaresCountX * squaresCountY;
  let arr = Array.from(
    {
      length: squaresCountX,
    },
    () =>
      Array.from(
        {
          length: squaresCountY,
        },
        () =>
          Math.random() > hardLevel
            ? { value: -1, displayValue: "", visited: false }
            : { value: 0, displayValue: "", visited: false }
      )
  );
  // console.log("zzzzz--------------->", arr);
  // update boom count of neighbours
  const [m, n] = [arr.length, arr[0].length];
  // console.log("zzzzz--------------->", m, n);
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      const x = arr[i][j];
      if (x.value === -1) {
        // update boom count of neighbours
        boomCount++;
        updateNeighbours(arr, i + 1, j); // left
        updateNeighbours(arr, i - 1, j); // right
        updateNeighbours(arr, i, j + 1); // top
        updateNeighbours(arr, i, j - 1); // bottom
        updateNeighbours(arr, i + 1, j + 1); // top left
        updateNeighbours(arr, i - 1, j - 1); // bottom right
        updateNeighbours(arr, i + 1, j - 1); // bottom left
        updateNeighbours(arr, i - 1, j + 1); // top right
      }
    }
  }
  // winCount = totalSquares - boomCount;
  // console.log(boomCount, winCount);
  return arr;
};

const updateNeighbours = (arr, x, y) => {
  const [m, n] = [arr.length, arr[0].length];

  if (x < 0 || y < 0 || x >= m || y >= n) {
    return;
  }
  if (arr[x][y].value === -1) {
    return;
  }
  arr[x][y].value++;
};

export const updateZero = (arr, x, y) => {
  const [m, n] = [arr.length, arr[0].length];
  if (x < 0 || y < 0 || x >= m || y >= n || arr[x][y].visited === true) {
    return;
  }
  if (arr[x][y].value !== 0) {
    arr[x][y].displayValue = arr[x][y].value;
    return;
  }
  // this.unlockCount++;
  // if (this.unlockCount === this.winCount) {
  //   this.gameWin();
  // }
  arr[x][y].visited = true;
  arr[x][y].displayValue = " ";

  updateZero(arr, x + 1, y); // left
  updateZero(arr, x - 1, y); // right
  updateZero(arr, x, y + 1); // top
  updateZero(arr, x, y - 1); // bottom
  updateZero(arr, x + 1, y + 1); // top left
  updateZero(arr, x - 1, y - 1); // bottom right
  updateZero(arr, x + 1, y - 1); // bottom left
  updateZero(arr, x - 1, y + 1); // top right
};

export const gameOver = (arr) => {
  return arr.map((row) =>
    row.map((col) => {
      if (col.value === -1) {
        col.displayValue = "💣";
      }
      return col;
    })
  );
};

export const shallowClone2DArray = (arr) => {
  return arr.map((row) => row.slice());
};
