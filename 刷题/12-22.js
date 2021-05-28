const log = console.log.bind(console)

/**
 * 把数组排成最小的数
 * 输入一个整数数组，数组里面的数字拼凑一来排成一个数，
 * 打印出能拼接出来的所有数字中的最小的一个。
 * 举例：{3, 32, 321} => 321323
 * 思路一： 求 a b c 的全排列 但是比较慢
 * 思路二：m, n => min(mn, nm) => m 与 n 的大小关系
 * 然后用一个数组存储, 得到一个从小到大的排序
 */
const quickSort = arr => {
    if (arr.length < 2) {
        return arr
    }
    let pos = arr[0]
    let left = arr.slice(1).filter(item => {
        let str1 = pos + item
        let str2 = item + pos
        return str1 > str2
    })
    let right = arr.slice(1).filter(item => {
        let str1 = pos + item
        let str2 = item + pos
        return str1 < str2
    })
    return quickSort(left).concat([pos]).concat(quickSort(right))
}

const printMinNumber = arr => {
    arr = arr.map((item) => String(item))
    arr = quickSort(arr)
    return arr.join('')
}

// log(printMinNumber([3, 32, 321]))

/**
 * 把数字翻译成字符串
 * 0 - a, 1 - b, 2 - c, 3 - d, 11-l, 25-z
 * 一个数字可能有多个翻译
 * 12258->[1, 2, 2, 5, 8]->bccfi
 * 12258->[1, 22, 5, 8]->bwfi
 * 12258->[1, 2, 25, 8]->bczi
 * .... mcfi, mzi
 * 思路
 * [1, 2, 2, 5, 8]->[1]f([2, 2, 5, 8]) + [12]f([2, 5, 8])
 * [1]f([2, 2, 5, 8]) -> [1][2]f([2, 5, 8]) + [1][22]f([5,8])
 * [1][2]f([2, 5, 8]) -> [1][2][2](f[5, 8]) + [1][2][25]f(8)=>1
 * [1][2][2](f[5, 8]) -> [1][2][2][5](f[8])=>1 + [1][2][2][58]=>null
 * [1]f([2, 2, 5, 8]) = 2 + 1
 * [12]f([2, 5, 8]) = 1 + 1
 * 其中: f是求这个数组的翻译
 * 因为f([2, 5, 8])重复了，上面的例子是子下而上(递归)。所以要采取自上而下（迭代）
 * f(8) -> f([5, 8]) -> f([2, 5, 8]) .... -> f([1, 2, 2, 5, 8])
 */


/**
 *
 * @param {int} num >= 0, num <= 25
 */
const getTransition = num => {
    const replica = 'a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z'.split(',')
    return replica[num]
}

const getTransitionCountWrap = num => {
    if (num < 0) return 0
    // '12218'
    const getTransitionCount = (numStr) => {
        let len = numStr.length
        let counts = []
        let count = 0
        for (let i = len - 1; i >= 0; i--) {
            count = 0
            if (i < len - 1) {
                // '1225'
                count = counts[i + 1]
            } else {
                // '8'
                count = 1
            }
            if (i < len - 1) {
                // '5' '2'.....
                let digit1 = Number(numStr[i])
                // '8' '5'.....
                let digit2 = Number(numStr[i + 1])
                let coverted = digit1 * 10 + digit2
                // 如果digit1是0不满足
                if (coverted >= 10 && coverted <= 25) {
                    if (i < len - 2) {
                        // count 就是f[1, 8] count[i + 2] 就是 f[8]
                        count += counts[i + 2]
                    } else {
                        count += 1
                    }
                }
            }
            // counts = [..., 1] -> [..., 2, 1] -> [...,3, 2, 1] -> ....
            counts[i] = count
        }
        count = counts[0]
        return count
    }
    return getTransitionCount(String(num))
}

// log(getTransitionCountWrap(12258))
/**
 * 礼物的最大价值
 * m x n 的棋牌，每个棋盘的每一格放一个礼物
 * 1  10 3  8
 * 12 2  9  6
 * 5  7  4  11
 * 3  7  16 5
 * 规则：左上角开始，向右或向下，直到到达右下角
 * 思路一：先把这个棋盘转成图然后转成邻接矩阵最后根据floyd的算法逻辑求出最大价值
 * 动态规划->函数规则->递归
 * f(i, j) = max(f(i - 1, j), f(i, j - 1)) + gift[i, j]
 * 递归中与重复的要么自下而上的迭代写不好写就继续用自上而下，用一个辅助数组来几率
 */
// const getMaxValueSolution = (values, rows, cols) => {
//     const collection = new Array(rows).fill(new Array(cols).fill(null))
//     const result = []
//     const getMaxValue = (i, j) => {
//         if (i < 0 || j < 0) return 0
//         if (i === 0 && j === 0) {
//             collection[i][j] = values[i][j]
//         } else {
//             let left = collection[i] ? (collection[i][j - 1] || 0) : 0
//             let top = collection[i - 1] ? (collection[i - 1][j] || 0) : 0
//             let val = values[i][j]
//             collection[i][j] = Math.max(left, top) + val
//         }
//         if (i === rows - 1 && j === cols - 1) return collection[i, j]
//     }
//     for (let i = 0; i < rows; i++) {
//         for (let j = 0; j < cols; j++) {
//             getMaxValue(i, j)
//         }
//     }
//     return collection[rows - 1][cols - 1]
// }

const getMaxValue = (values, rows, cols) => {
    if (values === null || rows <= 0 || cols <= 0) {
        return 0
    }
    let maxValues = []
    for (let i = 0; i < rows; i++) {
        maxValues[i] = []
    }
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            let left = 0
            let up = 0
            if (i > 0) up = maxValues[i - 1][j]
            if (j > 0) left = maxValues[i][j - 1]
            maxValues[i][j] = Math.max(left, up) + values[i][j]
        }
    }
    let maxValue = maxValues[rows - 1][cols - 1]
    return maxValue
}

const matrix = [[1, 10, 3, 8], [12, 2, 9, 6], [5, 7, 4, 11], [3, 7, 16, 5]]

log(getMaxValue(matrix, 4, 4))
