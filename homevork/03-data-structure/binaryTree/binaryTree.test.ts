import { BinaryTree } from "./binaryTree";
import { TraverseType } from "../enums/TraverseType";
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


describe("binaryTree", () => {


  it("should create binaryTree correctly", () => {
    expect(new BinaryTree(testBinaryTree).getTree()).toEqual(testBinaryTree);
  });

  it("should set binaryTree correctly",() => {
    expect(new BinaryTree(testBinaryTree).setTree({value:1}).getTree()).toEqual({value:1})
  })

  it("inOrder traverse should work correctly", () => {
    expect(
      new BinaryTree(testBinaryTree).traverse(TraverseType.InOrder)
    ).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  it("preOrder traverse should work correctly", () => {
    expect(
      new BinaryTree(testBinaryTree).traverse(TraverseType.PreOrder)
    ).toEqual([6, 2, 1, 4, 3, 5, 7, 9, 8]);
  });

  it("postOrder traverse should work correctly", () => {
    expect(
      new BinaryTree(testBinaryTree).traverse(TraverseType.PostOrder)
    ).toEqual([1, 3, 5, 4, 2, 8, 9, 7, 6]);
  });

  it("BFS traverse should work correctly", () => {
    expect(
      new BinaryTree(testBinaryTree).traverse(TraverseType.BFS)
    ).toEqual([6, 2, 7, 1, 4, 9, 3, 5, 8]);
  });

  it("BFS traverse should work correctly when node undefined", () => {

    expect(
        new BinaryTree({value:1}).traverse(TraverseType.BFS)
    ).toEqual([1]);
  });

  it("getColumn(0) should return [6,4]",() => {
    expect(new BinaryTree(testBinaryTree).getColumn(0)).toEqual([6,4])
  })

  it("getColumn(1) should return [5,7,8]",() => {
    expect(new BinaryTree(testBinaryTree).getColumn(1)).toEqual([7,5,8])
  })

});
