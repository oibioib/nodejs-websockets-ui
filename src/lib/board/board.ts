export const XYToIndex = (x: number, y: number, boardSize: number) => y * boardSize + x;

export const indexToXY = (index: number, boardSize: number) => {
  const x = index % boardSize;
  const y = (index - x) / boardSize;
  return { x, y };
};

export const getIndexAround = (cellIndex: number, boardSize: number) => {
  const indexes: number[] = [];

  const { x, y } = indexToXY(cellIndex, boardSize);

  [x - 1, x, x + 1].forEach((x) => {
    if (x >= 0 && x < boardSize) {
      [y - 1, y, y + 1].forEach((y) => {
        if (y >= 0 && y < boardSize) {
          indexes.push(y * boardSize + x);
        }
      });
    }
  });

  return indexes.filter((n) => n >= 0 && n !== cellIndex);
};
