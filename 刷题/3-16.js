const log = console.log.bind(console);

/*
给定一个包含红色、白色和蓝色，一共 n 个元素的数组，原地对它们进行排序，
使得相同颜色的元素相邻，并按照红色、白色、蓝色顺序排列。
此题中，我们使用整数 0、 1 和 2 分别表示红色、白色和蓝色。
*/
// {
//     0: 'red',
//     1: 'white',
//     2: 'blue'
// }
// class Ball {
//     constructor(color, level) {
//         this.color = color;
//         this.level = level;
//     }
// }

// const test = [5, 4, 3, 2, 1]
// var sortColors = function (nums) {
//     if (nums.length === 0 || nums.length === 1) {
//         return nums;
//     }
//     let mid = nums[Math.floor(nums.length / 2)];
//     let left = nums.filter(
//         (num, index) => num <= mid && index !== Math.floor(nums.length / 2)
//     );
//     let right = nums.filter((num) => num > mid);
//     return sortColors(left).concat([mid]).concat(sortColors(right));
// };

// var sortColors = function(nums) {
//     if (nums.length < 2) return nums
//     let mid = Math.floor(nums.length / 2)
//     let left = nums.slice(0, mid)
//     let right = nums.slice(mid)
//     return merge(sortColors(left), sortColors(right))
// }

// const merge = function(left, right) {
//     const result = []
//     while(left.length && right.length) {
//         if (left[0] < right[0]) {
//             result.push(left.shift())
//         } else {
//             result.push(right.shift())
//         }
//     }
//     while (left.length) {
//         result.push(left.shift())
//     }
//     while(right.length) {
//         result.push(right.shift())
//     }
//     return result
// }

const heapify = (arr, i, len) => {
    let lindex = i * 2 + 1;
    let rindex = i * 2 + 2;
    let largest = i;
    if (lindex < len && arr[lindex] > arr[largest]) {
        largest = lindex;
    }
    if (rindex < len && arr[rindex] >= arr[largest]) {
        largest = rindex;
    }
    if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        heapify(arr, largest);
    }
};

const buildHeap = function (arr, len) {
    for (let i = Math.floor(len / 2); i >= 0; i--) {
        heapify(arr, i, len);
    }
};

const sortColors = function (nums) {
    buildHeap(nums, nums.length);
    let len = nums.length;
    for (let i = nums.length - 1; i > 0; i--) {
        [nums[i], nums[0]] = [nums[0], nums[i]];
        len -= 1;
        buildHeap(nums, len);
    }
};

// const test = [1, 2, 2, 2, 2, 0, 0, 0, 1, 1];
// sortColors(test);
// const now = [1, 1, 1, 2, 2, 0, 0, 0];
// // heapify(now, 0, now.length)
// log("now", now);
// log(test);

// 输入：s = "ADOBECODEBANC", t = "ABC"
// 输出："BANC"
// 示例 2：

// 输入：s = "a", t = "a"
// 输出："a"

// 滑动窗口。i,j=0， j是窗口右边界，是窗口左边界
// “abc" => [["a", 1], ["b", 2], ["c", 3]]
// t.split('').reduce((acc, v) => {
//     let index = acc.findIndex(item => item.includes(v))
//     if (index !== -1) {
//         acc[index][1] += 1
//         return acc
//     } else {
//         const arr = [v, 1]
//         return [...acc, arr]
//     }
// }, [])

var minWindow = function (s, t) {
    const need = new Map();
    for (let char of t) {
        if (need.has(char)) {
            need.set(char, need.get(char) + 1);
        } else {
            need.set(char, 1);
        }
    }
    let needCnt = Array.from(need.values()).reduce(
        (acc, item) => acc + item,
        0
    );
    let i = 0;
    let subStr = "";
    s.split("").forEach((item, j) => {
        if (need.get(item) > 0) {
            needCnt -= 1;
        }
        if (need.has(item)) {
            need.set(item, need.get(item) - 1);
        }
        // 滑动窗口满足条件
        if (needCnt === 0 && t.length) {
            // 缩小滑动窗口，使其变成满足条件的最小临界
            while (true) {
                let c = s[i];
                if (need.get(c) === 0) {
                    subStr = subStr.length
                        ? s.slice(i, j + 1).length < subStr.length
                            ? s.slice(i, j + 1)
                            : subStr
                        : s.slice(i, j + 1);
                    break;
                }
                if (need.has(c)) {
                    need.set(c, need.get(c) + 1);
                }
                i += 1;
            }
            // log('findit', s.slice(i, j + 1))
            // 改变滑动窗口，寻找下一种满足条件的窗口
            need.set(s[i], need.get(s[i]) + 1);
            needCnt += 1;
            i += 1;
        }
    });
    return subStr;
};

s = "ADOBECODEBANC";
t = "ABC";
log(minWindow(s, t));
