const rucksackListRaw = await Deno.readTextFile("./rucksack-list.txt");

const rucksackList = rucksackListRaw.split("\n");

const groups: string[][] = [];
let index = 0;
let tempArr: string[] = [];
rucksackList.forEach((rucksack) => {
  tempArr.push(rucksack);
  index++;
  if (index === 3) {
    groups.push([...tempArr]);
    tempArr = [];
    index = 0;
  }
});
const totalScore = groups.reduce((score, group) => {
  const [firstRucksack] = group;
  const chars = firstRucksack.split("");
  let foundChar = "";
  for (const char of chars) {
    if (group.slice(1).every((rucksack) => rucksack.includes(char))) {
      foundChar = char;
      break;
    }
  }
  const charCode = foundChar.charCodeAt(0);
  const priority = charCode > 90 ? charCode - 96 : charCode - 38;
  return score + priority;
}, 0);
console.log({ totalScore });
