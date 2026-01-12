export type TreeNode = {
    id: string;
    parentId: string;
    children: TreeNode[];
}

export function find(id: string, tree: TreeNode): TreeNode | null {
    if (tree.id === id) {
        return tree;
    }
    for (const child of tree.children) {
        const result = find(id, child);
        if (result) return result;
    }
    return null;
}

export function addChild(child: TreeNode, tree: TreeNode): void {
    tree.children.push(child);
}