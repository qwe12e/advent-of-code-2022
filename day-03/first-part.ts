const rucksackListRaw = await Deno.readTextFile("./rucksack-list.txt");

const rucksackList = rucksackListRaw.split("\n").map((rucksack) => {
  const middle = rucksack.length / 2;
  return [rucksack.slice(0, middle), rucksack.slice(middle, rucksack.length)];
});

const totalScore = rucksackList.reduce((score, rucksack) => {
  const [firstPart, secondPart] = rucksack;
  let c = "";
  for (const char of firstPart.split("")) {
    if (secondPart.includes(char)) {
      c = char;
      break;
    }
  }
  const charCode = c.charCodeAt(0);
  const priority = charCode > 90 ? charCode - 96 : charCode - 38;
  return score + priority;
}, 0);
console.log({ totalScore });
