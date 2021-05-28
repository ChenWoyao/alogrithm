const log = console.log.bind(console)
/* 重建二叉树：已知先序和中序
   firstOrder: root left right
   =>
   root = arr[0]
   middleOrder: left root right
   //
   =>
   left = arr.slice(0, rootIndex) => mid
   right = arr.slice(rootIndex) => mid
*/

class Node {
  constructor(val) {
    this.root = val
    this.left = null
    this.right = null
  }
}

const rebuildBinaryTree = (firstOrder, middleOrder) => {
  if (firstOrder.length < 1) {
    return new Node(null)
  }
  if (firstOrder.length === 1) {
    return new Node(firstOrder[0])
  }
  let root = firstOrder[0]
  let rootIndex = middleOrder.findIndex(item => item === root)
  let middleLeft = middleOrder.slice(0, rootIndex)
  let middleRight = middleOrder.slice(rootIndex + 1)
  let firstLeft = firstOrder.slice(1, 1 + middleLeft.length)
  let firstRight = firstOrder.slice(1 + middleLeft.length)
  let node = new Node(root)
  node.left = rebuildBinaryTree(firstLeft, middleLeft)
  node.right = rebuildBinaryTree(firstRight, middleRight)
  return node
}


arr1 = [1, 2, 4, 7, 3, 5, 6, 8]
arr2 = [4, 7, 2, 1, 5, 3, 8, 6]

log(rebuildBinaryTree(arr1, arr2))

