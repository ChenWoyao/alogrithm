// js log
const log = console.log.bind(console)

// 创建一个从1到n的自然序列
const createArr = (n) => {
    return Array.from({ 'length': n }, (v, i) => i + 1)
}

// 创建一个m行n列矩阵
const createMatix = (m, n)
    => Array.from(new Array(m), (item)
        => new Array(n).fill(0))

// js中关于对象的赋值
function setKeyOfObj(obj, variable, value) {
    return {
        ...obj,
        [variable]: value
    }
}

// 把树按层次遍历输出
const printTree = (root) => {
    if (!root) return []
    const levels = [[root]]
    const result = [[root]]
    while (levels.length) {
        const level = levels.pop()
        const ans = []
        while (level.length) {
            const node = level.pop()
            node.left && ans.push(node.left)
            node.right && ans.push(node.right)
        }
        ans.length && levels.push(ans) && result.push(ans.slice())
    }
    return result.reduce((acc, level) =>
        acc.concat(
            level.map(node => node ? node.val : null
            )),
        [])
}

// 堆调整
function heapify(arr, i) {
    let left = 2 * i + 1
    let right = 2 * i + 2
    let largest = i
    let len = arr.length
    if (left < len && arr[left] > arr[largest]) {
        largest = left
    }
    if (right < len && arr[right] > arr[largest]) {
        largest = right
    }
    if (largest != i) {
        swap(arr, i, largest)
        heapify(arr, largest)
    }
}

// 链表节点的序列化
function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)

    this.toString = () => {
        let stack = [this.val]
        let p = this.next
        while (p) {
            stack.push(p.val)
            p = p.next
        }
        return stack
    }
}
