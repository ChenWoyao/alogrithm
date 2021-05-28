const log = console.log.bind(console)

/**
 * 二叉树的最大深度
 * 给定一个二叉树，找出其最大深度。

二叉树的深度为根节点到最远叶子节点的最长路径上的节点数。

说明: 叶子节点是指没有子节点的节点。

示例：
给定二叉树 [3,9,20,null,null,15,7]，

    3
   / \
  9  20
    /  \
   15   7
返回它的最大深度 3

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/maximum-depth-of-binary-tree
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

思路：一个stack存储每一层，当第一层结束以后开始下一层。
 */

function TreeNode(val, left, right) {
    this.left = (left === undefined ? null : left)
    this.val = (val === undefined ? 0 : val)
    this.right = (right === undefined ? null : right)
    this.toString = () => {
        const root = this
        const levels = [
            [root]
        ]
        let result = [root]
        while (levels.length) {
            const level = levels.pop()
            const ans = []
            while (level.length) {
                const node = level.pop()
                node.left && ans.push(node.left)
                node.right && ans.push(node.right)
            }
            /** 这里很坑, ans是一个引用, 每次都会清空 */
            ans.length && levels.push(ans) && (result = result.concat(ans.slice()))
        }
        return result.reduce((acc, node) =>
            acc.concat([node ? node.val : 'null']),
            []).join(' ')
    }
}


var maxDepth = function (root) {
    if (!root) return 0
    const levels = [
        [root]
    ]
    const result = [
        [root]
    ]
    // handle all level of a tree
    while (levels.length) {
        // handle all node of level
        const level = levels.pop()
        const ans = []
        while (level.length) {
            // handle a node of a level
            const node = level.pop()
            node.left && ans.push(node.left)
            node.right && ans.push(node.right)
        }
        ans.length && levels.push(ans) && result.push(ans)
    }
    return result.length
}

// 测试用例: [3,9,20,null,null,15,7]
// const tree = new TreeNode(3)
// tree.left = new TreeNode(9, null, null)
// tree.right = new TreeNode(20)
// tree.right.left = new TreeNode(15)
// tree.right.right = new TreeNode(7)

// log(maxDepth(tree))

/**
 * 从前序与中序遍历序列构造二叉树
 * 根据一棵树的前序遍历与中序遍历构造二叉树。

注意:
你可以假设树中没有重复的元素。

例如，给出

前序遍历 preorder = [3,9,20,15,7]
中序遍历 inorder = [9,3,15,20,7]
返回如下的二叉树：

    3
   / \
  9  20
    /  \
   15   7

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
思路：先序确定了跟，中序确定了跟的左子树，右子树
 */
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function (preorder, inorder) {
    if (inorder.length == 0) return null;
    const rootVal = preorder[0]
    const index = inorder.indexOf(rootVal)
    const leftTreeArrOfInorder = inorder.slice(0, index)
    const leftTreeArrOfPreorder = preorder.slice(1, 1 + index)
    const rightTreeArrOfInorder = inorder.slice(index + 1)
    const rightTreeArrOfPreorder = preorder.slice(1 + index)
    // log(`根为${rootVal}左子树的先序:`, leftTreeArrOfPreorder, `根为${rootVal}左子树的中序`, leftTreeArrOfInorder)
    // log(`根为${rootVal}右子树的先序:`, rightTreeArrOfPreorder, `根为${rootVal}右子树的中序`, rightTreeArrOfInorder)
    const root = new TreeNode(rootVal)
    root.left = buildTree(leftTreeArrOfPreorder, leftTreeArrOfInorder)
    root.right = buildTree(rightTreeArrOfPreorder, rightTreeArrOfInorder)
    return root
}


// 测试用例： [3,9,20,15,7] [9,3,15,20,7] => [3,9,20,null,null,15,7]
const root = buildTree([-77, 24, -74, 84, 93, 28, 83, 6, 95, 58, 59, 66, 22, -3, -66, -68, -22, 3, -80, -79, -85, 17, 32, 9, -88, -99, 14, -60, 13, -93, -63, 91, 82, 21, 26, -11, -32, -16, -100, -94, -31, -62, -89, 49, -9, -8, 87, -33, -81, 80, 0, 69, -7, 52, 67, -5, -65, 31, -30, 37, -57, 27, 23, 38, -28, 7, -82, -42, 11, -55, -36, -58, -24, 89, 56, 73, 41, 18, -87, -70, 4, -64, 20, -52, -39, 79, 19, 30, 65, 25, -71, -76, -1, 62, -69, 98, 39, -25, -73, 70, 88, -17, -20, -75, 55, 34, 57, 81, -10, 94, 48, -35, 5, -23, -44, 40, -51, -61, -13, -86, 63, 71, -97, 45, 43, 51, 75, 33, -34, 92, 47, -78, 85, -26, 97, -29, -92, -83, -59, 74, 96, 68, 77, 16, -4, 10, 60, 64, -21, -2, 1, -91, 86, 46, 76, -37, -19, -96, 36, -98, 29, -72, 61, 50, 15, -95, -40, -43, -53, 90, -15, -48, -27, -90, -54, 72, -50, -49, -18, 78, 54, 35, -38, 99, 44, -67, 53, -12, -41, 2, 8, -14, -84, -56, -6, 12, -45, 42, -47, -46],
    [93, 28, 84, 83, -74, 59, 58, 66, -66, -3, -79, -80, 3, -22, -68, 22, -85, -99, 14, -88, 9, 32, 17, -60, 95, -93, 82, 21, 91, -63, 26, 13, -16, -32, -11, -100, 6, -62, 49, -89, -31, 87, -8, 69, 0, 80, -7, -81, -65, -5, 67, -30, 31, 52, -33, 37, -57, -9, 7, -28, -42, -82, 38, -55, 11, 23, -36, 27, 56, 89, 73, -24, 41, -58, -70, -87, 20, -64, -52, 4, 18, -94, 19, 30, -76, -1, -71, 62, -69, 25, -73, -25, 70, 39, 88, 98, -20, -17, 65, 55, -75, 79, 34, -39, 48, 94, -23, 5, -44, -35, 40, -10, -61, -51, -13, 81, 63, -97, 71, -86, 57, 45, 24, -34, 85, 97, -26, -78, -83, -92, 74, -59, 96, -29, 68, 47, 77, 92, 10, -4, 16, 60, 33, -21, 1, 86, 76, 46, -37, -91, -2, 64, 75, 51, -19, -96, 43, -98, 29, 61, -72, 50, 36, -95, -40, -43, 15, 90, -15, -53, -77, -54, -90, -49, -50, 72, -27, 35, 54, -38, 78, -67, 44, 53, 99, -41, -12, -18, 8, 2, -48, -56, -84, -14, -45, 12, 42, -6, -46, -47])

// const root = buildTree([3,9,20,15,7], [9,3,15,20,7])
// log(root.toString())


