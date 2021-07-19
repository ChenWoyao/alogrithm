const log = console.log.bind(console)
/**
# 最小路径和
[题目来源](https://leetcode-cn.com/problems/minimum-path-sum/)
思路：
dp(i)(j) 从左上角到(i, j)位置的最小路径
// 当只能竖着走的时候
dp(i)(0) = dp(i-1)(0) + grid[i][0]
// 当只能横着走的时候
dp(0)(i) = dp(0)(i-1) + grid[0][i]
// 当上一步可以通过向右或者向下到当前(i, j)位置的时候
dp(i)(j) = Math.min(dp(i-1)(j), dp(i)(j-1)) + grid[i][j]
*/
const minPathSum = grid => {
    if (grid === null || grid.length === 0 || grid[0].length === 0) return 0
    const rows = grid.length
    const cols = grid[0].length
    const dp = Array.from(new Array(rows), () => new Array(cols).fill(0))
    dp[0][0] = grid[0][0]
    for (let i = 1; i < rows; i++) {
        dp[i][0] = dp[i - 1][0] + grid[i][0]
    }
    for (let j = 1; j < cols; j++) {
        dp[0][j] = dp[0][j - 1] + grid[0][j]
    }
    for (let i = 1; i < rows; i++) {
        for (let j = 1; j < cols; j++) {
            dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j]
        }
    }
    return dp[rows - 1][cols - 1]
}


// grid = [[1, 2, 3], [4, 5, 6]]
// - 最长上升子序列
// - 最长公共子序列
// - 背包问题
// - 完全背包


/**
 # 二叉树中的最大路径和
 [题目来源](https://leetcode-cn.com/problems/binary-tree-maximum-path-sum/)
 思路:
 就是在以该节点为根节点的子树中寻找以该节点为起点的一条路径，使得该路径上的节点值之和最大
 1. 空节点的最大贡献值等于0。
 2. 非空节点的最大贡献值等于节点值与其子节点中的最大贡献值之和（对于叶节点而言，最大贡献值等于节点值）
 举例:
   -10
   / \
  9  20
    /  \
   15   7
叶节点 9、15、7 的最大贡献值分别为 9、15、7。
f(20) = 20 + max(15, 7) = 35
f(-10) = -10 + max(9, 35) = 25
路径经过-10的节点，路径终点为9的最优路径，幽静终点为20的最优路径。
9的最优解(叶子节点就是本身), 20的最优解()
*/

const maxPathSum = (root) => {
    let maxSum = 0;
    const maxGain = node => {
        if (!node) return 0
        // 如果左边的最优解是负数，就不走左边
        let leftGain = Math.max(maxGain(node.left), 0)
        let rightGain = Math.max(maxGain(node.right), 0)
        // 该路径的最优解
        let priceNewPath = node.val + leftGain + rightGain
        // 对比之前的最优路径解
        maxSum = Math.max(maxSum, priceNewPath)
        // 返回当前节点的最优选择
        return node.val + Math.max(leftGain, rightGain)
    }
    maxGain(root)
    return maxSum
}

const dpMaxPathSum = root => {
    let ans = root.val
    const dp = (node) => {
        if (!node) return 0
        const { left, val, right } = node
        const L = dp(left)
        const R = dp(right)
        ans = Math.max(ans, L + val + R, L + val, R + val, val)
        return Math.max(val, val + Math.max(L, R))
    }
    return ans
}

