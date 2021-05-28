const log = console.log.bind(console)

/*
* question1: del repeat node in list
* desc:
*
* */

const DelDuplication = list => {
  if (list === null) {
    return
  }
  let preNode = null
  let node = list.head
  while (node !== null) {
    let next = node.next
    let needDel = false
    if (next !== null && next.val === node.val) {
      needDel = true
    }
    if (!needDel) {
      preNode = node
      node = node.next
    } else {
      let val = node.val
      let nodeToBeDel = node
      while (nodeToBeDel !== null && nodeToBeDel.val === val) {
        next = nodeToBeDel.next
        delete nodeToBeDel
        nodeToBeDel = next
      }
    }
  }
}

/*
* question: huan in a list
* 确定环的入口
* 2, 3=>3, 5=>4, 3=>  5, 6  =>  6, 4  => 3, 6 =>
* 4, 4,
* 如果有环，从起点开始，不同速度会相遇。可以的到环中的一个节点
* 得到环的节点以后，从环节点开始，遍历走一遍，确定环的节点个数
* 然后确立2个节点，一个先走环节点个数长度，以相同速度走，相遇就是入口
* */

/*
* reverse list
* init:
* pre = null
* node = list.head
* handle logic:
* next = node.next
* node.next = pre
* pre = node
* node = next
* special handle logic:
* next === null ? 尾节点
* list.head = node
* */

const reverseList = list => {
  let node = list.head
  let pre = null
  while (node !== null) {
    let next = node.next
    if (next === null) {
      list.head = node
    }
    node.next = pre
    pre = node
    node = next
  }
}

