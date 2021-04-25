import { IBinaryTree } from "./IBinaryTree";

export interface IBinarySearchTree extends IBinaryTree<number> {
  has(value: number): boolean;
}
