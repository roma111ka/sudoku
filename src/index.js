module.exports = function solveSudoku(matrix) {
  const findPositionZero = () =>{
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (matrix[i][j] === 0) {
          return [i, j];
        }
      }
    }
    return null;
  };
  const validate = (numberInsert, positionZero, matrix) => {
    const [row,col] = positionZero;
    for (let i = 0; i < 9; i++) {
      if (matrix[i][col] === numberInsert && i != row) {
        return false;
      }
    }
    for (let j = 0; j < 9; j++) {
      if (matrix[row][j] === numberInsert && j != col) {
        return false;
      }
    }
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    for (let i = boxRow; i < boxRow + 3; i++) {
      for (let j = boxCol; j < boxCol + 3; j++) {
        if (matrix[i][j] === numberInsert && i != row && j != col) {
          return false;
        }
      }
    }
    return true;
  };
  const solve = () => {
    const positionZero = findPositionZero(matrix);
    if (positionZero === null){
      return true;
    }
    for (let i = 1; i <= 9; i++) {
      const numberInsert = i;
      if (validate(numberInsert, positionZero, matrix)) {
        const [x, y] = positionZero;
        matrix[x][y] = numberInsert;
        if (solve()) {
          return true;
        }
        matrix[x][y] = 0;
      }
    }
    return false;
  };
  solve();
  return matrix;
};
