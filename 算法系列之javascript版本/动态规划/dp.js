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

