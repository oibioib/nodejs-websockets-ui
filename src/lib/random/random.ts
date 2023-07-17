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
