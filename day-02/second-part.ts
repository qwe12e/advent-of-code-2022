const guideRaw = await Deno.readTextFile("./strategy-guide.txt");
const guide = guideRaw.split("\n").map((str) => str.split(" ")) as [
  opponentHands,
  outcome
][];

enum outcome {
  // lose
  lose = "X",
  // draw
  draw = "Y",
  // win
  win = "Z",
}
const outcomeScores = {
  X: 0,
  Y: 3,
  Z: 6,
} as Record<outcome, number>;
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

const conditions: [opponentHands, outcome, myHands][] = [
  [opponentHands.Rock, outcome.lose, myHands.Scissors],
  [opponentHands.Rock, outcome.draw, myHands.Rock],
  [opponentHands.Rock, outcome.win, myHands.Paper],
  [opponentHands.Paper, outcome.lose, myHands.Rock],
  [opponentHands.Paper, outcome.draw, myHands.Paper],
  [opponentHands.Paper, outcome.win, myHands.Scissors],
  [opponentHands.Scissors, outcome.lose, myHands.Paper],
  [opponentHands.Scissors, outcome.draw, myHands.Scissors],
  [opponentHands.Scissors, outcome.win, myHands.Rock],
];

const scoreObject = conditions.reduce((obj, condition) => {
  const [opponentHand, outcome, myHand] = condition;
  obj[opponentHand] ||= { X: 0, Y: 0, Z: 0 };
  obj[opponentHand][outcome] = outcomeScores[outcome] + myHandScore[myHand];
  return obj;
}, {} as Record<opponentHands, Record<outcome, number>>);

const totalScore = guide.reduce((score, row) => {
  const [opponentHand, myHand] = row;
  return score + scoreObject[opponentHand][myHand];
}, 0);

console.log({ totalScore });
