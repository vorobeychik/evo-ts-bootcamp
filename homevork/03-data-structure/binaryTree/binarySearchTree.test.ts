import { BinarySearchTree } from "./binarySearchTree";
import {ITreeNode} from "../interfaces/ITreeNode";

const testBinaryTree:ITreeNode<number> = {
  value: 6,
  left: {
    value: 2,
    left: {
      value: 1,
    },
    right: {
      value: 4,
      left: {
        value: 3,
      },
      right: {
        value: 5,
      },
    },
  },

  right: {
    value: 7,
    right: {
      value: 9,
      left: {
        value: 8,
      },
    },
  },
};

describe("BinarySearchTree", () => {
  it("should create tree correctly", () => {
    expect(new BinarySearchTree(testBinaryTree).getTree()).toEqual(
      testBinaryTree
    );
  });

  it("should return true if value in tree", () => {
    expect(new BinarySearchTree(testBinaryTree).has(5)).toBeTruthy();
  });

  it("should return false if value not in tree", () => {
    expect(new BinarySearchTree(testBinaryTree).has(10)).toBeFalsy();
  });

  it("should return false if value not in tree", () => {
    expect(
      new BinarySearchTree(testBinaryTree).setTree({ value: 1 }).has(-10)
    ).toBeFalsy();
  });
});
