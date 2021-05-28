const log = console.log.bind(console)

/*
  旋转数组一次后数组有效
  二分查找，特殊情况顺序查找[1, 0, 1, 1, 1] or [1, 1, 1, 0, 1]
*/
const minInOrder = (arr, start, end) => {
  let result = arr[start]
  for (let i = start; i <= end; i++) {
    if (arr[i] < result) {
      result = arr[i]
    }
  }
  return result
}

const min = (arr) => {
  let len = arr.length
  if (arr === null || len <= 0) {
    throw error('invalid parameters')
  }
  let start = 0
  let end = len - 1
  let mid = start // 因为旋转数组可能就是有序数组本身，即旋转0个元素
  // [递增1.。。。] >= [递增2.。。。]
  while (arr[start] >= arr[end]) {
    if (end - start === 1) {
      mid = end
      break
    }
    mid = (start + end) / 2
    if (arr[start] === arr[end] && arr[mid] === arr[start]) {
      return minInOrder(arr, start, end)
    }
    if (arr[mid] >= arr[start]) {
      start = mid
    } else if (arr[mid] <= arr[end]) {
      end = mid
    }
  }
  return arr[mid]
}

// 回溯法
/*
many steps has many items
in one step select one item has many item's steps
* */



// left-arr, right-arr,
const mergeSort = (arr) => {
  let len = arr.length
  if (len < 2) {
    return arr
  }
  let mid = Math.floor(len / 2)
  let left = arr.slice(0, mid)
  let right = arr.slice(mid)
  return merge(mergeSort(left), mergeSort(right))
}

const merge = (left, right) => {
  let result = []
  while (left.length && right.length) {
    if (left[0] < right[0]) {
      result.push(left.shift())
    } else {
      result.push(right.shift())
    }
  }
  while (left.length) {
    result.push(left.shift())
  }
  while (right.length) {
    result.push(right.shift())
  }
  return result
}


/*
回溯法找矩阵路径=>暴力法
a b t g
c f c s
j d e h
* */
/**
 * @matrix 矩阵
 * @rows 矩阵行数
 * @str 需要查找的字符串
 * */
const hasPath = (matrix, rows, cols, str) => {
  if (matrix === null || rows < 1 || cols < 1 || str === null) {
    return false
  }
  // 用一个标记记录格子是否已经走过
  let visited = []
  for (let i = 0; i < rows * cols; i++) {
    visited[i] = false
  }
  let pathLen = 0
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      // 设置开始起点
      if (hasPathCore(matrix, rows, cols, row, col, str, pathLen, visited)) {
        return true
      }
    }
  }
  return false
}

const hasPathCore = (matrix, rows, cols, row, col, str, pathLen, visited) => {
  if (str[pathLen] === undefined) {
    return true
  }
  let hasPath = false
  // log('run', str, hasPath, row, col, matrix[row * cols + col], pathLen)
  // row, col 从0开始
  if (row >= 0 && row < rows && col >= 0 && col < cols
        && matrix[row * cols + col] === str[pathLen]
        && !visited[row * cols + col]) {
    // log('ok', str[pathLen])
    pathLen++
    visited[row * cols + col] = true
    hasPath = hasPathCore(matrix, rows, cols, row, col - 1, str, pathLen, visited)
    || hasPathCore(matrix, rows, cols, row - 1, col, str, pathLen, visited)
    || hasPathCore(matrix, rows, cols, row, col + 1, str, pathLen, visited)
    || hasPathCore(matrix, rows, cols, row + 1, col, str, pathLen, visited)
    // log('now', str, hasPath, matrix[row * cols + col])
    if (!hasPath) {
      // 没找到回退节点
      pathLen--
      visited[row * cols + col] = false
    }
  }
  return hasPath
}

let matrix = ['a', 'b', 't', 'g','c', 'f', 'c', 's', 'j', 'd', 'e', 'h']
let str1 = 'bfce'
let str2 = 'bfcb'
let rows = 3
let cols = 4

log(hasPath(matrix, rows, cols, str2))


/*
* 机器人运动范围
* point(x, y)
* condition: f1(x) + f1(y) <= k, f1为求一个数的位数和
* 0 <= x < m; 0 <= y < n;
* resolvtion: 可以走多少个格子
* */

const getDigitSum = num => {
  // 999, 1, 0,
  if (num === 0) {
    return num
  }
  let r = num % 10
  num = Math.floor(num / 10)
  return r + getDigitSum(num)
}

const moving = (k, rows, cols) => {
  if (k < 0 || rows < 0 || cols < 0) {
    return 0
  }
  let visited = []
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      visited[row * cols + col] = false
    }
  }
  let count = movingCore(k, rows, cols, 0, 0, visited)
  return count
}

const movingCore = (k, rows, cols, row, col, visited) => {
  let count = 0
  if (!visited[row * cols + col] && 0 <= row && row < rows
      && 0 <= col && col < cols && getDigitSum(row) + getDigitSum(col) <= k) {
    visited[row * cols + col] = true
    count = 1 + movingCore(k, rows, cols, row, col - 1, visited)
    + movingCore(k, rows, cols, row - 1, col, visited)
    + movingCore(k, rows, cols, row, col + 1, visited)
    + movingCore(k, rows, cols, row + 1, col, visited)
  }
  return count
}
