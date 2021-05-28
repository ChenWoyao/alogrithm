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
 * 序列化和反序列化二叉树
 * 序列化：树->字符串类表
 */

let testTree = new Tree()
testTree.root = new Node(1)
testTree.root.left = new Node(2)
testTree.root.right = new Node(3)
testTree.root.left.left = new Node(4)
testTree.root.right.left = new Node(5)
testTree.root.right.right = new Node(6)

const serializeWrap = (result, root) => {
    const serialize = (root) => {
        if (root === null) {
            result += '$,'
            return
        }
        result += `${root.val},`
        serialize(root.left, result)
        serialize(root.right, result)
    }
    serialize(root)
    return result
}


const DeserializeWrap = (tree, stream) => {
    log('start', tree)
    const Deserialize = (node) => {
        // node是Object，那就是值引用
        // let a = [1, 2, 3];
        // let b = a
        // a = [3, 4, 5] => b = [1, 2, 3]
        // 把a， b看做指针就对了
        log(node === tree.root)
        let num = stream.slice(0, 1)
        stream = stream.substring(2)
        log('stream', stream)
        if (num !== '$') {
            node = new Node(num)
            log('node', node, tree)
            Deserialize(node.left)
            Deserialize(node.right)
        }
    }
    Deserialize(tree.root)
    log('result', tree)
}

const resultTree = new Tree(new Node(null))
DeserializeWrap(resultTree, serializeWrap('', testTree.root))
log('end', resultTree)
