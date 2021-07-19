const log = console.log.bind(console)
/**
 * # 最长连续序列
 * [题目来源](https://leetcode-cn.com/problems/longest-consecutive-sequence/solution/zui-chang-lian-xu-xu-lie-by-leetcode-solution/)
 ```思路:
    // 100 4 200 1 3 4 2
    // set去重
    // set: 100 4 200 1 3 2
    for val of set {
        99 not in set: currentNum = 100, currentStreak = 1
        // 尽可能求出100的连续
    }
  ```
 */

const longestConsecutive = nums => {
    // 去重，除掉不必要的元素
    const nums_set = new Set(nums)
    let currentElem
    let result = 0
    let currentLength = 0
    for (num of nums_set) {
        // 找到连续队列的左边界
        log('num', num)
        if (!nums_set.has(num - 1)) {
            currentElem = num
            currentLength = 0
        } else {
            // 不是左边界的元素不要处理
            continue
        }
        // 从左边界开始计算连续序列
        while (nums_set.has(currentElem)) {
            currentElem += 1
            currentLength += 1
        }
        result = Math.max(currentLength, result)
    }
    return result
}


const nums = [0, 3, 7, 2, 5, 8, 4, 6, 0, 1]

log('result:', longestConsecutive(nums))
