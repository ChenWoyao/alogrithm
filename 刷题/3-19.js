const log = console.log.bind(console);

function TreeNode(val, left, right) {
    this.left = left === undefined ? null : left;
    this.val = val === undefined ? 0 : val;
    this.right = right === undefined ? null : right;
    this.toString = () => {
        const root = this;
        const levels = [[root]];
        let result = [root];
        while (levels.length) {
            const level = levels.pop();
            const ans = [];
            while (level.length) {
                const node = level.pop();
                node.left && ans.push(node.left);
                node.right && ans.push(node.right);
            }
            ans.length &&
                levels.push(ans) &&
                (result = result.concat(ans.slice()));
        }
        return result.reduce(
            (acc, node) => acc.concat([node ? node.val : "null"]),
            []
        );
    };
}

// 给定一个二叉树，检查它是否是镜像对称的。
// 例如，二叉树 [1,2,2,3,4,4,3] 是对称的。
//     1
//    / \
//   2   2
//  / \ / \
// 3  4 4  3
// 但是下面这个 [1,2,2,null,3,null,3] 则不是镜像对称的:

//     1
//    / \
//   2   2
//    \   \
//    3    3
var isSymmetric = function (root) {
    if (!root) return false;
    function isEqual(node1, node2) {
        if (!node1 && !node2) return true;
        if (!node1 || !node2) return false;
        if (node1.val === node2.val) {
            return (
                isEqual(node1.left, node2.right) &&
                isEqual(node1.right, node2.left)
            );
        } else {
            return false;
        }
    }
    return isEqual(root, root);
};

const tree = new TreeNode(1);
tree.left = new TreeNode(2);
tree.right = new TreeNode(2);
tree.left.right = new TreeNode(3);
tree.right.right = new TreeNode(3);

var levelOrder = function (root) {
    const levels = [[root]];
    let result = [root.val];
    while (levels.length) {
        const level = levels.pop();
        const ans = [];
        while (level.length) {
            const node = level.pop();
            node.left && ans.push(node.left);
            node.right && ans.push(node.right);
        }
        ans.length && levels.push(ans) && (result.push(ans.slice().map(node => node.val)));
    }
    return result
};

// 3
// / \
// 9  20
//  /  \
// 15   7
const tree2 = new TreeNode(3)
tree2.left = new TreeNode(9);
tree2.right = new TreeNode(20);
tree2.right.left = new TreeNode(15);
tree2.right.right = new TreeNode(7);

log(levelOrder(tree2))
