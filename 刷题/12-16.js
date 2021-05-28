const log = console.log.bind(console)

// 字符串的排列
// a b c -> f(bc)(a) f(ac)(b) f(ac)(b)
// a b -> f(b)(a) f(a)(b)
/**
 * 题目一： 输入一个字符串，打印出字符串中字符的所有排列
 * abc, acb, a不动， bc的排列组合
 * bac, cba, a替换， bc
 * cab, bca, a替换， cb
 *
 * a b => a,  b的排列组合
 * a b => a替换,  b
 *
 * a b c d => a, f(b, c, d) => a, f(b, f(c, d)) => 6
 * 6 * 3 = 18 => f(4) = 24
 *
 * 解法思路：
 * 把字符串分为两部分，一部分是字符串的第一个字符，另一部是剩余的字
 * 符，求剩余字符的排列组合。
 * 那第一个字符与剩余排列字符逐个交换
 */

const permutation = (str) => {
    let char = str.slice(0, 1)
    let remainStr = str.slice(1)
    let tempResult = []
    if (remainStr.length === 1) {
        return [char + remainStr, remainStr + char]
    }
    let temp = permutation(remainStr)
    temp.forEach(tp => tempResult.push(char + tp))
    tempResult = tempResult.concat(temp.reduce((acc, tp) => {
        let len = tp.length
        let inn = []
        for (let i = 0; i < len; i++) {
            let cloneChar = char
            let cloneTp = tp.split('')
            let swapChar = cloneChar
            cloneChar = cloneTp[i]
            cloneTp[i] = swapChar
            inn.push(cloneChar + cloneTp.join(''))
        }
        return acc.concat(inn)
    }, []))
    return tempResult
}

/**
 * 字符串的组合
 * 输入a, b, c 有
 * a, b, c, ab, ac, bc, abc
 * 思路:
 * n = 3 个字符
 * 长度m=1的时候，包含a, 从剩余的字符中，选取m-1个字符
 * => a
 * 长度m=1的时候，不包含a, 长度m=2的时候，选取m个字符
 * => b, c
 * 长度m=2的时候，包含a, 从剩余的字符中，选取m-1个字符
 * => ab, ac
 * 长度m=2的时候，不包含a, 长度m=2的时候，选取m个字符
 * => bc
 * 长度m=3的时候，包含a, 从剩余的字符中，选取m-1个字符
 * => abc
 * 长度m=3的时候，不包含a, 长度m=2的时候，选取m个字符
 * => null
 */


/**
 * 数组中出现次数超过一半的数字【1, 2, 3, 2, 2, 2, 5, 4, 2】
 * 思路一：排序后的中位数
 * 思路二：两个变量，一个记录当前遍历的数字，一个记录次数
 * 下一个数字与当前相同加1，不同减1。如果为0，数字变量保存下一个数字
 * 【1, 2, 3, 2, 2, 2, 5, 4, 2】
 *  1 -> 2  2, 0
 *  2 -> 3, 3, 0
 *  3 -> 2, 2, 0
 *  2 -> 2, 2, 1,
 *  2 -> 2, 2, 2,
 *  2 -> 2, 2, 3,  2 -> 5, 2, 2, 2 -> 4, 2, 1, 2 -> 2, 2, 2
 *  因为出现次数大于一半，即使极端情况 [1, 2, 3, 2, 4, 2, 5, 2, 2]
 *  记录当前数子的变量也会大于0
 */

const moreThanHalfNum = (arr) => {
    let len = arr.length
    if (len === 0) return 0
    let result = arr[0]
    let times = 1
    for (let i = 1; i < len; i++) {
        if (times === 0) {
            result = arr[i]
            times = 1
        } else if (arr[i] === result) {
            times++
        } else {
            times--
        }
    }
    return result
}


/**
 * 最小的k个数字
 * 4，5，1，6，2，7，3，8
 * k = 4 => 1, 2, 3, 4
 * 借助容器,容器的容量是k
 * 容器的容量少于k就往里面扔
 * 容量到k以后，找出容器中最大的值（O(lgn)）
 * 剩余的数和最大值比较，如果比最大值小就替换
 * 一直这么遍历下去(O(n))
 */

function swap(arr, i, j) {
    let temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
}

function heapify(arr, i) {
    let left = 2 * i + 1
    let right = 2 * i + 2
    let largest = i
    let len = arr.length
    if (left < len && arr[left] > arr[largest]) {
        largest = left
    }
    if (right < len && arr[right] > arr[largest]) {
        largest = right
    }
    if (largest != i) {
        swap(arr, i, largest)
        heapify(arr, largest)
    }
}

function buildMaxHeap(arr) {
    let len = arr.length
    for (let i = Math.floor(len / 2); i >= 0; i--) {
        heapify(arr, i)
    }
}

const getLeastNumbers = (arr, k) => {
    const vector = []
    if (k > arr.length) return arr
    if (!arr) return []
    for (let i = 0; i < arr.length; i++) {
        if (vector.length < k) {
            vector.push(arr[i])
        } else {
            if (i === k) {
                buildMaxHeap(vector)
            }
            if (arr[i] < vector[0]) {
                vector[0] = arr[i]
                buildMaxHeap(vector)
            }
        }
    }
    return vector
}

let arr = [8, 6, 7, 4, 1, 9, 10, 11, 12, 13]
log(getLeastNumbers(arr, 4))

