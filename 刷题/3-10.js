const log = console.log.bind(console)

/**
 * 无重复字符的最长子串
 * 给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。
 */
// 输入: s = "abcabcbb"
// 输出: 3
// 解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。

// 输入: s = "pwwkew"
// 输出: 3
// 解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
//      请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。

// 输入: s = ""
// 输出: 0

// 输入: s = "bbbbb"
// 输出: 1
// 解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。

/**
 * 思路：从开始往下走，遇到重复的以后，断掉上一个重复的坐标点继续往下走。不断比较更新最大max
 */

var lengthOfLongestSubstring = function(s) {
    // abc-bca-cab-abc-cb-b
    // pw-wke-kew
    // b-b-b-b-b
    let maxLength = 0
    let start = 0
    let newStart
    let subStr = ''
    if (s.length === 1) return 1
    function getNext(s, start) {
        let str = s.slice(start, start + 1)
        let index = start
        for (let i = start + 1; i < s.length; i++) {
            let char = s[i]
            if (!str.includes(char)) {
                str += char
            } else {
                index = s.slice(0, i).lastIndexOf(char)
                break
            }
        }
        return [index + 1, str]
    }
    while(start < s.length - 1) {
        [newStart, subStr] = getNext(s, start)
        if (subStr.length > maxLength) {
            maxLength = subStr.length
        }
        if (newStart === start) {
            break
        } else {
            start = newStart
        }
    }
    return maxLength
}

// log(lengthOfLongestSubstring("abcabcbb"))
// log(lengthOfLongestSubstring("pwwkew"))
// log(lengthOfLongestSubstring("bbbbb"))
// log(lengthOfLongestSubstring(""))
// log(lengthOfLongestSubstring("     "))

/**
 * 合并二叉树
 */
// 给定两个二叉树，想象当你将它们中的一个覆盖到另一个上时，两个二叉树的一些节点便会重叠。
// 你需要将他们合并为一个新的二叉树。合并的规则是如果两个节点重叠，那么将他们的值相加作为节点合并后的新值，否则不为 NULL 的节点将直接作为新二叉树的节点。

// 输入:
// 	Tree 1                     Tree 2
//           1                         2
//          / \                       / \
//         3   2                     1   3
//        /                           \   \
//       5                             4   7
// 输出:
// 合并后的树:
// 	     3
// 	    / \
// 	   4   5
// 	  / \   \
// 	 5   4   7

function TreeNode(val, left, right) {
    this.left = (left === undefined ? null : left)
    this.val = (val === undefined ? 0 : val)
    this.right = (right === undefined ? null : right)
    this.toString = () => {
        const root = this
        const levels = [[root]]
        let result = [root]
        while (levels.length) {
            const level = levels.pop()
            const ans = []
            while (level.length) {
                const node = level.pop()
                node.left && ans.push(node.left)
                node.right && ans.push(node.right)
            }
            ans.length && levels.push(ans) && (result = result.concat(ans.slice()))
        }
        return result.reduce((acc, node) =>
                acc.concat([node ? node.val : 'null']),
                [])
    }
}

var mergeTrees = function(root1, root2) {
    if (!root1 && !root2) {
        return null
    }
    let val
    if (root1 && root2) {
        val = root1.val + root2.val
    } else if (root1 || root2) {
        val = (root1 && root1.val) || (root2 && root2.val)
    } else {
        val = null
    }
    let newNode = new TreeNode(val)
    if (newNode) {
        newNode.left = mergeTrees((root1 ? root1.left : null), (root2 ? root2.left : null))
        newNode.right = mergeTrees((root1 ? root1.right : null), (root2 ? root2.right : null))
    }
    return newNode
}

// [3,4,5,1,2,null,null,0] [4,1,2]
const tree1 = new TreeNode(3)
tree1.left = new TreeNode(4)
tree1.right = new TreeNode(5)
tree1.left.left = new TreeNode(1)
tree1.left.right = new TreeNode(2)
tree1.left.left.left = new TreeNode(0)

const tree2 = new TreeNode(4)
tree2.left = new TreeNode(1)
tree2.right = new TreeNode(2)

let result = mergeTrees(tree1, tree2)

log(result.toString())
