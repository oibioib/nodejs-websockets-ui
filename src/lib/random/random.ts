export const getRandomNum = (fromInclude: number, toInclude: number) => {
  const min = Math.ceil(fromInclude);
  const max = Math.floor(toInclude);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getRandomAttackIndex = (attacked: number[], maxIndex: number) => {
  let randomIndex: number;

  while (true) {
    const random = getRandomNum(0, maxIndex);

    if (!attacked.includes(random)) {
      randomIndex = random;
      break;
    }
  }
  return randomIndex;
};

const randomBoard = [
  [
    {
      ship: [27, 37, 47, 57],
      aroundShip: [16, 26, 36, 17, 18, 28, 38, 46, 48, 56, 58, 66, 67, 68],
    },
    {
      ship: [78, 88, 98],
      aroundShip: [67, 77, 87, 68, 69, 79, 89, 97, 99],
    },
    {
      ship: [31, 32, 33],
      aroundShip: [20, 30, 40, 21, 41, 22, 42, 23, 43, 24, 34, 44],
    },
    {
      ship: [55, 65],
      aroundShip: [44, 54, 64, 45, 46, 56, 66, 74, 75, 76],
    },
    { ship: [90, 91], aroundShip: [80, 81, 82, 92] },
    {
      ship: [71, 72],
      aroundShip: [60, 70, 80, 61, 81, 62, 82, 63, 73, 83],
    },
    { ship: [49], aroundShip: [38, 48, 58, 39, 59] },
    { ship: [6], aroundShip: [5, 15, 16, 7, 17] },
    { ship: [3], aroundShip: [2, 12, 13, 4, 14] },
    { ship: [10], aroundShip: [0, 20, 1, 11, 21] },
  ],

  [
    {
      ship: [40, 41, 42, 43],
      aroundShip: [30, 50, 31, 51, 32, 52, 33, 53, 34, 44, 54],
    },
    {
      ship: [3, 13, 23],
      aroundShip: [2, 12, 4, 14, 22, 24, 32, 33, 34],
    },
    {
      ship: [7, 17, 27],
      aroundShip: [6, 16, 8, 18, 26, 28, 36, 37, 38],
    },
    {
      ship: [15, 25],
      aroundShip: [4, 14, 24, 5, 6, 16, 26, 34, 35, 36],
    },
    { ship: [0, 10], aroundShip: [1, 11, 20, 21] },
    {
      ship: [63, 73],
      aroundShip: [52, 62, 72, 53, 54, 64, 74, 82, 83, 84],
    },
    {
      ship: [45],
      aroundShip: [34, 44, 54, 35, 55, 36, 46, 56],
    },
    { ship: [39], aroundShip: [28, 38, 48, 29, 49] },
    { ship: [9], aroundShip: [8, 18, 19] },
    { ship: [92], aroundShip: [81, 91, 82, 83, 93] },
  ],

  [
    {
      ship: [72, 73, 74, 75],
      aroundShip: [61, 71, 81, 62, 82, 63, 83, 64, 84, 65, 85, 66, 76, 86],
    },
    {
      ship: [5, 15, 25],
      aroundShip: [4, 14, 6, 16, 24, 26, 34, 35, 36],
    },
    {
      ship: [21, 31, 41],
      aroundShip: [10, 20, 30, 11, 12, 22, 32, 40, 42, 50, 51, 52],
    },
    {
      ship: [77, 78],
      aroundShip: [66, 76, 86, 67, 87, 68, 88, 69, 79, 89],
    },
    {
      ship: [46, 56],
      aroundShip: [35, 45, 55, 36, 37, 47, 57, 65, 66, 67],
    },
    {
      ship: [38, 48],
      aroundShip: [27, 37, 47, 28, 29, 39, 49, 57, 58, 59],
    },
    { ship: [2], aroundShip: [1, 11, 12, 3, 13] },
    { ship: [96], aroundShip: [85, 95, 86, 87, 97] },
    { ship: [70], aroundShip: [60, 80, 61, 71, 81] },
    { ship: [7], aroundShip: [6, 16, 17, 8, 18] },
  ],
];

export const getRandomBoard = () => {
  const randomIndex = getRandomNum(0, randomBoard.length - 1);
  return randomBoard[randomIndex];
};
