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
# 合并二叉树
[题目来源](https://leetcode-cn.com/problems/merge-two-binary-trees/)
## 思路
节点root1存在 & 节点root2存在 => 两个相加
节点root1存在 | 节点root2存在 => root1 | root2
否则 => null
*/


const mergeTrees = (root1, root2) => {
    let val = null
    if (!root1 && !root2) return null
    if (root1 && root2) {
        val = root1.val + root2.val
    } else if (root1 || root2) {
        val = (root1 && root1.val) || (root2 && root2.val)
    }
    const node = new TreeNode(val)
    const root1l = root1 ? root1.left : null
    const root1r = root1 ? root1.right : null
    const root2l = root2 ? root2.left : null
    const root2r = root2 ? root2.right : null
    node.left = mergeTrees(root1l, root2l)
    node.right = mergeTrees(root1r, root2r)
    return node
}


/**
# 翻转二叉树
[题目来源](https://leetcode-cn.com/problems/invert-binary-tree/)
## 思路
就是求一颗树的镜像
节点root存在左子树，将其左子树变成节点的右子树
节点root存在右子树，将其右子树变成节点的左子树
*/

const invertTree = (root) => {
    if (!root || (!root.left && !root.right)) return root
    const lchild = root.left
    const rchild = root.right
    root.left = rchild
    root.right = lchild
    root.left && invertTree(root.left)
    root.right && invertTree(root.right)
    return root
}

/**
# 二叉树的最大深度
[题目来源](https://leetcode-cn.com/problems/maximum-depth-of-binary-tree/)
思路：
1. dfs深度遍历每条路径即可
2. 层次遍历
*/
const maxDepth = root => {
    let result = 0
    const path = []
    if (!root) return result
    const goLevel = node => {
        path.push(node.val)
        if (!node.left && !node.right) {
            result = Math.max(result, path.length)
            return
        }
        // 下一步往左走
        node.left && goLevel(node.left)
        // 本次的结果
        node.left && path.pop()
        // 下一步往右走
        node.right && goLevel(node.right)
        // 本次的结果
        node.right && path.pop()
    }
    goLevel(root)
    return result
}

/**
# 二叉树的中序遍历
[题目来源](https://leetcode-cn.com/problems/binary-tree-inorder-traversal/)
思路：
下一步按照有左选左，没左选右，并记录本次没有左选择的结果，没左没右就结束。
depth0:  有左选左，没左选右, 并记录
depth1:  有左选左，没左选右, 并记录
  .
  .
no choice: 结束
*/

const inorderTraversal = root => {
    const path = []
    const dfs = node => {
        if (!node) return
        // 本次决定下一步选择走左
        node.left && dfs(node.left)
        path.push(node.val)
        // 本次决定下一步选择走右
        node.right && dfs(node.right)
    }
    dfs(root)
    return path
}

/**
# 二叉树展开为链表
[题目来源](https://leetcode-cn.com/problems/flatten-binary-tree-to-linked-list/)
思路：
对每个节点做了如下处理：左子树变成右子树，右子树变成转变后右子树的最右节点, 该节点的左子树为空
*/
const flatten = root => {
    const searize = node => {
        if (!node) return
        const lchild = node.left
        const rchild = node.right
        node.right = lchild
        node.left = null
        let p = node
        while (p) {
            if (p.right === null) break
            p = p.right
        }
        p.right = rchild
        searize(node.right)
    }
    searize(root)
}

/**
# 从前序和中序遍历序列构造二叉树
[题目来源](https://leetcode-cn.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/)
思路: 分治法，拆拆拆。
前序可以得出数组首元素是根元素
中序可以得到左子树和右子树
*/
const buildTree = (preorder, inorder) => {
    if (inorder.length === 0) return null
    const nodeVal = preorder[0]
    let node = null
    let index = inorder.indexOf(nodeVal)
    inorder.indexOf(nodeVal)
    node = new TreeNode(nodeVal)
    node.left = buildTree(preorder.slice(1, index + 1), inorder.slice(0, index))
    node.right = buildTree(preorder.slice(index + 1), inorder.slice(index + 1))
    return node
}

/**
# 不同的二叉搜索树
[题目来源](https://leetcode-cn.com/problems/unique-binary-search-trees/)
思路1：
dfs的回溯能求出所有的组合然后对搜有的组合进行判断是否是二叉搜索树，这种显然很耗时间
而且特别复杂，在这里总结出了如果有很多种选择的可能，或者逻辑点很多的不要使用回溯，会头痛死
思路二:
看了官方的动态规划，嗐，感慨还是动态规划好。不要有了新欢就忘了旧爱.....
定义公式：
G(n): 长度为n的序列能构成的不同二叉搜索树的个数。
F(i,n): 以i为根，序列长度为n的不同二叉搜索树个数(1 <= i <= n)
则:
G(n) = F(1, n) + .... + F(n, n)
依次遍历{1..n},当以作为根节点时候将1...(i - 1)作为左子树，i + 1...n 作为右子树
其中: G(0)=1, G(1)=1
这个遍历的时候有F(i, n) = 左:G(i - 1) * 右: G(n - i)
因为：G(n) = F(1, n) + .... + F(n, n)， F(i, n) = G(i - 1) * G(n - i)
所以: G(n) = G(1 - 1) * G(n - 1) + ... + G(n - 1) * G(0)
*/

const numTrees = n => {
    const G = new Array(n + 1).fill(0)
    let temp = 0
    G[0] = 1
    G[1] = 1
    for (let i = 2; i <= n; i++) {
        for (let j = 1; j <= i; j++) {
            // 长度为i的集合 = 以j为根长度为i的总集合
            // G[i] = G[i] + F(j, i)
            G[i] = G[i] + G[j - 1] * G[i - j]
        }
    }
    return G[n]
}
