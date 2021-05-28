const log = console.log.bind(console);
/**
在未排序的数组中找到第 k 个最大的元素。请注意，你需要找的是数组排序后的第 k 个最大的元素，而不是第 k 个不同的元素。

示例 1:

输入: [3,2,1,5,6,4] 和 k = 2
输出: 5
示例 2:

输入: [3,2,3,1,2,4,5,5,6] 和 k = 4
[1,2,2,3,3,4,5,5,6]
输出: 4
说明: 你可以假设 k 总是有效的，且 1 ≤ k ≤ 数组的长度。
*/
// 第nums.length - k
const partition = (nums, start, k) => {
    console.log("nums", nums);
    if (nums.length <= 1) return nums[0];
    if (nums.length === 2) return nums[k];
    const midIndex = Math.floor(nums.length / 2);
    const midVal = nums[midIndex];
    const left = nums.filter((num) => num <= midVal);
    const right = nums.filter((num) => num > midVal);
    // find it
    console.log("left", left);
    console.log("right", right);
    console.log("start", start, left.length, k);
    if (left.length + start - 1 === k) {
        console.log("find", midVal);
        return midVal;
    } else if (left.length + start - 1 < k) {
        return partition(right, start + left.length, k);
    } else {
        return partition(left, start, k);
    }
};

var findKthLargest = function (nums, k) {
    return partition(nums, 0, nums.length - k);
};

/*
找出所有相加之和为 n 的 k 个数的组合。组合中只允许含有 1 - 9 的正整数，并且每种组合中不存在重复的数字。

说明：

所有数字都是正整数。
解集不能包含重复的组合。 
示例 1:

输入: k = 3, n = 7
输出: [[1,2,4]]
示例 2:

输入: k = 3, n = 9
输出: [[1,2,6], [1,3,5], [2,3,4]]

*/

/**
 * f(n, 3) => {
 *   f(1, 1) + f(n - 1, 2)
 *   f(2, 1) + f(n - 2, 2)
 *   f(m, 1) + f(n - m, 2)
 * }
 * f(n, k) => {
 *  f(m, 1) +  f(n - m, k - 1)
 *  1 <= m <= 9, 1 < k
 *  f(a, 1) + f(b, 1) + .... + f(m, 1)
 * }
 * f(1, 1) = 1, f(2, 1) = 2, .... f(n, 1) = n
 */
var combinationSum3 = function (k, n) {
    const ans = [];
    const cur = [];
    /**
     * @param {*} u 当前遍历到的数字
     * @param {*} ans 最终结果集
     * @param {*} cur 当前结果集
     * @param {*} sum 当前结果集的总和
     */
    function dfs(u, ans, cur, sum) {
        // log(`dfs(${u}):`, cur)
        if (sum === n && cur.length === k) {
            ans.push(cur.slice());
            return;
        }
        if (u == 10 || sum > n || cur.length > k) return;
        cur.push(u);
        // 计算cur中有u的组合
        dfs(u + 1, ans, cur, sum + u);
        cur.pop();
        // 计算cur中没有u的组合
        dfs(u + 1, ans, cur, sum);
    }
    dfs(1, ans, cur, 0);
    return ans;
};

// log(combinationSum3(3, 9))


function foo() {
    console.error('foo');
}

process.nextTick(foo);
console.error('bar1');
console.error('bar2');
console.error('bar3');
setTimeout(() => {console.log('test')})
