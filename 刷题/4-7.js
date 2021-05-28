const log = console.log.bind(console);

/**
 * 给定一个二叉树，判断其是否是一个有效的二叉搜索树。
 * 输入:
    2
   / \
  1   3
输出: true
示例 2:

输入:
    5
   / \
  1   4
     / \
    3   6
输出: false
解释: 输入为: [5,1,4,null,null,3,6]。
     根节点的值为 5 ，但是其右子节点值为 4 。
 */

function TreeNode(val, left, right) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
}

// 中序排列是单调递增数组就说明是有效二叉树
var isValidBST = function (root) {
    let result = []
    // 回朔法
    const helper = (node) => {
        if (!node) return
        helper(node.left)
        result.push(node.val)
        helper(node.right)
    }
    helper(root)
    if (result.length === 1) return true
    return result.every((item, i) => {
        if (i === result.length - 1) {
            return item > result[i - 1]
        }
        return result[i + 1] > item
    })
};

// 5,1,4,null,null,3,6]
// let root = new TreeNode(0)
// root.left = new TreeNode(-1)
// root.right = new TreeNode(4)
// root.left.left = null
// root.left.right = null
// root.right.left = new TreeNode(3)
// root.right.right = new TreeNode(6)

// log(isValidBST(root))

/**
 题目：最短无序连续子数组
 内容：
 给你一个整数数组 nums ，你需要找出一个 连续子数组 ，如果对这个子数组进行升序排序，那么整个数组都会变为升序排序
 示例 1：

输入：nums = [2,6,4,8,10,9,15]
输出：5
解释：你只需要对 [6, 4, 8, 10, 9] 进行升序排序，那么整个表都会变为升序排序。
示例 2：

输入：nums = [1,2,3,4]
输出：0
示例 3：

输入：nums = [1]
输出：0

left: nums.slice(0, i)
right: nums.slice(j + 1)
dp[i, j] = left.concat(right) 有序 且 nums.slice(i, j)排序后的最小大于left的最大，最大大于right的最小
*/

var findUnsortedSubarray = function(nums) {
    // [2,6,4,8,10,9,15]
    // [2,4,6,8,9,10,15]
    const sorted = nums.slice().sort((pre, now) => pre - now);
    console.log('sorted', sorted)
    console.log('nums', nums)
    let left = 0, right = 0;
    for (let i = 0 ; i < nums.length; i++) {
        if (nums[i] !== sorted[i]) {
            left = i
            break
        }
    }
    console.log('left: ', left)
    for (let i = nums.length - 1; i >= 0; i--) {
        if (nums[i] !== sorted[i]) {
            right = i
            break
        }
    }
    console.log('right', right)
    return left > 0 ? right - left + 1 : right - left
};

// nums = [2,6,4,8,10,9,15]
// nums = [2,4,6,8,9,10,15]
nums = [2, 1]
log(findUnsortedSubarray(nums))
