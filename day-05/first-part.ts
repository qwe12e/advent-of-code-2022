const instructionsAndStateRaw = await Deno.readTextFile("./instructions.txt");

const instructionsAndState = instructionsAndStateRaw.split("\n");
const seperatingLine = instructionsAndState.findIndex((str) => str === "");
const state = instructionsAndState
  .slice(0, seperatingLine - 1)
  .reverse()
  .reduce((acc, val) => {
    val.split("").forEach((str, i) => {
      if (str !== "[" && str !== "]" && str !== " ") {
        const index = Math.ceil(i / 4);
        acc[index] ||= [];
        acc[index].push(str);
      }
    });
    return acc;
  }, {} as Record<string, string[]>);

const instructions = instructionsAndState
  .slice(seperatingLine + 1)
  .map((line) => {
    const [amount, from, to] = line
      .replace("move ", "")
      .replace("from ", "")
      .replace("to ", "")
      .split(" ");

    return {
      amount,
      from,
      to,
    };
  });

instructions.forEach(({ from, to, amount }) => {
  const arr = state[from].splice(-amount, +amount);
  state[to] = [...state[to], ...arr.reverse()];
});

const message = Object.values(state)
  .map((arr) => {
    return arr.at(-1);
  })
  .join("");

console.log({ instructions, state, message });
