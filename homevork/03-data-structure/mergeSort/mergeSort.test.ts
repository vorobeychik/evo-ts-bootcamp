import { mergeSort } from "./mergeSort";

describe("mergeSort", () => {
  it("should sort 1 element array", () => {
    expect(mergeSort([1], (a, b) => a - b)).toEqual([1]);
  });

  it("should sort empty array", () => {
    expect(mergeSort([], (a, b) => a - b)).toEqual([]);
  });

  describe.each([
    [
      [1, 3, 2, 7],
      [1, 2, 3, 7],
    ],
    [
      [3, 12, 26, 25, 30],
      [3, 12, 25, 26, 30],
    ],
    [
      [5, 2, 11, 4, 8, 19, 1],
      [1, 2, 4, 5, 8, 11, 19],
    ],
  ])("should sort correctly", (arr, expectedArr) => {
    expect(mergeSort(arr, (a, b) => a - b)).toEqual(expectedArr);
  });

  describe.each([
    [
      [8, 11, 2, 4],
      [11, 8, 4, 2],
    ],
    [[7, 4, 31, 2, 91, 56, 8], [7, 4, 31, 2, 91, 56, 8].sort((a, b) => b - a)],
  ])("should sort correctly", (arr, expectedArr) => {
    expect(mergeSort(arr, (a, b) => b - a)).toEqual(expectedArr);
  });
});
