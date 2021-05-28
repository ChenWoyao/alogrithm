const log = console.log.bind(console)

/**
 * 滑动窗口，动态规划，分治法，回朔法，单调栈，深度遍历dfs,
 * 给定一个非空字符串 s 和一个包含非空单词的列表 wordDict，判定 s 是否可以被空格拆分为一个或多个在字典中出现的单词。
 * s, wordDict
 * s -> s'
 * s = "catsandog", wordDict = ["cats", "dog", "sand", "and", "cat"]
 */

/**
 * 回朔法
 * 探索与回溯法）是一种选优搜索法，又称为试探法，按选优条件向前搜索，以达到目标。但当探索到* 某一步时，发现原先选择并不优或达不到目标，就退回一步重新选择，这种走不通就退回再走的技术* 为回溯法
 * 试探性一步一步的看能否到达终点。
 * 如果下一步是死路就悔棋，返回上一次操作，继续重复试探操作。
 * leetcode {
 *  l->le->lee->leet
 *  code
 *  c->o->d->e
 * }
 */

const wordBreak = (s, wordDict) => {
    const len = s.length
    const wordSet = new Set(wordDict)
    const memo = new Array(len)
    const result = []
    const ans = []
    const canBreak = start => {
        if (start == len) {
            result.push(ans.join(' '))
            return true
        }
        if (memo[start] !== undefined) return memo[start]
        for (let i = start + 1; i <= len; i++) {
            const prefix = s.slice(start, i)
            // 当前的路能走, 下一步有活路
            if (wordSet.has(prefix) && canBreak(i)) {
                ans.push(prefix)
                memo[start] = true
                return true
            }
            memo[start] = false
        }
        return false
    }
    canBreak(0)
    return result
}
// const wordBreak = function(s, wordDict) {
//     let window = ''
//     let result = []
//     const ans = []
//     // o(N)
//     if (!(wordDict.every(word => s.includes(word)))) {
//         return false
//     }
//     if (wordDict.some(word => word.includes(s))) {
//         return true
//     }
//     for (let i = 0; i < s.length; i++) {
//         window += s[i]
//         if (wordDict.includes(window)) {
//             ans.push(window)
//         }
//     }
//     while (ans.length) {
//         const start = ans.pop()
//         const news = s.slice(s.indexOf(start) + 1)
//         result.push(wordBreak(news, wordDict))
//         if (result.every(item => item)) { return true }
//         result = []
//     }
//     return false
// }

const s1 = 'leetcode', wordDict1 = ['leet', 'code']
const s2 = 'applepenapple', wordDict2 = ["apple", "pen"]
const s3 = 'catsandog', wordDict3 = ["cats", "dog", "sand", "and", "cat"]

log(wordBreak(s1, wordDict1))
log(wordBreak(s2, wordDict2))
log(wordBreak(s3, wordDict3))

