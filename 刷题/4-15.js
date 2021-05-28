const log = console.log.bind(console);

/**
 * var subsets = function(nums) {}
 给你一个整数数组 nums ，数组中的元素互不相同
 返回该数组所有可能的子集（幂集）。解集不能包含重复的子集。你可以按 任意顺序 返回解集。
 * @param {*} nums
 输入：nums = [1,2,3]
 输出：[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]

 输入：nums = [0]
 输出：[[],[0]]

 [0] => 0 * [] + [] => [0]
 [1, 2, 3] => [1] * dp(1)的所有组合 + dp(1)的所有组合
 [m, n] * [1] =>
 */
var subsets = function (nums) {
    const multiply = (number, arr) => {
        if (arr.length === 0) return [[number], []]
        return arr.map((item) => [number].concat(item))
    }
    const dps = new Array(nums.length).fill(0)
    const dp = (nums, i) => {
        if (dps[i]) {
            return dps[i]
        }
        if (!nums.slice(i).length) {
            dps[i] = []
            return []
        }
        dps[i] = multiply(nums[i], dp(nums, i + 1)).concat(dp(nums, i + 1))
        return dps[i]
    };
    return dp(nums, 0)
}

var subsets2 = function (nums) {
    const records = []
    const results = []
    const dfs = (i) => {
        if (i === nums.length) {
            results.push(records.slice())
            return
        }
        records.push(nums[i])
        dfs(i + 1)
        records.pop()
        dfs(i + 1)
    }
    dfs(0)
    return results
}

// nums = [1, 2, 3]
// log(subsets2(nums))

/**
 * 两个整数之间的汉明距离指的是这两个数字对应二进制位不同的位置的数目。
 * 给出两个整数 x 和 y，计算它们之间的汉明距离。
 * 1 -> 001
 * 4 -> 100
 * xor -> 010
 *
 * 1 & 4 -> 000 (全1则1) 用来判断最后一位是0还是1
 * 1 | 4 -> 101 (有1为1)
 * 1 ^ 4 -> 101 (相同为0，不同为1)
 * 1 >> 1 -> 1
 * 4 >> 1 -> 0
 * 结束条件右移变成了0
 */
var hammingDistance = function (x, y) {
    let count = 0, xor = x ^ y
    while (xor) {
        if (xor & 1) count++;
        xor = xor >> 1
    }
    return count
};
