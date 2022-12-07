const text = await Deno.readTextFile("../calorie-list.txt");
const calories = text.split("\n");

// second part getting the sum of top 3 elfs calories
let elfCalories = 0;
let elfIndex = 0;
const elfs: Record<number, number> = {};
calories.forEach((val) => {
  elfCalories += +val;
  if (val === "") {
    elfs[elfIndex] = elfCalories;
    elfCalories = 0;
    elfIndex += 1;
  }
});
const total = Object.values(elfs)
  .sort((a, b) => a - b)
  .reverse()
  .slice(0, 3)
  .reduce((acc, val) => acc + val, 0);
console.log({ total });
