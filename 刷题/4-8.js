const log = console.log.bind(console)

/*
题目：寻找两个正序数组的中位数
内容：
给定两个大小分别为 m 和 n 的正序（从小到大）数组 nums1 和 nums2。请你找出并返回这两个正序数组的 中位数 。

示例 1：

输入：nums1 = [1,3], nums2 = [2]
输出：2.00000
解释：合并数组 = [1,2,3] ，中位数 2
示例 2：

输入：nums1 = [1,2], nums2 = [3,4]
输出：2.50000
解释：合并数组 = [1,2,3,4] ，中位数 (2 + 3) / 2 = 2.5
示例 3：

输入：nums1 = [0,0], nums2 = [0,0]
输出：0.00000
示例 4：

输入：nums1 = [], nums2 = [1]
输出：1.00000
示例 5：

输入：nums1 = [2], nums2 = []
输出：2.00000
*/

var findMedianSortedArrays = function(ns1, ns2) {
    let [nums1, nums2] = [ns1.slice(), ns2.slice()]
    const len1 = nums1.length, len2 = nums2.length
    let isEven = (len1 + len2) % 2 === 0
    let midIndex = Math.floor((len1 + len2) / 2)
    const stack = []
    while(nums1.length && nums2.length) {
        const [n1, n2] = [nums1[0], nums2[0]]
        n1 <= n2 ? stack.push(nums1.shift()) : stack.push(nums2.shift())
    }
    log('nums1', nums1)
    log('nums2', nums2)
    log('stack', stack)
    nums1.length && stack.push(...nums1)
    nums2.length && stack.push(...nums2)
    let result = isEven ? (stack[midIndex] + stack[midIndex - 1]) / 2 : stack[midIndex]
    return result.toFixed(5)
};

// nums1 = [1,3], nums2 = [2]
// nums1 = [1,2], nums2 = [3,4]
// nums1 = [0,0], nums2 = [0,0]
// nums1 = [], nums2 = [1]
// nums1 = [2], nums2 = []

// log(findMedianSortedArrays(nums1, nums2))

/**
 * 给你一个整数数组 nums ，请你找出数组中乘积最大的连续子数组（该子数组中至少包含一个数字），并返回该子数组所对应的乘积。

 

示例 1:

输入: [2,3,-2,4]
输出: 6
解释: 子数组 [2,3] 有最大乘积 6。
示例 2:

输入: [-2,0,-1]
输出: 0
解释: 结果不能为 2, 因为 [-2,-1] 不是子数组。

dp[i, j] = max(i * dp[i + 1, j], dp[i + 1, j])
*/
var maxProduct = function(nums) {
    let len = nums.length
    let result = nums[0]
    const dpmax = Array.from(new Array(len)).fill(0)
    const dpmin = Array.from(new Array(len)).fill(0)
    const maxDp = (i) => {
        if (i === 0) return nums[i]
        if (dpmax[i]) return dpmax[i]
        let num = nums[i]
        return Math.max(maxDp(i-1) * num, num, minDp(i-1) * num)
    }
    const minDp = (i) => {
        if (i === 0) return nums[i]
        if (dpmin[i]) return dpmin[i]
        let num = nums[i]
        return Math.min(maxDp(i-1) * num, num, minDp(i-1) * num)
    }
    for (let i = 0; i < nums.length; i++) {
        dpmax[i] = maxDp(i)
        dpmin[i] = minDp(i)
        result = dpmax[i] > result ? dpmax[i] : result
    }
    return result
};

// nums = [2,3,-2,4]
nums = [5, 30, -3, 4, -3]
log(maxProduct(nums))
