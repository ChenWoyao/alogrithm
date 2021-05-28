const log = console.log.bind(console)

/**
 * @param {*} matrix
 * @param {*} target
 编写一个高效的算法来搜索 m x n 矩阵 matrix 中的一个目标值   target 。该矩阵具有以下特性：每行的元素从左到右升序排列。
 每列的元素从上到下升序排列。

 now > target => 左，上
 now < target => 右，下
 动态规划
 dp(now > target) = dp(left) || dp(top)
 dp(now < target) = dp(right) || dp(bottom)
 */
// var searchMatrix = function(matrix, target) {
//     let result = false;
//     if (!matrix) return result
//     let row = matrix.length;
//     if (!row) return result
//     let col = matrix[0].length;

//     let n_col = 0
//     let n_row = 0

//     const visited = new Set()
//     const dp = (matrix, n_col, n_row, target) => {
//         if (n_col < 0 || n_col >= col) return false;
//         if (n_row < 0 || n_row >= row) return false;
//         let now = matrix[n_row][n_col];
//         log("now:", now, 'target:', target, 'n_col:', n_col, 'n_row', n_row)
//         if (!visited.has(`${n_row},${n_col}`)) {
//             visited.add(`${n_row},${n_col}`)
//         } else {
//             return false
//         }
//         if (now > target) {
//             return dp(matrix, n_col - 1, n_row, target) || dp(matrix, n_col, n_row - 1, target)
//         }
//         if (now < target) {
//             return dp(matrix, n_col + 1, n_row, target) || dp(matrix, n_col, n_row + 1, target)
//         }
//         if (now === target) {
//             return true
//         }
//     }
//     return dp(matrix, n_col, n_row, target)
// };

var searchMatrix = function(matrix, target) {
    const rows = matrix.length
    const cols = matrix[0].length
    if (rows === 0 || cols === 0) return false;
    // 从左下角开始遍历
    let i = rows - 1, j = 0;
    while(i >= 0 && j < cols) {
        const now = matrix[i][j]
        if (now === target) {
            return true
        } else if(now > target) {
            i--
        } else {
            j++
        }
    }
    return false
};

const matrix1 = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]]
const target1 = 5

const matrix2 = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]]
const target2 = 20

const matrix3 = [[2,5],[2,8],[7,9],[7,11],[9,11]]
const target3 = 7

const matrix4 = [[1,6,10,13,14,16,21],[3,10,12,18,22,27,29],[3,15,19,20,23,29,34],[8,15,19,25,27,29,39],[12,17,24,25,28,29,41],[16,22,27,31,31,33,44],[20,26,28,35,39,41,45],[25,31,34,39,44,45,47]]
const target4 = 38


/*
[2, [3, 4, 5]]
[3, 4, 5] => {
    [3, [4, 5]],
    [[3, 4], 5],
}
[[2, 3], [4, 5]],
[[2, 3, 4], 5] => {
    [2, 3, 4] => {
        [[2, 3], 4],
        [2, [3, 4]],
    }
}

我的思路，+，-，*是分隔符号，把字符串split.对split进行两两组合。
官方思路：分治法。
比如数组的排序：可以拆成两个数组的进行排序，最后拆到只剩下含有2个元素的数组进行排序，在进行合并。

这里的话，找到运算符，拆成左表达式和右表达式，当表达式只有一个运算符的时候，在进行合并。
*/
/*
    输入: "2-1-1", 输出: [0, 2]
    [2, [1, 1]], [[2, 1], 1]
    输入: "2*3-4*5", 输出: [-34, -14, -10, -10, 10]
    [2, [3, 4, 5]], [[2, 3], [4, 5]], [[2, 3, 4], 5],
    [[[2, 3], 4], 5], [[[2], [3, 4]], 5]
*/
var diffWaysToCompute = function(expression) {
    // log('expression:', expression)
    const operators = ['+', '-', '*']
    if (!operators.some(operator => expression.includes(operator))) {
        return [Number(expression)]
    }
    const result = []

    expression.split('').forEach((char, index) => {
        if(operators.includes(char)) {
            let left = diffWaysToCompute(expression.slice(0, index))
            let right = diffWaysToCompute(expression.slice(index + 1))
            // 合并
            for (let l of left) {
                for (let r of right) {
                    if (char === '+') {
                        result.push(l + r)
                    } else if (char === '-') {
                        result.push(l - r)
                    } else {
                        result.push(l * r)
                    }
                }
            }
        }
    })
    return result
};

const expression1 = "2 * 3 - 4 * 5"

log(diffWaysToCompute(expression1))
