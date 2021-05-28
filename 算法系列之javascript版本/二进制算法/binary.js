const log = console.log.bind(console)
/**
# 汉明距离
[题目来源](https://leetcode-cn.com/problems/hamming-distance/)
## 思路:
xor操作后，右移记录1的个数，右移为0就结束了循环
*/

const hammingDistance = (x, y) => {
    let xor = x ^ y, count = 0
    while (xor) {
        if (xor & 1) count++
        xor >>= 1
    }
    return count
}

/**
# 比特位计数
[题目来源](https://leetcode-cn.com/problems/counting-bits/)
## 思路:
奇数最后一位为1，偶数最后一位为0.
所以偶数的右移1位，1的个数不变。
奇数右移1位，1个个数减一。
因此得出：
如果 xx 是偶数，bit[x] = bit[x / 2]
如果 xx 是奇数，bit[x] = bit[x / 2] + 1
=>
bix[x] = bit[x >> 1] + (x & 1)
*/
const countBits = num => {
    const result = new Array(num + 1).fill(0)
    for (let i = 0; i <= num; i++) {
        result[i] = result[i >> 1] + (i & 1)
    }
    return result
}

/**
# 只出现一次的数字
[题目来源](https://leetcode-cn.com/problems/single-number/)
思路:
因为其他的元素都出现过两次，那么两个相同元素进行异或就是0
然后0 ^ 只出现一次的数字值不会变: 0000000 ^ 0110101 = 0110101
*/
const singleNumber = nums => {
    return nums.reduce((acc, num) => acc ^= num, 0)
}
