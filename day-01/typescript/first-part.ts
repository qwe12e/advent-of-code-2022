const text = await Deno.readTextFile("../calorie-list.txt");
const calories = text.split("\n");

// first part getting the maximum calorie
let max = 0;
let currentElf = 0;
calories.forEach((val) => {
  currentElf += +val;
  if (val === "") {
    if (currentElf > max) {
      max = currentElf;
    }
    currentElf = 0;
  }
});
console.log({ max });
