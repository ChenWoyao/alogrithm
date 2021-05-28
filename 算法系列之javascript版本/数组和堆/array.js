const log = console.log.bind(console)
/**
# 旋转图像
[题目来源](https://leetcode-cn.com/problems/rotate-image/)
思路:
matrix = Array.from(new Array(m), (item) => new Array(n).fill(0))
所谓的原地右旋: 列->行 对应的 x : y -> y : x 但是值确倒叙了
(0, 2) -> (1, 2) -> (2, 2)  =>  (2, 0) -> (2, 1) -> (2, 2)
3 -> 6 -> 9 => 9 -> 6 -> 3 => (0, 2) === (2, 2) 所以应该是 x : y -> y : (n - x - 1)
*/

const rotate = function (matrix) {
    const n = matrix.length;
    const matrix_new = new Array(n).fill(0).map(() => new Array(n).fill(0));
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            matrix_new[j][n - i - 1] = matrix[i][j];
        }
    }
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            matrix[i][j] = matrix_new[i][j];
        }
    }
};

/**
# 除自身以外数组的乘积
[题目来源](https://leetcode-cn.com/problems/product-of-array-except-self/)
思路:
遍历数组中每一项，然后在对自己遍历一次求乘积. 然而哈哈哈，超时了。 n * n的算法复杂度都不让通过。想想也是要不太简单了。因此面试的时候如果遇到一个题目觉得太简单，一定要想一想是不是踩坑了^_^
正解:
1. 初始化两个空数组 L 和 R。对于给定索引 i，L[i] 代表的是 i 左侧所有数字的乘积，R[i] 代表的是 i 右侧所有数字的乘积。
2. 我们需要用两个循环来填充 L 和 R 数组的值。对于数组 L，L[0] 应该是 1，因为第一个元素的左边没有元素。对于其他元素：L[i] = L[i-1] * nums[i-1]。
同理，对于数组 R，R[length-1] 应为 1。length 指的是输入数组的大小。其他元素：R[i] = R[i+1] * nums[i+1]。
3. 当 R 和 L 数组填充完成，我们只需要在输入数组上迭代，且索引 i 处的值为：L[i] * R[i]。
4. 总结，庶竭驽钝。
*/

// const productExceptSelf = nums => {
//     return nums.map((item, pos) => {
//         return nums.reduce((mul, num, index) => {
//             if (pos === index) return mul
//             return mul * num
//         }, 1)
//     })
// }

const productExceptSelf = nums => {
    const L = new Array(nums.length)
    const R = new Array(nums.length)
    const result = []
    for (let i = 0; i < L.length; i++) {
        if (i === 0) {
            L[i] = 1
        } else {
            L[i] = L[i - 1] * nums[i - 1]
        }

    }
    for (let i = R.length - 1; i >= 0; i--) {
        if (i === R.length - 1) {
            R[i] = 1
        } else {
            R[i] = R[i + 1] * nums[i + 1]
        }
    }
    for (let i = 0; i < nums.length; i++) {
        result[i] = L[i] * R[i]
    }
    return result
}

/**
# 三数之和
[题目来源](https://leetcode-cn.com/problems/3sum/)
思路：
1. 排序
2. 两数之和就是用集合，三数之和就是对剩余数组做2数之和，用一个指针指向剩余数组左边，一个指针指向剩余数组右边
(遍历的时候不需要对大于0的项进行处理)
3. 左指针每次右移遇到重复的数字继续右移，左移遇到重复的继续左移
nums = [-1, 0, 1, 2, -1, -4]
// sort
nums = [-4, -1, -1, 0, 1, 2]
//
*/
const threeSum = function (nums) {
    let ans = [];
    const len = nums.length;
    if (nums == null || len < 3) return ans;
    nums.sort((a, b) => a - b);
    for (let i = 0; i < len; i++) {
        // 如果当前数字大于0，则三数之和一定大于0，所以结束循环
        if (nums[i] > 0) break;
        // 去重
        if (i > 0 && nums[i] == nums[i - 1]) continue;
        let L = i + 1;
        let R = len - 1;
        while (L < R) {
            const sum = nums[i] + nums[L] + nums[R];
            if (sum == 0) {
                ans.push([nums[i], nums[L], nums[R]]);
                while (L < R && nums[L] == nums[L + 1]) L++; // 去重
                while (L < R && nums[R] == nums[R - 1]) R--; // 去重
                L++;
                R--;
            }
            else if (sum < 0) L++;
            else if (sum > 0) R--;
        }
    }
    return ans;
}
