const log = console.log.bind(console)

/**
# 多数元素
[题目来源](https://leetcode-cn.com/problems/majority-element/)
## 思路:
1. 多数元素就是排序后的中位数
*/
const majorityElement = function (nums) {
    let sorts = nums.sort()
    return sorts[Math.floor(sorts.length / 2)]
}


/**
 * # 最小K个数
 * [题目来源](https://leetcode-cn.com/problems/smallest-k-lcci/)
 * ## 思路:
 * [1,3, 5,7, 2,4, 6,8], k = 2
 * k >= 2 return 本身
 * 分：分到数组大小 < k
 * [1, 3], [5, 7], [2, 4], [6, 8]
 * 合:
 * [1, 3], [2, 4]
 * [1, 2]
 */
const smallestK = function (arr, k) {
    const merge = (left, right, k) => {
        let result = left.concat(right).sort((pre, next) => pre - next).slice(0, k)
        return result
    }
    if (k === 0) return []
    if (arr.length <= k) return arr
    let mid = Math.floor(arr.length / 2)
    let left = smallestK(arr.slice(0, mid), k)
    let right = smallestK(arr.slice(mid), k)

    return merge(left, right, k)
}



