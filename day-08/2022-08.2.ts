const rows = (await Deno.readTextFile("./tree-map.txt"))
  .split("\n")
  .map((r) => r.split(""));

const scenicScore = (currentTreeHeight: string, treeHeightList: string[]) => {
  let count = 0;
  for (const treeHeight of treeHeightList) {
    count++;

    if (treeHeight >= currentTreeHeight) {
      break;
    }
  }
  return count;
};

let highestScore = 0;
for (let i = 1; i < rows.length - 1; i++) {
  const cols = rows[i];
  for (let j = 1; j < cols.length - 1; j++) {
    const tree = cols[j];
    const topScore = scenicScore(
      tree,
      rows
        .slice(0, i)
        .map((col) => col[j])
        .reverse()
    );
    const bottomScore = scenicScore(
      tree,
      rows.slice(i + 1, rows.length).map((col) => col[j])
    );
    const rightScore = scenicScore(tree, cols.slice(j + 1, cols.length));
    const leftScore = scenicScore(tree, cols.slice(0, j).reverse());

    const totalScore = topScore * bottomScore * rightScore * leftScore;
    if (totalScore > highestScore) {
      highestScore = totalScore;
    }
  }
}

console.log({ highestScore });
