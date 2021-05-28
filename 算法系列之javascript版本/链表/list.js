const log = console.log.bind(console)

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

/**
# 翻转链表
[题目来源](https://leetcode-cn.com/problems/reverse-linked-list/)
思路1: 分治法
对两个节点做如下处理
1. 当前节点变成下一个节点的下一节点
2. 当前节点的next是null
思路2: 正常的迭代方法
依次遍历每个节点，对每个节点作如下处理
next = cur.next
cur.next = pre
pre = cur
cur = next
*/
const reverseList = head => {
    if (head == null || head.next == null) return head
    // 遍历到链表只有一个节点以后回退，也就是说下一步只剩一个节点就要回退了
    let p = reverseList(head.next)
    // 当前节点变成队尾
    head.next.next = head
    // 当前节点的next是null
    head.next = null
    return p
}

const reverseList1 = head => {
    let cur = head, pre = null, next = null
    while (cur) {
        next = cur.next
        cur.next = pre
        pre = cur
        cur = next
    }
    return pre
}

/**
复杂链表的复制
[题目来源](https://leetcode-cn.com/problems/fu-za-lian-biao-de-fu-zhi-lcof/)
思路1：通过next创建一个新的链表，然后新链表与老链表做一一映射关系。f(old[n]) = f(new[n])
其实就是用一个映射表存储他们的映射关系就好，然后遍历映射表做处理即可
*/
function Node(val, next, random) {
    this.val = val;
    this.next = next;
    this.random = random;
}

const copyRandomList = head => {
    const map = new Map()
    let p = head, pre = null
    // create new list and handle map for old list and new list
    while (p) {
        const node = new Node(p.val)
        map.set(p, node)
        pre && (pre.next = node)
        pre = node
        p = p.next
    }
    // log('new list', map.get(head))
    // traverse map
    for (let [oldNode, newNode] of map.entries()) {
        let key = oldNode.random
        let findNode = map.get(key)
        newNode.random = findNode
    }
    return map.get(head)
}

/**
合并两个排序的链表
[题目来源](https://leetcode-cn.com/problems/he-bing-liang-ge-pai-xu-de-lian-biao-lcof/)
思路：
两个都有序的话就很好弄了，两个一起遍历，一次比较
*/
const mergeTwoLists = (l1, l2) => {
    let pre = null
    let head = null
    while (l1 && l2) {
        const node = new ListNode(Math.min(l1.val, l2.val))
        pre && (pre.next = node)
        !pre && (head = node)
        pre = node
        l1.val < l2.val ? (l1 = l1.next) : (l2 = l2.next)
    }
    while (l1) {
        if (!pre) return l1
        pre.next = l1
        pre = pre.next
        l1 = l1.next
    }
    while (l2) {
        if (!pre) return l2
        pre.next = l2
        pre = pre.next
        l2 = l2.next
    }
    return head
}

/**
# 链表倒数第k个节点
[题目来源](https://leetcode-cn.com/problems/lian-biao-zhong-dao-shu-di-kge-jie-dian-lcof/)
思路：
经典的双指针问题
*/
const getKthFromEnd = (head, k) => {
    let fast = head, slow = head
    // fast先跑
    while (k) {
        fast = fast.next
        k -= 1
    }
    // 一起跑
    while (fast) {
        fast = fast.next
        slow = slow.next
    }
    return slow
}

/**
# 画圈中剩下的最后的数字
[题目来源](https://leetcode-cn.com/problems/yuan-quan-zhong-zui-hou-sheng-xia-de-shu-zi-lcof/)
思路: 使用链表模拟即可
0->1->2->3->4 m = 2
1
3
0
4
*/
// 会超时
const lastRemaining1 = (n, m) => {
    let start = 0
    let pre = null
    let head = null
    // create list ring
    while (start !== n) {
        const node = new ListNode(start)
        pre && (pre.next = node)
        !pre && (head = node)
        pre = node
        start += 1
    }
    pre.next = head
    // 当只剩一个节点的时候，head === pre
    // count % m === 0 就说明要删除
    let count = 0
    while (head !== pre) {
        count += 1
        if (count % m === 0) {
            pre.next = head.next
        } else {
            pre = pre.next
        }
        head = head.next
    }
    return head.val
}

/*
# 环形链表1
[题目来源](https://leetcode-cn.com/problems/linked-list-cycle/)
思路：快慢指针，能相遇就是环
*/

const hasCycle = function (head) {
    let result = false;
    if (!head) return result;
    let slow = head
    let quick = head.next
    while ((quick !== slow)) {
        if (!quick || !slow || !quick.next) {
            return result;
        }
        slow = slow.next
        quick = quick.next.next
    }
    if (quick === slow) {
        result = true
    }
    return result
}

/**
# 环形链表2
[题目来源](https://leetcode-cn.com/problems/linked-list-cycle-ii/)
思路：在这里快慢指针需要进行数学分析一般来说阻碍比较大
这里需要使用集合存储节点，当存在一个节点的下一个节点再集合里面说明是环
*/
const detectCycle = function (head) {
    const set = new Set()
    let pos = null
    if (!head) return pos
    while (head) {
        if (set.has(head)) {
            pos = head
            break
        } else {
            set.add(head)
        }
        head = head.next
    }
    return pos
}

