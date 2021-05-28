const log = console.log.bind(console)

/**
 * 数据流中的中位数
 * 因为流中的数据是不断变化的，随时可能增多.
 * 二叉搜索树效率lgn - n 得到数据 lgn - n
 * 链表 n 得到数据 1
 * partition n 得到数据 1
 * 堆中插入数据的时间是 lgn 得到数据 1
 * 左边数据容器用大顶堆，右边数据容器用小顶堆
 * 这种方法使用偶数项放入小顶堆，其他放入大顶堆
 * 前提：要保证大顶堆的所有数据都比小顶堆的数据小
 * => 大顶堆的最大元素 < 小顶堆的最小元素
 * => 如果不满足，就把大顶堆的最大往小顶堆放, 直到大顶堆的最大小于小顶堆的最小
 * =>
 */


// 大顶堆 less 小顶堆 greater
// left mid right
// 1 4 9 11 19
function heapify(arr, i) {
    let left = 2 * i + 1;
    let right = 2 * i + 2;
    let len = arr.length
    let largest = i
    if (left < len && arr[left] > arr[i]) {
        largest = left
    }
    if (right < len && arr[right] > arr[i]) {
        largest = right
    }
    if (largest !== i) {
        swap(arr, i, largest)
        heapify(arr, largest)
    }
}


class DynamicArray {
    constructor() {
        this.array = [];
        this.min = [];
        this.max = [];
    }
    insert(num) {
        if ((min.length + max.length & 1) === 0) {
            if (max.length > 0 && num < max[0]) {
                this.max.push(num)
                this.maxHeap(this.max)
                num = this.max[0]
                this.minHeap(num)
            }
        }
    }
}

/**
 * 连续子数组的最大和
 * 数组中有正数和负数，连续数组的项数不限制。找到最大的那个连续数组的值
 * 要求时间复杂的O(n)
 * [-1, 8, 4, -9, 7] => [8, 4]
 * => p
 * 思路一：
 * 前者+后者 < 后者 => 扔掉前者
 * 并用一个num统计最大值
 * 思路二：
 *
 */
const findGreatestSumOfArrays = (arr) => {
    let len = arr.length;
    if (arr === null || len < 1) return 0
    let sum = arr[0] // 每组的和
    let maxSum = arr[0] // 连续最大的和
    for(let i = 1; i < len; i++) {
        sum = Math.max(sum + arr[i], arr[i]) // 前者+后者 < 后者 => 扔掉前者
        maxSum = Math.max(maxSum, sum)
    }
}

/**
 * 1 ~ n 整数中 1 出现的次数
 * 比如： 1 ~ 12 中有: 1, 10, 11, 12 => 5
 * 思考：
 * n < 10 => 1
 * n < 20 => f(10) + 9
 * n < 30 => f(20) + 1
 * .......
 * n < 100 => f(90) + 1
 * n < 110 => f(100) + 10  不成立
 *
 * 1的组合？
 * 1位的时候 1, []
 * 2位的时候 1, [0~9]
 * 3位的时候 1, [0~9, 0~9]
 * n = 12 -> 10 + 2 -> f(个) + f(1, [0~2]）
 *
 * 1 - 21345 =>
 * 1 - 1345, 1346 - 11345, 11346 - 21345
 * 10000 - 19999 => 10000
 * 1346 - 21345 => 8000
 */

function NumberOf1Between1AndN_Solution(n)
{
    // write code here
    var count = 0;
    var i = 1;
    var pre = 0, back = 0, cur = 0;
    while(n >= i){
        pre = parseInt(n / (i * 10));
        back = n - parseInt(n / i) * i;
        cur = parseInt(n / i) % 10;
        if(cur == 0){
            count += pre * i;
        }else if(cur == 1){
            count += pre * i + back + 1;
        }else{
            count += (pre + 1) * i
        }
        i *= 10;
    }
    return count;
}
