const log = console.log.bind(console)
/*
 已知二叉树的一个结点，求二叉树中序遍历该节点的下一个节点
 三种情况：
 1. 该节点是左叶子节点。下一个是它的父节点
 2. 该节点有右子树，下一个是遍历右子树找到右子树的左子节点
 3. 该节点是右叶子节点，则一直往上找，找到一个节点是它父节点的左子节点。如果找到根节点还没有找到就是没有下一个节点
*/

const getNext = (node) => {
  if (node === null) {
    return null
  }
  let next = null
  if (node.right !== null) {
    let now = node.right
    while(now) {
      now = now.left
      next = now
    }
  } else if(node.parent !== null) {
    let now = node
    let parent = node.parent
    while (parent !== null && now === parent.right) {
      now = parent
      parent = parent.parent
    }
    next = parent
  }
  return next
}

/*
 两个栈实现队列
 push -> pop -> push -> pop
*/

class queue {
  constructor() {
    // push, pop
    this.stack1 = []
    this.stack2 = []
  }
  append(el) {
    this.stack1.push(el)
  }
  delete() {
    if (this.stack2.length === 0) {
      while (this.stack1.length > 0) {
        let el = this.stack1.pop()
        this.stack2.push(el)
      }
    }
    // stack1为空，stack2为空
    if (this.stack2.length === 0) {
      throw error('queue is empty')
    }
    return this.stack2.pop()
  }
}


/*
两个队列实现栈
每次保持一个队列只有一个元素，删除即使删除该队列。
然后调整另一个队列，使得这个队列只剩下一个元素
最多可存储一个队列长度加一的容量
*/
class stack {
  constructor() {
    // push, shift
    this.queue1 = []
    this.queue2 = []
  }
  append(el) {
    if (this.queue1.length === 1) {
      let old = this.queue1.shift()
      this.queue2.push(old)
      this.queue1.push(el)
    } else if (this.queue2.length === 1) {
      let old = this.queue2.shift()
      this.queue1.push(old)
      this.queue2.push(el)
    } else if (this.queue1.length < 1) {
      this.queue1.push(el)
    } else if (this.queue2.length < 1) {
      this.queue2.push(el)
    }
  }
  delete() {
    if (this.queue1.length === 1) {
      return this.queue1.shift()
    } else if (this.queue2.length === 1) {
      return this.queue2.shift()
    }
  }
}

let arr = [2, 1]
let s = new stack()
while (arr.length) {
  s.append(arr.shift())
}

function fibonacci(n) {
  let result = [0, 1]
  if (n < 2) {
    return result[n]
  }
  let fb1 = 1
  let fb2 = 0
  let fbn = 0
  for (let i = 2; i <= n; i++) {
    fbn = fb1 + fb2 // 4=3+2;5=4+3;3=2+1
    fb2 = fb1 // 上上次
    fb1 = fbn // 上次
  }
  return fbn
}


function sortAges(ages, len) {
  if (ages === null || len <= 0) {
    return
  }
  const oldestAge = 99
  let timesOfAge = new Array(oldestAge + 1)
  for (let i = 0; i <= oldestAge; i++) {
    timesOfAge[i] = 0
  }
  for (let i = 0; i < len; i++) {
    let age = ages[i]
    if (age < 0 || age > oldestAge) {
      throw error('age out of range')
    }
    timesOfAge[age]++
  }
  let index = 0
  for (let i = 0; i <= oldestAge; i++) {
    for (let j = 0; j < timesOfAge[i]; j++) {
      ages[index] = i
      ++index
    }
  }
}

const swap = (arr, i, j) => {
  let swap = arr[i]
  arr[i] = arr[j]
  arr[j] = swap
}


const heapify = (arr, i) => {
  let len = arr.length
  let largest = i
  let left = 2 * i + 1
  let right = 2 * i + 2
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

const buildMaxHeap = (arr) => {
  for(let i = Math.floor(arr.length / 2); i >= 0; i -= 1) {
    heapify(arr, i)
  }
}

arr = [3, 2, 1, 5, 6, 4]
buildMaxHeap(arr)
log(arr)
