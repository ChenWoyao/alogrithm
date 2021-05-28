const log = console.log.bind(console)

/**
 给定一个 没有重复 数字的序列，返回其所有可能的全排列。
    输入: [1,2,3]
    1 -> 2 -> 3
    1 -> 3 -> 2
    输出:
    [
        [1,2,3],
        [1,3,2],
        [2,1,3],
        [2,3,1],
        [3,1,2],
        [3,2,1]
    ]
    1 -> 2 -> 3
    ans.length === len
    back
    1 -> 2
    剩余的子集[3]
    当前的子集[1, 2]
    back
    1 -> 3 -> 2
*/

// permute 函数是求数组的全排列
// dfs(arr, i) 是arr.slice(i)的全排列集合
var permute = function (nums) {
    const res = []
    const path = []
    const used = new Set()
    const dfs = (depth) => {
        if (depth === nums.length) {
            res.push(path.slice())
            return
        }
        for (let i = 0; i < nums.length; i++) {
            if (!used.has(i)) {
                used.add(i)
                path.push(nums[i])
                dfs(depth + 1)
                used.delete(i)
                path.pop()
            }
        }
    }
    dfs(0)
    return res
};


const nums = [1, 2, 3]
log(permute(nums))
