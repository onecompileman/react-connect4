import { DiscType } from 'constants/DiscType';
import { getRandomInt } from './getRandomInt';

export function selectBestMove(gameBoard: string[][], aiDiscType: DiscType) {
  const playerDiscType =
    aiDiscType === DiscType.RED ? DiscType.YELLOW : DiscType.RED;
  const winningMove = selectWinningMove(gameBoard, aiDiscType);

  if (winningMove != null) return winningMove;

  const losingMove = selectLosingMove(gameBoard, playerDiscType);

  if (losingMove != null) return losingMove;

  return selectOptimalMove(gameBoard, playerDiscType, aiDiscType);
}

function selectWinningMove(
  gameBoard: string[][],
  aiDiscType: DiscType
): number | null {
  return findMove(aiDiscType, 4, gameBoard);
}

function selectLosingMove(
  gameBoard: string[][],
  playerDiscType: DiscType
): number | null {
  return findMove(playerDiscType, 4, gameBoard);
}

function selectOptimalMove(
  gameBoard: string[][],
  playerDiscType: DiscType,
  aiDiscType: DiscType
): number | null {
  const playerMove3 = findMove(playerDiscType, 3, gameBoard);

  if (playerMove3 != null) return playerMove3;

  const aiMove3 = findMove(aiDiscType, 3, gameBoard);

  if (aiMove3 != null) return aiMove3;

  const playerMove2 = findMove(playerDiscType, 2, gameBoard);

  if (playerMove2 != null) return playerMove2;

  const aiMove2 = findMove(aiDiscType, 2, gameBoard);

  if (aiMove2 != null) return aiMove2;

  const availableColumns = Array(7)
    .fill('')
    .map((e, i) => i)
    .filter((i) => gameBoard[0][i] === '');

  const column = availableColumns[getRandomInt(0, availableColumns.length - 1)];

  return availableColumns.length ? column : null;
}

function findMove(
  discType: DiscType,
  columnCount: number,
  gameBoard: string[][]
): number | null {
  // Scan horizontal
  for (let r = 0; r < gameBoard.length; r++) {
    const row = gameBoard[r];

    for (let c = 0; c <= row.length - columnCount; c++) {
      const row4 = row.slice(c, c + columnCount);

      const aiChipsCount = row4.filter((r4) => {
        return r4 === discType;
      }).length;

      if (aiChipsCount === columnCount - 1) {
        const selectedCol = row4.findIndex((r4) => r4 === DiscType.EMPTY);

        if (selectedCol !== -1) {
          if (r < 5) {
            if (gameBoard[r + 1][selectedCol + c] !== DiscType.EMPTY) {
              return selectedCol + c;
            }
          } else {
            return selectedCol + c;
          }
        }
      }
    }
  }

  // Scan Vertical
  for (let c = 0; c < gameBoard[0].length; c++) {
    if (gameBoard[0][c] === DiscType.EMPTY) {
      let chipCount = 0;
      let check = false;
      for (let r = 0; r < gameBoard.length; r++) {
        const cell = gameBoard[r][c];

        if (cell !== DiscType.EMPTY) {
          if (!check) {
            check = true;
          }
          if (cell === discType && check) {
            chipCount++;

            if (chipCount === columnCount - 1) {
              return c;
            }
          } else {
            chipCount = 0;
            check = false;
          }
        }
      }
    }
  }

  // Scan left Diagonal
  for (let c = 0; c < columnCount; c++) {
    let ci = c;
    let r = 0;

    const diagonalRow = [];

    while (ci < 7 && r < 6) {
      const cell = gameBoard[r][ci];
      diagonalRow.push(cell);
      r++;
      ci++;
    }

    for (let i = 0; i <= diagonalRow.length - columnCount; i++) {
      const row4 = diagonalRow.slice(i, i + columnCount);

      const aiChipsCount = row4.filter((r4) => {
        return r4 === discType;
      }).length;

      if (aiChipsCount === columnCount - 1) {
        const index = row4.findIndex((r4) => r4 === '');
        if (index !== -1) {
          const cR = i + index;
          const cC = i + index + c;

          if (cR < 5) {
            if (gameBoard[cR + 1][cC] !== '') {
              return cC;
            }
          } else {
            return cC;
          }
        }
      }
    }
  }

  // Scan left Diagonal
  for (let c = 0; c < 4; c++) {
    let ci = c;
    let r = 0;

    const diagonalRow = [];

    while (ci < 7 && r < 6) {
      const cell = gameBoard[r][ci];
      diagonalRow.push(cell);
      r++;
      ci++;
    }

    for (let i = 0; i <= diagonalRow.length - columnCount; i++) {
      const row4 = diagonalRow.slice(i, i + columnCount);

      const aiChipsCount = row4.filter((r4) => {
        return r4 === discType;
      }).length;

      if (aiChipsCount === columnCount - 1) {
        const index = row4.findIndex((r4) => r4 === DiscType.EMPTY);
        if (index !== -1) {
          const cR = i + index;
          const cC = i + index + c;

          if (cR < 5) {
            if (gameBoard[cR + 1][cC] !== DiscType.EMPTY) {
              return cC;
            }
          } else {
            return cC;
          }
        }
      }
    }
  }

  // Scan left Diagonal
  for (let r = 0; r < 3; r++) {
    let ri = r;
    let c = 0;

    const diagonalCol = [];

    while (ri < 6 && c < 7) {
      const cell = gameBoard[ri][c];
      diagonalCol.push(cell);
      ri++;
      c++;
    }

    for (let i = 0; i <= diagonalCol.length - columnCount; i++) {
      const row4 = diagonalCol.slice(i, i + columnCount);

      const aiChipsCount = row4.filter((r4) => {
        return r4 === discType;
      }).length;

      if (aiChipsCount === columnCount - 1) {
        const index = row4.findIndex((r4) => r4 === '');
        if (index !== -1) {
          const cR = i + index + r;
          const cC = i + index;

          if (cR < 5) {
            if (gameBoard[cR + 1][cC] !== DiscType.EMPTY) {
              return cC;
            }
          } else {
            return cC;
          }
        }
      }
    }
  }
  // Scan right diagonal
  for (let c = 6; c >= 2; c--) {
    let ci = c;
    let r = 0;

    const diagonalRow = [];

    while (ci >= 0 && r < 6) {
      const cell = gameBoard[r][ci];
      diagonalRow.push(cell);
      r++;
      ci--;
    }

    for (let i = 0; i <= diagonalRow.length - columnCount; i++) {
      const row4 = diagonalRow.slice(i, i + columnCount);

      const aiChipsCount = row4.filter((r4) => {
        return r4 === discType;
      }).length;

      if (aiChipsCount === columnCount - 1) {
        const index = row4.findIndex((r4) => r4 === DiscType.EMPTY);

        if (index !== -1) {
          const cR = i + index;
          const cC = Math.abs(c - index - i);

          if (cR < 5) {
            if (gameBoard[cR + 1][cC] !== DiscType.EMPTY) {
              return cC;
            }
          } else {
            return cC;
          }
        }
      }
    }
  }
  // Scan right Diagonal
  for (let r = 0; r < 3; r++) {
    let ri = r;
    let c = 6;

    const diagonalCol = [];

    while (ri < 6 && c >= 0) {
      const cell = gameBoard[ri][c];
      diagonalCol.push(cell);
      ri++;
      c--;
    }

    for (let i = 0; i <= diagonalCol.length - columnCount; i++) {
      const row4 = diagonalCol.slice(i, i + columnCount);

      const aiChipsCount = row4.filter((r4) => {
        return r4 === discType;
      }).length;

      if (aiChipsCount === columnCount - 1) {
        const index = row4.findIndex((r4) => r4 === DiscType.EMPTY);

        if (index !== -1) {
          const cR = i + index + r;
          const cC = 6 - i - index;

          if (cR < 5) {
            if (gameBoard[cR + 1][cC] !== DiscType.EMPTY) {
              return cC;
            }
          } else {
            return cC;
          }
        }
      }
    }
  }

  return null;
}
