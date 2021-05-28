const log = console.log.bind(console)

/**
 * queue1: [1, 2, 3, 4, 5]
 * queue2: [4, 3, 5, 1, 2]
 * 求队列queue1的可能出栈顺序, queue是否在里面
 * 思路：
 * 借助辅助栈，将queue1的元素往里面放，知道遇到queue2首元素
 * 比如queue2的首元素是4, 4不再辅助栈中
 * 从queue1中将[1, 2, 3, 4]放入辅助栈, queue1为[5]
 * 弹出4
 * queue2首元素为3，是辅助栈的栈顶元素可以弹出
 * 遇到5不是辅助栈中栈顶，就从剩余队列中压元素直到遇到5
 * 因此如果剩余队列没有将要弹出的元素且要弹出的元素不是辅助栈的栈顶元素那
 * 那就是错误的
 */

const isPopOrder = (pushList, popList) => {
    let possible = false
    let stackData = []
    let clonePopList = [...popList]
    let clonePushList = [...pushList]
    if (pushList.length !== popList || pushList === null || popList === null) {
        return possible
    }
    while (clonePopList.length) {
        let val = clonePopList.pop()
        if (stackData.slice(-1)[0] !== val) {
            if (clonePushList.length) {
                while (clonePushList.length) {
                    if (clonePushList[0] !== val) {
                        stackData.push(clonePushList.pop())
                    } else {
                        stackData.push(clonePushList.pop())
                        stackData.pop()
                        break
                    }
                }
            } else {
                break
            }
        } else {
            stackData.pop()
        }
    }
    if (stackData.length === 0 && clonePopList.length === 0) {
        possible = true
    }
    return possible
}

/**
 * 从上到下从左到右打印二叉树
 * 思路：树的层次遍历
 *      8
 *     / \
 *    1   2
 *   / \ / \
 *  3  4 5  6
 */

const printFromTopToBottom = tree => {
    if (!tree) return
    let result = []
    let floor = []
    let temp = []
    floor.push(tree.root)
    result.push(floor)
    temp.push(floor)
    while (temp.length) {
        let level = temp.pop()
        while (level.length) {
            let node = level.pop()
            if (node.left) {
                floor.push(floor.left)
            }
            if (node.right) {
                floor.push(floor.right)
            }
        }
        if (floor.length) {
            temp.push(floor)
            result.push(floor)
            floor = []
        }
    }
    result.reduce((accumlate, arrItem) => [...accumlate, ...arrItem])
}

/**
 * BST, 左子树的节点都小于根节点，右子树的节点都大于根节点
 * 一直一个遍历，判断是否为BST树的后序遍历
 *         8
 *        / \
 *       6  10
 *      / \ / \
 *     5  7 9  11
 * [5, 7, 6, 9, 11, 10, 8]
 * 8, [5, 7, 6], [9, 11, 10]
 * 6, [5], [7]
 * 9, [11], [10]
 */
const VerifyQueueOfBST = (queue) => {
    let len = queue.length
    if(queue === null || len <= 0) {
        return false
    }
    let root = queue.slice(-1)[0]
    // 左子树小于根节点
    let i = queue.findIndex(item => item > root)
    i = i > 0 ? i : 0
    // 右子树的节点都要大于根节点
    for(let j = i; j < len - 1; j++) {
        if(queue[j] < root) {
            return false
        }
    }
    let left = true
    if(i > 0) {
        left = VerifyQueueOfBST(queue.slice(0, i))
    }
    let right = true
    if (i < len - 1) {
        right = VerifyQueueOfBST(queue.slice(i))
    }
    return left && right
}
