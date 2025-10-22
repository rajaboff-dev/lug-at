export default function levenshteinTwoMatrixRows(str1: string, str2: string) {
  const m = str1.length;
  const n = str2.length;

  let prevRow = new Array(n + 1).fill(0);
  const currRow = new Array(n + 1).fill(0);

  for (let j = 0; j <= n; j++) {
    prevRow[j] = j;
  }

  for (let i = 1; i <= m; i++) {
    currRow[0] = i;

    for (let j = 1; j <= n; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        currRow[j] = prevRow[j - 1];
      } else {
        currRow[j] = 1 + Math.min(
          currRow[j - 1],
          prevRow[j],
          prevRow[j - 1]
        );
      }
    }

    prevRow = [...currRow];
  }

  return currRow[n];
}