const log = console.log.bind(console)

// 0[000], 1[001], 2[010], 3[011], 4[100], 5[101], 6[110]
// 0, 1, 1, 2, 1,
/**
如果 xx 是偶数，bit[x] = bit[x / 2] 偶数右移的1个的个数和x/2一样
如果 xx 是奇数，bit[x] = bit[x / 2] + 1
=> bix[x] = bit[x >> 1] + (x & 1)
 */

const countBits = function (num) {
    const result = new Array(num + 1).fill(0)
    for (let i = 0; i <= num; i++) {
        result[i] = result[i >> 1] + (i & 1)
    }
    return result
}

function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
}

const swap = (tree, left, right) => {
    tree.left = right
    tree.right = left
}

var invertTree = function (root) {
    if (root.left === null && root.right === null) {
        return root
    }
    if (root === null) {
        return root
    }
    if (root.left || root.right) {
        swap(root, root.left, root.right)
    }
    if (root.left) {
        invertTree(root.left)
    }
    if (root.right) {
        invertTree(root.right)
    }
    return root
};



