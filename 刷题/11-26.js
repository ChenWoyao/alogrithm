const log = console.log.bind(console)

mergeTwoSortedList = (l1, l2) => {
  if (!l1 || !l2) {
    return null
  }
  let p = l1.head
  let q = l2.head
  let tag = p.val < q.val ? 'l1' : 'l2'
  while (p && q) {
    let now
    if (p.val < q.val) {
      now = p
      p = p.next
      now.next = q
    } else {
      now = q
      q = q.next
      now.next = p
    }
  }
  if (p) {
    if (tag === 'l1') {
      return l1
    } else {
      q.next = p
      return l2
    }
  }
  if (q) {
    if (tag === 'l2') {
      return l2
    } else {
      p.next = q
      return l1
    }
  }
}

// a, b => b, a

const hasSubTree = (root1, root2) => {
  let result = false
  if (root1 && root2) {
    if (root1.val === root2.val) {
      result = DoesTree1HaveTree2(root1, root2)
    }
    if (!result) {
      result = hasSubTree(root1.left, root2)
    }
    if (!result) {
      result = hasSubTree(root1.right, root2)
    }
  }
  return result
}

const DoesTree1HaveTree2 = (tree1, tree2) => {
  if (tree2 === null) {
    return true
  }
  if (tree1 === null) {
    return false
  }
  if (tree1.val !== tree2.val) {
    return false
  }
  return DoesTree1HaveTree2(tree1.left, tree2.left) &&
    DoesTree1HaveTree2(tree1.right, tree2.right)
}

const getMirrorBinaryTree = (tree) => {
  if (tree.left || tree.right) {
    swap(tree, tree.left, tree.right)
  }
  if (tree.left === null && tree.right === null) {
    return
  }
  if (tree === null) {
    return
  }
  if (tree.left) {
    getMirrorBinaryTree(tree.left)
  }
  if(tree.right) {
    getMirrorBinaryTree(tree.right)
  }
}

const swap = (tree, left, right) => {
  // 拷贝不是引用
  tree.left = right
  tree.right = left
}

const equal = (tree1, tree2) => {
  if (tree1.val === tree2.val) {
    return equal(tree1.left, tree2.left) && equal(tree1.right, tree2.right)
  }
  if (!tree1 && !tree2) {
    return true
  }
  return false
}

const isMirrorTree = (tree) => {
  let mirrorTree = getMirrorBinaryTree(tree)
  return equal(tree, mirrorTree)
}

// [7, 7, 7, null, null, 7, null, null, 7, 7, null, null, null]
// [7, 7, null, 7, null, null, 7, 7, null, null, 7, null, null]

const isSymmertrical = root => {
  return (function adjust(root1, root2) {
    if (root1 === null && root2 === null) {
      return true
    }
    if(root1 === null || root2 === null) {
      return false
    }
    if (root1.val != root2.val) {
      return false
    }
    return adjust(root1.left, root2.right) && adjust(root1.right, root2.left)
  })(root, root)
}
