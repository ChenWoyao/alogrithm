const log = console.log.bind(console)

// 二维数组查找
/*
* 方法一
* 从左到右，从上到下递增 => 左上区间 < x < 右下区间; 不确定区间(右上，左下)
* 假设选取值为y, 查找值为x
* x === y => find it
* y < x => x 在 y 的右边或者下边(右下+右上+左下)
* y > x => x 在 y 的上边或者左边(左上+右上+左下)
* 上面的方法存在重复区间导致问题复杂去掉
*
* 方法二
* 从右上角开始取y, 依次去掉列
* x === y => find it
* y < x => 去除y所在行
* y > x => 去除y所在列
* 范围为空就是没找到否则递归上面
* */

const find = (matrix, rows, cols, number) => {
  let found = false
  if (matrix.length > 0 && rows > 0 && cols > 0) {
    // 右上角
    let row = 0
    let col = cols - 1
    // 每次区间往左边和下边缩减 => 左边和右边区间
    while (row < rows && col >= 0) {
      if (matrix[row * cols + col] === number) {
        found = true
        break
      } else if(matrix[row * cols + col] > number) {
      //  去掉列
        col--
      } else {
      //  去掉行
        row++
      }
    }
  }
  return found
}

const replaceWithChar = (str, goal, char) => {
  return str.replaceAll(goal, char)
}

// 删除链表的节点 => pass
// 从未到头输出链表
// 链表中倒数第K个节点
// 翻转列表
// 合并两个排序链表
// 两链表的第一个公共节点

// 从尾到头输出链表
/*
* 方法一：
* 用一个栈存储从头到尾的输出即可
* 方法二：
* 递归输出,每次输出该节点的下一个节点值，
* */

const printListReversingly = (list) => {
  let p = list.head
  while (p != null) {
    if (p.next != null) {
      printListReversingly(p.next)
    }
    log(p.element)
  }
}

// 树的子结构
// 二叉树中和为某一直的路径
// 二叉树深度
// 重建二叉树
// 二叉树后序遍历序列
// 广度优先遍历
// 二叉搜索树
// 镜像二叉树

const log = console.log.bind(console)

/**
 * 动态规划，路径问题
 * f(1, 1) -> f(n, m)
 * f(n, m) = f(n - 1, m) + f(n, m - 1)
 * 关于f(n, m), n >= 1, m >= 1
 */

// var uniquePaths = function(m, n) {
//     pre = Array(n)
//     cur = Array(n)
//     if (m === 1 && n === 1) {
//         return 1
//     }
//     if (m === 1) {
//         return uniquePaths(m, n - 1)
//     }
//     if (n === 1) {
//         return uniquePaths(m - 1, n)
//     }
//     return uniquePaths(m - 1, n) + uniquePaths(m, n - 1)
// }

var uniquePaths = function(m, n) {
    if (m === 1 || n === 1) {
        return 1
    }
    let dp = Array(m).fill(Array(n).fill(1))
    for (let i = 1; i < m; i++) {
        dp[i][0] = 1
    }
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
        }
    }
    log(dp)
    return dp[m - 1][n - 1]
}
// log(uniquePaths(3, 2))


