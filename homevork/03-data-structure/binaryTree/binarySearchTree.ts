import { IBinarySearchTree } from "../interfaces/IBinarySearchTree";
import { BinaryTree } from "./binaryTree";
import { ITreeNode } from "../interfaces/ITreeNode";

export class BinarySearchTree
  extends BinaryTree<number>
  implements IBinarySearchTree {
  constructor(tree: ITreeNode<number>) {
    super(tree);
  }

  public has(value: number): boolean {
    let tree = this.tree;

    while (true) {
      if (tree.value === value) {
        return true;
      }

      if (value < tree.value) {
        if (tree.left) {
          tree = tree.left;
        } else {
          break;
        }
      }

      if (tree.right) {
        tree = tree.right;
      } else {
        break;
      }
    }

    return false;
  }
}


