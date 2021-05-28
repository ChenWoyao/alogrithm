function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)

    this.toString = () => {
        let stack = [this.val]
        let p = this.next
        while(p) {
            stack.push(p.val)
            p = p.next
        }
        return stack
    }
}

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

function partition(arr, start, end) {
    const pivotValue = arr[end]
    let pivotIndex = start
    for (let i = start; i < end; i++) {
        if (arr[i] < pivotValue) {
            [arr[i], arr[pivotIndex]] = [arr[pivotIndex], arr[i]]
            pivotIndex++
        }
    }
    [arr[pivotIndex], arr[end]] = [arr[end], arr[pivotIndex]]
    return pivotIndex
}

// 先序遍历的非递归方法
var preorderTraversal = function(root) {
    let stack = [];
    let result = [];
    if (!root) { return result; }
    stack.push(root);
    while(stack.length) {
        let node = stack.pop();
        if(node.right) {
            stack.push(node.right)
        }
        if(node.left) {
            stack.push(node.left)
        }
        result.push(node.val)
    }
}
// 后序遍历的非递归方法
var postorderTraversal = function(root) {
    let stack = [];
    let result = [];
    if (!root) { return result; }
    stack.push(root);
    while(stack.length) {
        let node = stack.shift();
        result.unshift(node.val)
        if(node.left) {
            stack.unshift(node.left)
        }
        if(node.right) {
            stack.unshift(node.right)
        }
    }
}



/*
Map:
size,clear,
set, has, get, keys, values, entries, forEach
*/
/*
Set:
size,add,clear,delete, entries,has,forEach
keys,values,
*/

const fs = require('fs')
const path = require('path')
const log = console.log.bind(console)

const dirPath = ''
const resultPath = ''
const result = []

const writeImageToDirectory = (dirPath, resultPath) => {
    const files = fs.readdirSync(dirPath)
    files.forEach(async function(file) {
        const filePath = path.resolve(dirPath, file)
        fs.stat(filePath, (err, stats) => {
            if (err) throw err
            if (stats.isFile()) {
                if (file.endsWith('.png')) {
                    fs.writeFileSync(path.join(resultPath, file), fs.readFileSync(filePath))
                }
            }
            if (stats.isDirectory()) {
                writeImagesToDirectory(filePath)
            }
        })
    })
    return result
}


writeImageToDirectory(dirPath, resultPath)

const createArr = (n) => {
    return Array.from({'length': n}, (v, i) => i + 1)
}

const createMatrix = (m, n) => {
    return Array.from(new Array(m), (item) => new Array(n).fill(0))
}

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
        /** 这里很坑, ans是一个引用, 每次都会清空 */
        ans.length && levels.push(ans) && result.push(ans.slice())
    }
    return result.reduce((acc, level) =>
        acc.concat(
            level.map(node => node ? node.val : null
        )),
    [])
}

// js中关于对象的赋值问题
// 想得到一个值做为key
function setKeyOfObj(keyValue, newValue, obj) {
    return {
        ...obj,
        [keyValue]: 'newValue'
    }
}


/**
     * @param {*} u 当前遍历到的数字
     * @param {*} ans 最终结果集
     * @param {*} cur 当前结果集
     * @param {*} sum 当前结果集的总和
     * @param {*} n 期望的路径和
     */
function dfs(u, ans, cur, sum, n) {
    if (sum === n && cur.length === k) {
        ans.push(cur.slice());
        return;
    }
    if (u == 10 || sum > n || cur.length > k) return;
    cur.push(u);
    // 计算cur中有u的组合
    dfs(u + 1, ans, cur, sum + u, n);
    cur.pop();
    // 计算cur中没有u的组合
    dfs(u + 1, ans, cur, sum, n);
}

