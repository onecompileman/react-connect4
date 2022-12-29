export const createEmptyConnect4Board = () => {
  const rows = 6,
    cols = 7;
  return Array(rows)
    .fill([])
    .map((rows) => Array(cols).fill(''));
};
