const log = console.log.bind(console)

// 给定 n 个非负整数，用来表示柱状图中各个柱子的高度。每个柱子彼此相邻，且宽度为 1 。
// 求在该柱状图中，能够勾勒出来的矩形的最大面积。
// 以上是柱状图的示例，其中每个柱子的宽度为 1，给定的高度为 [2,1,5,6,2,3]。
// 图中阴影部分为所能勾勒出的最大矩形面积，其面积为 10 个单位。
// 示例:
// 输入: [2,1,5,6,2,3]
// 输出: 10
// 思路：找出所有组合，其中公共面积是组合的个数乘以min(组合)与组合里面的每个元素比较确定最大值。
// 暴力法：超时不通过
// var largestRectangleArea = function(heights) {
//     let result = []
//     for(let i = 0; i < heights.length; i++) {
//         const base = heights[i]
//         let ans = [base]
//         result.push(ans)
//         for (let j = i + 1; j < heights.length; j++) {
//             let val = heights[j]
//             ans = [...ans, val]
//             result.push(ans)
//         }
//     }

//     let maxValue = 0
//     for(let i = 0; i < result.length; i++) {
//         const arr = result[i]
//         const mianji = Math.min(...arr) * arr.length
//         const bestValue = Math.max(...arr, mianji)
//         if (maxValue < bestValue) {
//             maxValue = bestValue
//         }
//     }
//     return maxValue
// }

// 借用单调栈 + 哨兵 解决问题
// https://leetcode-cn.com/problems/largest-rectangle-in-histogram/solution/bao-li-jie-fa-zhan-by-liweiwei1419/

const testArr = [2,1,5,6,2,3]
// const testArr = [2,1,2]
// [0, 2, 1, 2, 0]
// 2, 1 => 2 - 0 + 1
// log(largestRectangleArea(testArr))
// [0(0), 2(1)] -> [0(0), 1(1)]
// 5 => 3 - 2 + 1
// i:0,s:[0],i:1,s:[2]
const largestRectangleArea = (heights) => {
    let ans = 0
    const stack = []
    heights = [0, ...heights, 0]
    for (let i = 0; i < heights.length; i++) {
        // 遇到右边的临界点，比当前值小
        log('stack', stack)
        while(stack.length && (heights[stack[stack.length - 1]] > heights[i])) {
            const cur = stack.pop()
            let left = stack.slice(-1)[0] + 1
            let right = i - 1
            log('left', left, 'right', right, 'cur', heights[cur])
            ans = Math.max(ans, (right - left + 1) * heights[cur])
        }
        stack.push(i)
    }
    return ans
}

// log(largestRectangleArea(testArr))

// https://leetcode-cn.com/problems/maximal-rectangle/
/**
 * 给定一个仅包含 0 和 1 、大小为 rows x cols 的二维二进制矩阵，找出只包含 1 的最大矩形，并返回其面积。
 */
matrix1 = [["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]
// 6
matrix2 = []
// 0
matrix3 = [["0"]]
// 0
matrix4 = [["1"]]
// 1
matrix5 = [["0","0"]]
// 0
matrix6 = [
        ["1","0","1","1","1"],
        ["0","1","0","1","0"],
        ["1","1","0","1","1"],
        ["1","1","0","1","1"],
        ["0","1","1","1","1"]
]
// 6

var maximalRectangle = function(matrix) {
    if (matrix.length === 0) return 0
    const rows = matrix.length
    const cols = matrix[0].length
    const result = []
    for (let i = 0; i < rows; i++) {
        //  第i行的矩形最大公共面积
        const heights = []
        for (let j = 0; j < cols; j++) {
            if (matrix[i][j] == 1) {
                let height = i
                let count = 1
                while(height != 0 && matrix[height][j] != 0) {
                    height -= 1
                    if (matrix[height][j] == 1) {
                        count += 1
                    }
                }
                heights.push(count)
            } else {
                heights.push(0)
            }
        }
        result.push(heights)
    }
    // 求result中每一个案例的最大公共面积，使用单调栈
    let ans = 0
    result.forEach(example => {
        let stack = []
        let rects = [0, ...example, 0]
        for (let i = 0; i < rects.length; i++) {
            // rects example: [0, 3, 1, 3, 2, 2, 0]
            // stack example: [0, 1]
            // log('rects example', rects)
            // log('stack example', stack)
            while(stack.length && rects[stack.slice(-1)[0]] > rects[i]) {
                const curIndex = stack.pop()
                const left = stack.slice(-1)[0]
                const right = i
                const width = right - left - 1
                ans = Math.max(ans, width * rects[curIndex])
            }
            stack.push(i)
        }
    })
    return ans
}

// log(maximalRectangle(matrix1))
// log(maximalRectangle(matrix2))
// log(maximalRectangle(matrix3))
// log(maximalRectangle(matrix4))
// log(maximalRectangle(matrix5))
// log(maximalRectangle(matrix6))
