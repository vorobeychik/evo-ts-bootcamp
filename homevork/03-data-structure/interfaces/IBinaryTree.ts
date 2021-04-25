import { ITreeNode } from "./ITreeNode";
import { TraverseType } from "../enums/TraverseType";

export interface IBinaryTree<T> {
  setTree(value: ITreeNode<T>): this;
  getTree(): ITreeNode<T>;
  traverse(traverseType: TraverseType): T[];
  getColumn(columnOrder:number): T[],
}
