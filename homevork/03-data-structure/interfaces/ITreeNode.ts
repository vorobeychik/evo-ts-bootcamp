export interface ITreeNode<T>{
    value: T;
    left?: ITreeNode<T> | undefined;
    right?: ITreeNode<T> | undefined;
}