const pairListRaw = await Deno.readTextFile("./pair-list.txt");
const pairList = pairListRaw
  .split("\n")
  .map((pair) =>
    pair.split(",").map((range) => range.split("-").map((str) => +str))
  );

const count = pairList.reduce((acc, pair) => {
  const [[firstStart, firstEnd], [secondStart, secondEnd]] = pair;
  if (firstStart === secondStart && firstEnd === secondEnd) {
    return acc + 1;
  } else if (firstStart <= secondStart && firstEnd >= secondEnd) {
    return acc + 1;
  } else if (firstStart >= secondStart && firstEnd <= secondEnd) {
    return acc + 1;
  }
  return acc;
}, 0);

console.log({ count });
