const log = console.log.bind(console)

class Tree {
    constructor(node) {
        this.root = node
        this.left = null
        this.right = null
    }
}

class Node {
    constructor(val) {
        this.val = val
        this.left = null
        this.right = null
    }
}

/**
 * 二叉树中和为某一值的路径
 * 输入一颗二叉树和一个整数，打印二叉树中节点值的和为输入整数的所有路径
 * 路径：必须从头结点开始到一个叶子节点结束
 * 思路：先序遍历中存节点，回退的时候删节点
 */

const findPath = (tree, target) => {
    const stack = []
    const result = []
    if (!tree) return []
    getWay(tree.root, target, stack, result)
    log('reslut', result)
}

const getWay = (rootNode, target, stack, result) => {
    if (rootNode === null) return
    stack.push(rootNode.val)
    if (rootNode.left === null && rootNode.right === null) {
        const sum = stack.reduce((acc, val) => acc + val, 0)
        log('sum', sum, stack)
        if (sum === target) {
            result.push(stack.join(','))
        }
    }
    rootNode.left = getWay(rootNode.left, target, stack, result)
    rootNode.right = getWay(rootNode.right, target, stack, result)
    // 当前节点左右走完了，开始回溯，栈删除当前节点
    if (stack.slice(-1)[0] === rootNode.val) {
        stack.pop()
    }
}

let test1Tree = new Tree(new Node(10))
test1Tree.root.left = new Node(5)
test1Tree.root.right = new Node(12)
test1Tree.root.left.left = new Node(4)
test1Tree.root.left.right = new Node(7)

findPath(test1Tree, 22)

/**
 * 分治法：大问题化成小问题，一般与递归有关
 */

/**
 * 复杂链表的复制
 */
class List {
    constructor() {
        this.head = null;
        this.next = null;
    }
}

class ListNode {
    constructor(val) {
        this.next = null; // 下一个节点
        this.sibling = null; // 任意一个节点
        this.val = val;
    }
}

const cloneNodes = list => {
    let cloneList = new List();
    let node = list.head
    while(node !== null) {
        cloneList.val = node.val
        cloneList.next = node.next
        cloneList.sibling = null
        node.next = cloneList
        node = cloneList.next
    }
}

const connectSiblingNodes = (list) => {
    let node = list.head
    while(node !== null) {
        cloneNode = node.next
        if (node.sibling !== null) {
            cloneNode.sibling = node.sibling.next
        }
        node = cloneNode.next
    }
}

const reConnectNodes = list => {
    let node = list.head
    let cloneList = null
    let cloneNode = null
    if (node !== null) {
        cloneList.head = node.next
        cloneNode = node.next
        node = node.next
    }
    while(node !== null) {
        cloneNode.next = node.next
        cloneNode = cloneNode.next
        node.next = cloneNode.next
        node = node.next
    }
    return cloneList
}


const cloneList = (list) => {
    cloneNodes(list)
    connectSiblingNodes(list)
    return reConnectNodes(list)
}

/**
 * 二叉搜索树转换成一个排序的双向链表
 * 不能创建任何新的节点
 */
/**
1.递归左子树，找到左子树的最后一个节点，根节点左侧连接到左子树的最后一个节点
2.当前节点变为已经转换完成的链表的最后一个节点
3.递归右子树，找到当前树的最后一个节点
4.回溯到上一层，进行链接...
*/

function Convert(pRootOfTree) {
    if (!pRootOfTree) {
      return null;
    }
    ConvertCore(pRootOfTree);
    // 走到双向链表头结点
    while (pRootOfTree.left) {
      pRootOfTree = pRootOfTree.left;
    }
    return pRootOfTree;
  }

  /**
   *   6
   *  / \
   * 4   8
   * node: 6, last: 4
   * 6.left = 4; 4.right = 6
   * node: 8, last: 6
   * ....
   */
  function ConvertCore(node, last) {
    // 左
    if (node.left) {
      // last是当前节点的上一个节点
      last = ConvertCore(node.left, last)
    }
    // 中
    node.left = last;
    if (last) {
      last.right = node;
    }
    // 当前节点变成上一个节点
    last = node;
    // 右
    if (node.right) {
      last = ConvertCore(node.right, last);
    }
    return last;
  }


