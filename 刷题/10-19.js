// cdy,zzsfatba
// 归并排序
// 分治法将问题分(divide)成一些小的问题然后递归求解，而治(conquer)的阶段则将分的阶段得到的各答案"修补"在一起，即分而治之)。
const log = console.log.bind(console)
/*
// https://www.runoob.com/w3cnote/merge-sort.html
// 8 4 5 7 1 3 6 2
// 8 4 5 7 --- 1 3 6 2
// 8 4 --- 5 7 --- 1 3 --- 6 2
// 8-4-5-7   1-3-6-2
// 一直递归的拆，直到拆的剩1个
// 治
// 4 8 --- 5 7 --- 1 3 --- 2 6
分的递归思路，左边归并，右边归并，
申请空间，使其大小为两个已经排序序列之和，该空间用来存放合并后的序列；
设定两个指针，最初位置分别为两个已经排序序列的起始位置；
比较两个指针所指向的元素，选择相对小的元素放入到合并空间，并移动指针到下一位置；
重复步骤 3 直到某一指针达到序列尾；
将另一序列剩下的所有元素直接复制到合并序列尾。
*/
const mergeSort = arr => {
  let len = arr.length
  if (len < 2) {
    return arr
  }
  let mid = Math.floor(arr.length / 2)
  let left = arr.slice(0, mid)
  let right = arr.slice(mid)
  return merge(mergeSort(left), mergeSort(right))
}

const merge = (left, right) => {
  let result = []
  while (left.length && right.length) {
    if (left[0] < right[0]) {
      result.push(left.shift())
    } else {
      result.push(right.shift())
    }
  }
  while (left.length) {
    result.push(left.shift())
  }
  while (right.length) {
    result.push(right.shift())
  }
  return result
}

// log(mergeSort([9, 5, 1, 3, 2]))
/**
 * 动画演示： https://www.cs.usfca.edu/~galles/visualization/HeapSort.html
 * 堆排序
 * 将树转成大顶堆
 * 交换根元素和最后一个叶子节点
 * 去除最后一个元素，重新转成大顶堆
 * 重复上面操作
 * len=6, i=3, left=7,right=8,largest=3
 * (2^(n-1) - 1, 2^n-1)
 * 1->2->4->(0,8) n=4, 倒数第二层的最后的元素在是math.floor(len/2),
 * 但是如果是完全二叉树，math.floor(len/2)
 * 这里堆排序的操作如下：
 * 从倒数第二层的最后一个元素，进行左右孩子节点的三元素比较
 * */

const swap = (arr, i, j) => {
  let tmp = arr[i]
  arr[i] = arr[j]
  arr[j] = tmp
}

function buildMaxHeap(arr) {
  let len = arr.length
  for (let i = Math.floor(len / 2); i >= 0; i--) {
    heapify(arr, i)
  }
}

function heapify(arr, i) {
  let left = 2 * i + 1
  let right = 2 * i + 2
  // 假设当前父节点是三个元素里最大值
  let largest = i
  // left < len, 因为math.floor(len/2)可能会是倒数第一层的第一个元素，所以要排除掉
  if (left < len && arr[left] > arr[largest]) {
      largest = left
  }
  // 右节点与当前的较大值节点比较
  if (right < len && arr[right] > arr[largest]) {
    largest = right
  }
  // i是当前父节点的位置，不相等说明要进行重新调整
  if (largest != i) {
    // 交换
    swap(arr, i, largest)
    // 下面这个步骤是重新调整当前的子堆进行调整
    heapify(arr, largest)
  }
}

function heapSort(arr) {
  buildMaxHeap(arr)
  for (let i = arr.length - 1; i > 0; i--) {
    // 交换根节点和最后一个叶子节点
    swap(arr, 0, i)
    len--
    heapify(arr, 0)
  }
  return arr
}

