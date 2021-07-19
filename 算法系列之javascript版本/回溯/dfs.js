const log = console.log.bind(console)
/**
# 子集
给你一个整数数组nums, **数组中的元素互不相同** 。返回该数组所有可能的子集。
解集不能包含重复的子集。你可以按任意顺序返回解
> 示例 1
```
输入：nums = [1,2,3]
输出：[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
```
> 示例 2：
```
输入：nums = [0]
输出：[[],[0]]
```
*/

/*
思路:
深度:    选择
depth0: [1], []
depth1: [2], []
depth2: [3], []
depth3: back
*/
const subsets = nums => {
    const result = []
    // 当前路径
    const path = []
    const dfs = (depth) => {
        // 走到第nums.length的时候就不需要往下走了
        if (depth === nums.length) {
            result.push(path.slice())
            return
        }
        // 采用当前节点值并往下走
        path.push(nums[depth])
        dfs(depth + 1)
        // 不采用当前值并往下走
        path.pop()
        dfs(depth + 1)
    }
    dfs(0)
    return result
}

/**
# 全排列
[题目来源](https://leetcode-cn.com/problems/permutations/)
思路:
[1, 2, 3] -> [[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]]
深度:      选择:
depth0: [[1], [2], [3]] intersection used[]
depth1: [[1], [2], [3]] intersection used[choice1]
depth2: [[1], [2], [3]] intersection used[choice1, choice2]
depth3: 结束
*/

const permute = nums => {
    const used = new Set()
    const path = []
    const result = []
    const dfs = (depth) => {
        if (depth === nums.length) {
            result.push(path.slice())
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
    return result
}

/*
# 括号生成
[题目来源](https://leetcode-cn.com/problems/generate-parentheses/)
思路:
n = 3 ["((()))","(()())","(())()","()(())","()()()"]
depth0:
        => 左 && (left < n) 或者 右 && (right < left)
depth1:
        => 左 && (left < n) 或者 右 && (right < left)
depth2:
        => 左 && (left < n) 或者 右 && (right < left)
  .
  .
  .
depth2n:  结束
*/

const generateParenthesis = function (n) {
    const result = []
    const path = []
    let left = 0, right = 0
    const dfs = depth => {
        if (depth === 2 * n) {
            result.push(path.slice().join(''))
            return
        }
        if (left < n) {
            path.push('(')
            left++
            dfs(depth + 1)
            path.pop()
            left--
        }
        if (right < left) {
            right++
            path.push(')')
            dfs(depth + 1)
            path.pop()
            right--
        }
    }
    dfs(0)
    return result
}


/**
# 组合总和
[题目来源](https://leetcode-cn.com/problems/combination-sum/)
思路:
candidates = [2,3,6,7], target = 7, result = [[7], [2,2,3]]
candidates = [2,3,5], target = 8, result = [[2,2,2,2],[2,3,3],[3,5]]
depth0: choice in candidates
depth1: choice in candidates
  .
  .
depth sum > target: back
*/

const combinationSum = (candidates, target) => {
    const result = []
    const path = []
    const dfs = (depth) => {
        const cp = path.slice()
        const sum = cp.reduce((acc, item) => acc + item, 0)
        if (sum === target) {
            result.push(cp)
            return
        }
        if (sum > target) {
            return
        }
        for (let i = 0; i < candidates.length; i++) {
            path.push(candidates[i])
            dfs(depth + 1)
            path.pop()
        }
    }
    dfs(0)
    const set = new Set()
    return result.filter(item => {
        let val = item.sort().join("")
        if (!set.has(val)) {
            set.add(val)
            return true
        }
        return false
    })
}

/**
 * # 电话号码的字母组合
 * [题目来源](https://leetcode-cn.com/problems/letter-combinations-of-a-phone-number/)
 * ```思路:
    // 2-abc
    // 3-def
    // 深度:    选择:
    // depth0  2  a or b or c
    // depth1  3  d or e or f
    // depth === str.length back
    ```
 */
const letterCombinations = function (digits) {
    const mapChar = {
        '2': ['a', 'b', 'c'],
        '3': ['d', 'e', 'f'],
        '4': ['g', 'h', 'i'],
        '5': ['j', 'k', 'l'],
        '6': ['m', 'n', 'o'],
        '7': ['p', 'q', 'r', 's'],
        '8': ['t', 'u', 'v'],
        '9': ['w', 'x', 'y', 'z'],
    };
    const result = []
    const path = []
    const dfs = depth => {
        if (depth === digits.length) {
            path.length && result.push(path.slice().join(''))
            return
        }
        const choices = mapChar[digits[depth]]
        for (let i = 0; i < choices.length; i++) {
            const char = choices[i]
            path.push(char)
            dfs(depth + 1)
            path.pop()
        }
    }
    dfs(0)
    return result
}

// const digits = '2'
// log(letterCombinations(digits))

// 小青蛙可以一次挑一台阶也可以2台阶，问到n台阶有多少种走法
// 深度:    选择:
// depth0  0
// depth1  1
// depth2  1-1, 2
// depth === n back
const jumpStep = n => {
    const result = []
    let path = []
    if (n === 0) return result.length
    const dfs = depth => {
        if (depth === n) {
            result.push(path.slice())
            path = []
            return
        }
        path.push(1)
        dfs(depth + 1)
        // 当前层数到目标层数小于等于2, 才可以跳2台阶
        if (depth + 2 <= n) {
            path.pop()
            path.push(2)
            dfs(depth + 2)
        }
    }
    dfs(0)
    return result.length
}



log(jumpStep(4))

//  0, 1, 2, 3, 5, 8
