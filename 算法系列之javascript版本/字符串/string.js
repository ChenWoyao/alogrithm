const log = console.log.bind(console)

/**
kmp
[题目来源](http://www.ruanyifeng.com/blog/2013/05/Knuth%E2%80%93Morris%E2%80%93Pratt_algorithm.html)
思路：
这里使用了一个《部分匹配表》的数据结构
字符串与搜索词依次比较，通过‘移动位数=已知匹配字符串数-对应的部分匹配值’来
移动搜索词。注意这里的移动是指移动字符串的索引位数。

"前缀"指除了最后一个字符以外，一个字符串的全部头部组合
"后缀"指除了第一个字符以外，一个字符串的全部尾部组合
部分匹配值：前缀与后缀的最长的共有元素长度
字符串：‘abcdabd’
前缀:[a, ab, abc, abcd, abcda, abcdb],
后缀: [bcdabd, cdabd, dabd, abd, bd, d]
部分匹配值: 0

字符串：‘abcda’
前缀:[a, ab, abc, abcd],
后缀: [bcda, cda, da, a]
部分匹配值: 1


str: bbc abcdab abcdabcdabde
search: abcdabd
=>
bbc abcdab abcdabcdabde
____abcdabd(4 = 6 - 2)(移动位数=已知匹配字符串数-对应的部分匹配值)
=>
bbc abcdab abcdabcdabde
________abcdabd(2 = 2 - 0)
=>
bbc abcdab abcdabcdabde
__________abcdabd
=>
bbc abcdab abcdabcdabde
___________abcdabd(4 = 6 - 2)
=>
bbc abcdab abcdabcdabde
_______________abcdabd(4 = 6 - 2)
=>
over
*/
// 获取前缀
const getPrefix = str => {
    const arr = str.split('')
    arr.splice(str.length - 1)
    const result = []
    arr.forEach((item, index) => {
        if (index === 0) {
            result.push(item)
        } else {
            result.push(arr.slice(0, index + 1).join(''))
        }
    })
    return result
}
// 获取后缀
const getSuffix = str => {
    const s = str.slice(1)
    const result = []
    for (let key in s) {
        result.push(s.slice(key))
    }
    return result
}
// 获取前缀与后缀的最长公共子集的长度
const commonFix = (prefix, suffix) => {
    let maxLen = 0
    for (let pre of prefix) {
        for (let suff of suffix) {
            if (pre === suff) {
                maxLen = pre.length > maxLen ? pre.length : maxLen
            }
        }
    }
    return maxLen
}
// 得到部分匹配表
const getMatchTable = (str) => {
    const map = new Map()
    for (let i = 0; i < str.length; i++) {
        map.set(i + 1, commonFix(
            getPrefix(str.slice(0, i + 1)),
            getSuffix(str.slice(0, i + 1))
        ))
    }
    return map
}

const match = (str, search) => {
    let matchedLen = 0
    const table = getMatchTable(search)
    let jump = 0
    for (let char of str) {
        if (jump) {
            jump -= 1
            continue
        }
        if (char === search[matchedLen]) {
            matchedLen += 1
            if (matchedLen === search.length) return true
        } else {
            if (matchedLen) {
                // ‘移动位数=已知匹配字符串数-对应的部分匹配值’
                jump = matchedLen - table.get(matchedLen)
                matchedLen = 0
            }
            continue
        }
    }
    return false
}

/*
替换空格
[题目来源](https://leetcode-cn.com/problems/ti-huan-kon g-ge-lcof/)
*/

const replaceSpace = function (s) {
    return s.split(' ').join('%20')
}

/*
表示数值的字符串
[题目来源](https://leetcode-cn.com/problems/biao-shi-shu-zhi-de-zi-fu-chuan-lcof/)
思路：使用有限状态自动机
# 状态自动机
确定有限状态自动机（以下简称「自动机」）是一类计算模型。它包含一系列状态，这些状态中：
有一个特殊的状态，被称作「初始状态」。
还有一系列状态被称为「接受状态」，它们组成了一个特殊的集合。其中，一个状态可能既是「初始状态」，也是「接受状态」。
起初，这个自动机处于「初始状态」。随后，它顺序地读取字符串中的每一个字符，并根据当前状态和读入的字符，按照某个事先约定好的「转移规则」，从当前状态转移到下一个状态；当状态转移完成后，它就读取下一个字符。当字符串全部读取完毕后，如果自动机处于某个「接受状态」，则判定该字符串「被接受」；否则，判定该字符串「被拒绝

枚举字符类型：空格 「 」、数字「 0—9 」 、正负号 「 +- 」 、小数点 「 . 」 、幂符号 「 eE 」
按照字符串从左到右的顺序，定义以下 9 种状态。
0: 开始的空格
1: 幂符号前的正负号
2: 小数点前的数字
3: 小数点、小数点后的数字
4: 当小数点前为空格时，小数点、小数点后的数字
5: 幂符号
6: 幂符号后的正负号
7: 幂符号后的数字
8: 结尾的空格

# 数值（按顺序）可以分成以下几个部分：
1. 若干空格
2. 一个小数或者整数
3.（可选）一个 'e' 或 'E' ，后面跟着一个整数
4. 若干空格

小数的定义：
1.（可选）一个符号字符（'+' 或 '-'）
2. 下述格式之一：
至少一位数字，后面跟着一个点 '.' 比如'1.'
至少一位数字，后面跟着一个点 '.' ，后面再跟着至少一位数字 比如'1.1'
一个点 '.' ，后面跟着至少一位数字 比如'.1'

整数的定义：
1.（可选）一个符号字符（'+' 或 '-'）
2. 至少一位数字
其中终点为2，3，7，8的状态都是接受状态
*/
// '5.2e-3 '

const CharType = {
    'blank': 'blank',
    'sign': 'sign',
    'digit': 'digit',
    'dot': 'dot',
    'e': 'e',
}
// 状态转移表2, 3, 7
// 状态转移表显示了所有的路线方案
const states = [
    // 0: 开始的空格
    { 'blank': 0, 'sign': 1, 'digit': 2, 'dot': 4 },
    // 1: 幂符号前的正负号
    { 'digit': 2, 'dot': 4 },
    // 2: 小数点前的数字
    { 'digit': 2, 'dot': 3, 'e': 5, 'blank': 0 },
    // 3: 小数点、小数点后的数字
    { 'digit': 3, 'e': 5, 'blank': 8 },
    // 4: 当小数点前为空格时，小数点、小数点后的数字
    { 'digit': 3 },
    // 5: 幂符号
    { 'sign': 6, 'digit': 7 },
    // 6: 幂符号后的正负号
    { 'digit': 7 },
    // 7: 幂符号后的数字
    { 'digit': 7, 'blank': 8 },
    // 8: 结尾的空格
    { 'blank': 8 }
]
const isNumber = s => {
    let p = 0
    let t = ''
    // 状态转移循环
    for (let char of s) {
        if ('0' <= char && '9' >= char) {
            t = 'digit'
        } else if ('+-'.includes(char)) {
            t = 'sign'
        } else if ('eE'.includes(char)) {
            t = 'e'
        } else if (char === '.') {
            t = 'dot'
        } else if (char === ' ') {
            t = 'blank'
        } else {
            t = '?'
        }
        if (!states[p][t]) return false
        p = states[p][t]
    }
    return [2, 3, 7, 8].includes(p)
}

/**
字符串的排列
[题目来源](https://leetcode-cn.com/problems/zi-fu-chuan-de-pai-lie-lcof/)
思路:
深度:    选择
depth0: a or b or c
depth1: a or b or c
depth2: a or b or c
depth3: back
*/

const permutation = s => {
    const path = []
    const result = new Set()
    const visited = new Set()
    const dfs = (depth) => {
        if (path.length === s.length) {
            if (!result.has(path.join(''))) {
                result.add(path.join(''))
            }
            return
        }
        for (let i = 0; i < s.length; i++) {
            if (!visited.has(i)) {
                path.push(s[i])
                visited.add(i)
                dfs(depth + 1)
                path.pop()
                visited.delete(i)
            }
        }
    }
    dfs(0)
    return Array.from(result)
}

/**
左旋转字符串
[题目来源](https://leetcode-cn.com/problems/zuo-xuan-zhuan-zi-fu-chuan-lcof/)
*/

const reverseLeftWords = function (s, n) {
    return s.slice(n) + s.slice(0, n)
}
