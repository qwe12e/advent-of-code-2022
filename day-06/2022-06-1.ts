const buffer = (await Deno.readTextFile("./datastream-buffer.txt")).split("");

let i = 0;
while (i < buffer.length) {
  const [a, b, c, d] = buffer.slice(i, i + 4);
  if (a === b || a === c || a === d) {
    i++;
  } else if (b === c || b === d) {
    i += 2;
  } else if (c === d) {
    i += 3;
  } else {
    break;
  }
}
console.log(
  `How many characters need 
   to be processed before the
   first start-of-packet marker is detected?`,
  i + 4
);
