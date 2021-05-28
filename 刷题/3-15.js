const log = console.log.bind(console);

var nextPermutation = function (nums) {
    let index = 0;
    for (let i = nums.length - 1; i >= 0; i--) {
        if (nums[i - 1] < nums[i]) {
            index = i - 1;
            break;
        }
    }
    // 从index+1开始都是降序
    const min = nums[index];
    const order = nums.slice(index + 1);
    let swapIndex = nums.length - 1;
    for (let i = order.length - 1; i >= 0; i--) {
        if (order[i] > min) {
            swapIndex = swapIndex - i + order.length - 1;
            break;
        }
    }
    // swap
    [nums[index], nums[swapIndex]] = [nums[swapIndex], nums[index]];
    // sort
    return [...nums.slice(0, index + 1), ...nums.slice(index + 1).sort()];
};

// 输入：nums = [1,2,3]
// 输出：[1,3,2]

// 输入：nums = [3,2,1]
// 输出：[1,2,3]
// 示例 3：

// 输入：nums = [1,1,5]
// 输出：[1,5,1]
// 示例 4：

// 输入：nums = [1]
// 输出：[1]
// const nums = [
//     [1,2,3],
//     [3,2,1],
//     [1,1,5],
//     [1],
//     [1, 3, 2]
// ]

// 给你一个只包含 '(' 和 ')' 的字符串，找出最长有效（格式正确且连续）括号子串的长度
// 输入：s = "(()"
// 输出：2
// 输入：s = ")()())"
// 输出：4
// 解释：最长有效括号子串是 "()()"
// 输入：s = ""
// 输出：0
const getValidExpression = (str) => {
    let pre, cur, fur;
    let index = str.indexOf(")");
    if (index < 0) return "";
    if (index == 0) return str.slice(index, index + 1);
    cur = index;
    pre = index - 1;
    const visited = Array(str.length).fill(false);
    while (str[pre] === "(" && str[cur] === ")") {
        let fur = cur + 1;
        visited[pre] = visited[cur] = true;
        if (str[fur] === ")") {
            cur = fur;
            fur = fur + 1;
            pre = pre - 1;
            while (visited[pre]) {
                pre = pre - 1;
            }
        } else if (str[fur] === "(") {
            pre = cur + 1;
            cur = pre + 1;
            fur = cur + 1;
        } else {
            break;
        }
    }
    let [start, end] = [visited.indexOf(true), visited.lastIndexOf(true)];
    return str.slice(start, end + 1);
};

/**
对于遇到的每个 ‘(’ ，我们将它的下标放入栈中
对于遇到的每个 ‘)’ ，我们先弹出栈顶元素表示匹配了当前右括号：
如果栈为空，说明当前的右括号为没有被匹配的右括号，我们将其下标放入栈中来更新我们之前提到的「最后一个没有被匹配的右括号的下标」
如果栈不为空，当前右括号的下标减去栈顶元素即为「以该右括号为结尾的最长有效括号的长度」
 */
var longestValidParentheses1 = function(s) {
    const dp = new Array(s.length).fill(0)
    let maxans = 0
    for (let i = 0; i < s.length; i++) {
        if (s[i] === ')') {
            if (s[i - 1] === '(') {
                dp[i] = (i >= 2 ? dp[i - 2] : 0) + 2
            } else if (i - dp[i - 1] > 0 && s[i - dp[i - 1] - 1] === '(') {
                dp[i] = dp[i - 1] + ((i - dp[i - 1]) >= 2 ? dp[i - dp[i - 1] - 2] : 0) + 2
            }
            maxans = Math.max(maxans, ...dp)
        }
    }
    return maxans
}
// log(longestValidParentheses(s))

var longestValidParentheses = function (s) {
    // 第一个没有匹配成功的右括号是-1
    const stack = [-1];
    let maxans = 0;
    for (let i = 0; i < s.length; i++) {
        if (s[i] === "(") {
            stack.push(i);
        } else {
            stack.pop();
            // 栈为0了，说明已经匹配完了
            if (stack.length === 0) {
                stack.push(i);
            } else {
                // 栈顶就是目前目前最靠前的没有被匹配的右括号
                maxans = Math.max(maxans, i - stack[stack.length - 1]);
            }
        }
    }
    return maxans;
};

