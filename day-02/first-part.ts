const guideRaw = await Deno.readTextFile("./strategy-guide.txt");
const guide = guideRaw.split("\n").map((str) => str.split(" ")) as [
  opponentHands,
  myHands
][];

const outcomeScores = {
  lose: 0,
  draw: 3,
  win: 6,
};
enum opponentHands {
  Rock = "A",
  Paper = "B",
  Scissors = "C",
}
enum myHands {
  Rock = "X",
  Paper = "Y",
  Scissors = "Z",
}
const myHandScore = {
  X: 1,
  Y: 2,
  Z: 3,
} as Record<myHands, number>;
const conditions: [opponentHands, myHands, number][] = [
  [opponentHands.Rock, myHands.Rock, outcomeScores.draw],
  [opponentHands.Rock, myHands.Paper, outcomeScores.win],
  [opponentHands.Rock, myHands.Scissors, outcomeScores.lose],
  [opponentHands.Paper, myHands.Rock, outcomeScores.lose],
  [opponentHands.Paper, myHands.Paper, outcomeScores.draw],
  [opponentHands.Paper, myHands.Scissors, outcomeScores.win],
  [opponentHands.Scissors, myHands.Rock, outcomeScores.win],
  [opponentHands.Scissors, myHands.Paper, outcomeScores.lose],
  [opponentHands.Scissors, myHands.Scissors, outcomeScores.draw],
];

// {
//     A: {
//         X: 4
//     }
// }
const scoreObject = conditions.reduce((obj, condition) => {
  const [opponentHand, myHand, score] = condition;
  obj[opponentHand] ||= { X: 0, Y: 0, Z: 0 };
  obj[opponentHand][myHand] = score + myHandScore[myHand];
  return obj;
}, {} as Record<opponentHands, Record<myHands, number>>);

const totalScore = guide.reduce((score, row) => {
  const [opponentHand, myHand] = row;
  return score + scoreObject[opponentHand][myHand];
}, 0);

console.log({ totalScore });
