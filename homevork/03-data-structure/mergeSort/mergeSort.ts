type CompareFunction<T> = (a: T, b: T) => number;

function merge<T>(
  firstArr: T[],
  secondArr: T[],
  compareFunc: CompareFunction<T>
): T[] {
  const sortedArr: T[] = [];
  let i = 0;
  let j = 0;

  while (i < firstArr.length && j < secondArr.length) {
    const compareFuncResult = compareFunc(firstArr[i], secondArr[j]);

    if (compareFuncResult <= 0) {
      sortedArr.push(firstArr[i]);
      i += 1;
    } else {
      sortedArr.push(secondArr[j]);
      j += 1;
    }
  }

  return [...sortedArr, ...firstArr.slice(i), ...secondArr.slice(j)];
}

export function mergeSort<T>(array: T[], compareFunc: CompareFunction<T>): T[] {
  if (array.length <= 1) {
    return array;
  }

  const middle = Math.floor(array.length / 2);
  const firstArr = array.slice(0, middle);
  const secondArr = array.slice(middle);

  return merge<T>(
    mergeSort(firstArr, compareFunc),
    mergeSort(secondArr, compareFunc),
    compareFunc
  );
}
