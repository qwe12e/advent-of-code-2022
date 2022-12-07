const buffer = (await Deno.readTextFile("./datastream-buffer.txt")).split("");
const CHAR_LENGTH = 14;
let i = 0;
while (i < buffer.length) {
  const arr = buffer.slice(i, i + CHAR_LENGTH);
  let char = arr.pop();
  while (char) {
    const index = arr.indexOf(char);
    if (index === -1) {
      char = arr.pop();
    } else {
      i += index + 1;
      break;
    }
  }
  if (!arr.length) {
    break;
  }
}
console.log(
  `How many characters need 
   to be processed before the
   first start-of-packet marker is detected?`,
  i + CHAR_LENGTH
);
