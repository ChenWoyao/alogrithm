const log = console.log.bind(console)

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

/**
 在上次打劫完一条街道之后和一圈房屋后，小偷又发现了一个新的可行窃的地区。
 这个地区只有一个入口，我们称之为“根”。 除了“根”之外，
 每栋房子有且只有一个“父“房子与之相连。一番侦察之后，
 聪明的小偷意识到“这个地方的所有房屋的排列类似于一棵二叉树”。 如果两个直接相连的房子在同一天晚上被打劫，房屋将自动报警。
 计算在不触动警报的情况下，小偷一晚能够盗取的最高金额。

 输入: [3,2,3,null,3,null,1]

     3
    / \
    2  3
    \   \
     3   1

输出: 7
解释: 小偷一晚能够盗取的最高金额 = 3 + 3 + 1 = 7.


输入: [3,4,5,1,3,null,1]

     3
    / \
   4   5
  / \   \
 1   3   1

输出: 9
解释: 小偷一晚能够盗取的最高金额 = 4 + 5 = 9.

输入： [4,1,null,2,null,3]
      4
     / \
    1  null
   /
  2
 /
3
 */

 /**
    思路:
    [3,2,3,null,3,null,1]
        {
            3 -> 3 -> 1
            2 -> 1
            3 -> 3
        }
    [3,4,5,1,3,null,1]
        {
            3 -> 1
            3 -> 3
        }
    => [[3], [4, 5], [1, 3, 1], [5, 7, 9, 8], [7, 7]]
    => [3, 9, 5, 19, 14]
    =>
    {
        [3, 5], [3, 19], [3, 14],
        [3, 5, 14]
        [3, ]
    }
    f(3) = g(9)
    g(9) = [5, 9, 14]

    f(9) = g(5)
    g(5) = [19, 14]

    f(n) = g(k)
    val in g(k) do f(val)
  */

  /**
   * 当 oo 被选中时，oo 的左右孩子都不能被选中，
   * 故 oo 被选中情况下子树上被选中点的最大权值和为 ll 和 rr 不被选中的最大权值和相加，即 f(o) = g(l) + g(r)f(o)=g(l)+g(r)。
    当 oo 不被选中时，oo 的左右孩子可以被选中，也可以不被选中。对于 oo 的某个具体的孩子 xx，它对 oo 的贡献是 xx 被选中和不被选中情况下权值和的较大值。故 g(o) = \max \{ f(l) , g(l)\}+\max\{ f(r) , g(r) \}g(o)=max{f(l),g(l)}+max{f(r),g(r)}。
   */

// f(o) 表示选择 oo 节点的情况下, o 节点的子树上被选择的节点的最大权值和
// g(o) 表示不选择 oo 节点的情况下, o 节点的子树上被选择的节点的最大权值和

var rob = function(root) {
    if (!root) return 0
    function f(node) {
        if (!node) return 0
        if (node && !node.left && !node.right) return node.val
        return node.val + g(node.left) + g(node.right)
    }
    function g(node) {
        if (!node) return 0
        return Math.max(f(node.left), g(node.left)) + Math.max(f(node.right), g(node.right))
    }
    log('f(3)', f(root))
    log('g(3)', g(root))
    log('f(4)', f(root.left))
    log('g(4)', g(root.left))
    log('f(5)', f(root.right))
    log('g(5)', g(root.right))
    log('f(1)', f(root.left.left))
    log('g(1)', g(root.left.left))
    log('f(3)', f(root.left.right))
    log('g(3)', g(root.left.right))
    log('f(1)', f(root.right.right))
    log('g(1)', g(root.right.right))
    return Math.max(f(root), g(root))
}

// 测试：
const root = new TreeNode(3)
root.left = new TreeNode(4)
root.right = new TreeNode(5)
root.left.left = new TreeNode(1)
root.left.right = new TreeNode(3)
root.right.right = new TreeNode(1)

log(rob(root))
