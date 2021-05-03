import { IBinaryTree } from "../interfaces/IBinaryTree";
import { ITreeNode } from "../interfaces/ITreeNode";
import { TraverseType } from "../enums/TraverseType";

export class BinaryTree<T extends string | number> implements IBinaryTree<T> {
  constructor(protected tree: ITreeNode<T>) {}

  public setTree(tree: ITreeNode<T>): this {
    this.tree = tree;
    return this;
  }

  public getTree() {
    return this.tree;
  }

  public traverse(traverseType: TraverseType): T[] {
    switch (traverseType) {
      case TraverseType.PreOrder:
        return this.preOrderTraverse(this.tree);
      case TraverseType.InOrder:
        return this.inOrderTraverse(this.tree);
      case TraverseType.PostOrder:
        return this.postOrderTraverse(this.tree);
      case TraverseType.BFS:
        return this.BFS(this.tree);
    }
  }

  private preOrderTraverse(tree: ITreeNode<T>): T[] {
    const left = tree.left ? this.preOrderTraverse(tree.left) : [];
    const right = tree.right ? this.preOrderTraverse(tree.right) : [];
    return [tree.value, ...left, ...right];
  }

  private inOrderTraverse(tree: ITreeNode<T>): T[] {
    const left = tree.left ? this.inOrderTraverse(tree.left) : [];
    const right = tree.right ? this.inOrderTraverse(tree.right) : [];
    return [...left, tree.value, ...right];
  }

  private postOrderTraverse(tree: ITreeNode<T>): T[] {
    const left = tree.left ? this.postOrderTraverse(tree.left) : [];
    const right = tree.right ? this.postOrderTraverse(tree.right) : [];
    return [...left, ...right, tree.value];
  }

  private BFS(tree: ITreeNode<T>): T[] {
    const queue = [tree];
    const values:T[] = [];

    while (queue.length > 0) {
      const [node] = queue.splice(0, 1);

      values.push(node.value);

      if (node.left) {
        queue.push(node.left);
      }

      if (node.right) {
        queue.push(node.right);
      }
    }

    return values;
  }

  public getColumn(columnOrder: number): T[] {
    const queue: [ITreeNode<T>, number][] = [[this.tree, 0]];
    const values:T[] = [];

    while (queue.length > 0) {
      const [[node, order]] = queue.splice(0, 1);

      if (columnOrder === order) {
        values.push(node.value);
      }

      if (node.left) {
        queue.push([node.left, order - 1]);
      }

      if (node.right) {
        queue.push([node.right, order + 1]);
      }
    }

    return values;
  }
}
