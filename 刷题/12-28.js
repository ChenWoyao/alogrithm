const log = console.log.bind(console)


/*
    二叉树的深度:
    方法一: 层次遍历
    方法二: 如果根结点只有左子树而没有右子树，那么树的深度应该是其左子树的深度加1；同样如果根结点只有右子树而没有左子树，那么树的深度应该是其右子树的深度加1。如果既有右子树又有左子树，那该树的深度就是其左、右子树深度的较大值再加1
*/

class TreeNode {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor() {
        this.root = null;
        this.left = null;
        this.right = null;
    }
}

let tree = new Tree();
tree.root = new TreeNode(1)
tree.root.left = new TreeNode(2)
tree.root.right = new TreeNode(3)
tree.root.left.left = new TreeNode(4)
tree.root.left.right = new TreeNode(5)
tree.root.left.right.left = new TreeNode(7)
tree.root.right.right = new TreeNode(6)

let depth = 0
const treeDepth = (rootNode) => {
    let left = rootNode.left
    let right = rootNode.right
    let dl = 0
    let dr = 0
    if (left)  {
        dl = treeDepth(left)
    }
    if (right) {
        dr = treeDepth(right)
    }
    return Math.max(dl, dr) + 1
}

const treeDepth2 = (rootNode) => {
    const levels = [[rootNode]]
    let temp = []
    const result = []
    while(levels.length) {
        let level = levels.pop()
        result.push(level)
        const cloneLevel = [...level]
        while (cloneLevel.length) {
            let node = cloneLevel.pop()
            if (node.left) temp.push(node.left)
            if (node.right) temp.push(node.right)
        }
        if (temp.length) {
            levels.push(temp)
            temp = []
        }
    }
    return result.length
}

// log(treeDepth(tree.root))
log(treeDepth2(tree.root))

const FindFirstBitIs1 = num => {
    let indexBit = 0
    while(((num & 1) == 0))
}

var singleNumber = function(nums) {
    for (var i = 1; i < nums.length; i++) {
      nums[0] = nums[0] ^ nums[i];    // 把所有的元素都异或到nums[0]上。
    }
    return nums[0];
  };

/**
 * 把n个骰子扔在地上，所有骰子朝上一面的点数之和为s。输入n，* 打印出s的所有可能的值出现的概率。
 * 最小值： n
 * 最大值: 6n
 * => 数组的长度: 6n - n + 1
 * 总共有6^n中可能
 * 和为s的点数出现的次数保存到数组第s-n个的下标
 * 思路一:
 *  分成2堆，第一堆1个筛子，剩下的n-1个筛子
 */

let maxvalue = 6
/** number 为要找的数字 */
const printProbability = number => {
    if (number < 1) return
    let maxsum = number * maxvalue
    let probabilities = new Array(maxsum - maxvalue + 1).fill(0)
    probability(number, probabilities)
    let total = maxvalue ^ number
    for (let i = number; i <= maxsum; i++) {
        let ratio = probabilities[i - number] / total
        log(`${i}:出现的概率是:${ratio}`)
    }
}

const probability = (number, probabilities) => {
    const prob = (origin ,current, sum, probabilities)  => {
        if (current == 1) {
            probabilities[sum - origin]++
        } else {
            for(let i = 1; i <= maxvalue; i++) {
                prob(origin, current - 1, i + sum, probabilities)
            }
        }
    }
    for (let i = 0; i < number; i++) {
        prob(number, number, i , probabilities)
    }
}
