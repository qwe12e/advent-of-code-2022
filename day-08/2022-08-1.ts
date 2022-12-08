const rows = (await Deno.readTextFile("./tree-map.txt"))
  .split("\n")
  .map((r) => r.split(""));

const exteriorCount = rows.length * 2 + (rows[0].length - 2) * 2;

let visibleCount = 0;
let hiddenCount = 0;

for (let i = 1; i < rows.length - 1; i++) {
  const cols = rows[i];
  for (let j = 1; j < cols.length - 1; j++) {
    const currentTreeHeight = cols[j];

    const isBigger = (treeHeightList: string[]) => {
      return treeHeightList.every((height) => currentTreeHeight > height);
    };
    const isTopVisible = () => isBigger(rows.slice(0, i).map((col) => col[j]));
    const isBottomVisible = () =>
      isBigger(rows.slice(i + 1, rows.length).map((col) => col[j]));
    const isRightVisible = () => isBigger(cols.slice(j + 1, cols.length));
    const isLeftVisible = () => isBigger(cols.slice(0, j));
    if (
      isTopVisible() ||
      isBottomVisible() ||
      isRightVisible() ||
      isLeftVisible()
    ) {
      visibleCount++;
    } else {
      hiddenCount++;
    }
  }
}
console.log({ totalVisibleCount: exteriorCount + visibleCount, hiddenCount });
