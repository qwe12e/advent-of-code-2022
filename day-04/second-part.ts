const pairListRaw = await Deno.readTextFile("./pair-list.txt");
const pairList = pairListRaw
  .split("\n")
  .map((pair) =>
    pair.split(",").map((range) => range.split("-").map((str) => +str))
  );

const count = pairList.reduce((acc, pair) => {
  // 2 4 6 8
  // 4 5 2 3
  const [[firstStart, firstEnd], [secondStart, secondEnd]] = pair;
  if (!(firstEnd < secondStart || firstStart > secondEnd)) {
    return acc + 1;
  }
  return acc;
}, 0);

console.log({ count });
