const log = console.log.bind(console)

class Node {
  constructor(val) {
    this.val = val
    this.next = null
  }
}

class List {
  constructor() {
    this.head = null
    this.length = 0
    this.next = null
  }
}


const DeleteNode = (list, p) => {
  if (list.length === 0) {
    throw Error('p is not in list')
  }
  let before, now = list.head
  while (now !== p && now) {
    before = now
    now = now.next
  }
  if (now) {
    before.next = now.next
    now.next = null
  } else {
    throw Error('p is not in list')
  }
}

const DeleteDuplication = (pHead) => {
  if (pHead === null) return
  let preNode = null
  pNode = pHead
  while (pNode !== null) {
    pNext = pNode.next
    let needDelete = false
    if (pNext !== null && pNext.value === pNode.value) {
      needDelete = true
    }
    if (!needDelete) {
      preNode = pNode
      pNode = pNode.next
    } else {
      let value = pNode.valueOf()
      let beDel = pNode
      while (beDel && beDel.value === value) {
        pNext = beDel.next
        beDel = null
        beDel = pNext
      }
      if (preNode === null) {
        pHead = pNext
      } else {
        preNode.next = pNext
      }
      pNode = pNext
    }
  }
}


// A[.[B]][e|EC] or .B[e|EC]
// 分治法，动态规划，回朔法，贪婪，二分
// [a, b, c, d, e, f, g]
/*
* left = [a, b, c]
* right = [e, f, g]
* mergeSort(merge(left), merge(right))
* */

/* 奇数位于偶数的前面 */
// 两指针，[奇数,left,right,偶数]
// [1, 3, 2, 2, 1, 4, 1, 3, 5, 9]
// [1, 2]
const isEven = val => val % 2 !== 0
const isOdd = val => val % 2 === 0

const recorderOddEven = arr => {
  let len = arr.length
  if (!len) { return }
  let begin = 0
  let end = len - 1
  while(begin < end) {
    if (isEven(arr[begin])) {
      begin+=1
    }
    if (isOdd(arr[end])) {
      end -= 1
    }
    if (!isEven(arr[begin]) && !isOdd(arr[end])) {
      let swap = arr[begin]
      arr[begin] = arr[end]
      arr[end] = swap
      begin+=1
      end-=1
    }
  }
}

let arr = [2, 4, 6, 9, 1, 5, 1, 11, 1, 1]
recorderOddEven(arr)
// log(arr)

/*倒数第k个个节点，前面的追后面的*/
// [1, 2, 3, 4, 5, 6]
const findKthToTail = (list, k) => {
  /*
  * 1. list为null
  * 2. list的节点数要不少于k
  * 3. k!=0
  * */
  if (list === null || k === 0) {
    throw Error('no ok')
  }
  let runMan1 = list.head
  let runMan2 = list.head
  for (let i = 0; i < k - 1; i++) {
    if(runMan1.next !== null) {
      runMan1 = runMan1.next
    }else {
      throw Error('no ok')
    }
  }
  while (runMan1.next) {
    runMan1 = runMan1.next
    runMan2 = runMan2.next
  }
  return runMan2.val
}

