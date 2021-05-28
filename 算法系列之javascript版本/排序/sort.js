const log = console.log.bind(console)
/*
冒泡排序
思路:
每一次循环可以保证将一个最大的数放置末尾（一次至少能排一个）
它重复地走访过要排序的数列，一次比较两个元素，如果他们的顺序错误就把他们交换过来。
*/
const bubbleSort = list => {
    for (let i = 0; i < list.length; i++) {
        for (let j = i + 1; j < list.length; j++) {
            if (list[i] > list[j]) {
                [list[i], list[j]] = [list[j], list[i]]
            }
        }
    }
}
/*
插入排序
思路:
插入排序的基本操作就是将一个数据插入到已经排好序的有序数据中
从而得到一个新的、个数加一的有序数据，算法适用于少量数据的排序
最开始已排序好的数组中只有一个元素
*/
const insertSort = list => {
    for (let i = 1; i < list.length; i++) {
        let j = i - 1
        let value = list[i]
        while (j >= 0) {
            if (value < list[j]) {
                list[j + 1] = list[j]
                list[j] = value
            }
            j -= 1
        }
    }
}
/*
希尔排序
思路:
先将整个待排序的记录序列分割成为若干子序列分别进行直接插入排序，待整个序列中的记录"基本有序"时，再对全体记录进行依次直接插入排序。
相比于之前的插入排序的优化是减少了插入的移动次数
*/
const shellSort = list => {
    let len = list.length, gap = 1
    // 动态定义间隔序列
    while (gap < len / 3) {
        gap = gap * 3 + 1
    }
    // 最后还是做了间隔为1的插入排序，只是这个时候再插入基本不需要怎么移动了
    for (gap; gap > 0; gap = Math.floor(gap / 3)) {
        for (let i = gap; i < len; i++) {
            // 插入排序
            temp = list[i]
            let j = i - gap
            while (j >= 0) {
                if (list[j] > temp) {
                    list[j + gap] = list[j]
                    list[j] = temp
                }
                j -= gap
            }
        }
    }
}
/*
选择排序
思路：一次遍历，每次确立第i位的元素是什么
*/
const selectSort = list => {
    for (let i = 0; i < list.length; i++) {
        for (let j = i; j < list.length; j++) {
            if (list[j] < list[i]) {
                [list[i], list[j]] = [list[j], list[i]]
            }
        }
    }
}
/*
快速排序
思路:
从数列中挑出一个元素，称为 "基准"（pivot）
重新排序数列，所有元素比基准值小的摆放在基准前面，所有元素比基准值大的摆在基准的后面
递归地把小于基准值元素的子数列和大于基准值元素的子数列排序
*/
const quickSort = list => {
    if (list.length < 2) {
        return list
    }
    const mid = list[Math.floor(list.length / 2)]
    const left = list.filter((item, index) => item <= mid && index !== Math.floor(list.length / 2))
    const right = list.filter(item => item > mid)
    return quickSort(left).concat([mid]).concat(quickSort(right))
}
/*
归并排序
一种分治法，将已有序的子序列合并，得到完全有序的序列；即先使每个子序列有序，再使子序列段间有序。
*/
const mergeSort = list => {
    const merge = (left, right) => {
        let i = 0, j = 0, result = []
        while ((i < left.length) && (j < right.length)) {
            if (left[i] <= right[j]) {
                result.push(left[i])
                i += 1
            } else {
                result.push(right[j])
                j += 1
            }
        }
        return result.concat(left.slice(i)).concat(right.slice(j))
    }
    if (list.length < 2) return list
    // 分成小问题,拆到只剩两个最小的序列
    let mid = Math.floor(list.length / 2)
    let left = mergeSort(list.slice(0, mid))
    let right = mergeSort(list.slice(mid))
    // 治
    return merge(left, right)
}
/*
堆排序
将数组变成大顶堆以后，只需要每次将堆首和末尾的最后一个元素交换，即可排序
*/
// 堆调整
const heapify = (arr, i, len) => {
    let root = i, left = 2 * i + 1, right = 2 * i + 2
    if (left < len && arr[left] > arr[right]) {
        root = left
    }
    if (right < len && arr[right] > arr[root]) {
        root = right
    }
    if (root !== i) {
        [arr[i], arr[root]] = [arr[root], arr[i]]
        heapify(arr, root)
    }
}

// 创建大顶堆
const buildHeap = (arr, len) => {
    // 从i=len/2开始，是因为大于len/2没有左和右节点
    // 另外需要从len / 2层往上走才行
    for (let i = Math.floor(len / 2); i >= 0; i--) {
        heapify(arr, i, len)
    }
}

const heapSort = list => {
    let len = list.length
    buildHeap(list, len)
    for (let i = list.length - 1; i > 0; i--) {
        [list[i], list[0]] = [list[0], list[i]]
        len -= 1
        buildHeap(list, i, len)
    }
}

const test = [6, 5, 4, 3, 2, 1]
heapSort(test)
log(test)

