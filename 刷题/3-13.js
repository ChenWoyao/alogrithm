const log = console.log.bind(console);

// 关于二级制中js的算法
// 任何数和 00 做异或运算，结果仍然是原来的数，即 a⊕0=a
// 任何数和其自身做异或运算，结果是 0，即a⊕a=0。
// 异或运算满足交换律和结合律，即 a⊕b⊕a=b⊕a⊕a=b⊕(a⊕a)=b⊕0=b
// x ^ 0 = x​ ， x ^ 1 = ~x
// x & 0 = 0 ， x & 1 = x
/**
 * 如果可以使用额外空间可以使用集合和哈希表
 */
var singleNumber = function (nums) {
    return nums.reduce((acc, num) => (acc ^= num), 0);
};

const testArr = [2, 2, 1];
const testArr2 = [4, 1, 2, 1, 2];

log(singleNumber(testArr));
log(singleNumber(testArr2));

/*
给定一个非空整数数组，除了某个元素只出现一次以外，其余每个元素均出现了三次。找出那个只出现了一次的元素。
*/

const arr1 = [2, 2, 3, 2]; // 3
const arr2 = [0, 1, 0, 1, 0, 1, 99]; // 99

const mp = new Map([
    ["key1", 1],
    ["key2", 2],
]);
// log(
//     "mp",
//     Array.from(mp.keys()),
//     Array.from(mp.values()),
//     Array.from(mp.entries())
// );
const mp2 = new Map([...mp, ["key3", 3]]);
// log("has", mp2.has("key3"));
/**
 * 关于状态机的机制
 * 首先所有的数字累加的时候，二级制位的数目余3那就是剩下来的那个只出现过一次的num的进制值
 * 那么如果计算每一个位的二级制累加和呢
 * 这里使用了状态机解决，0->1->2  状态只会是0,1,2. 因为余3的余数只能是0，1，2
 * 而0,1,2可以表示00,01,11.这样就可以进行二级制运算了
 * 用one表示第一位，two表示第二位。初始值都是0，0
 * 其实one，two的关系表达式如下：
 * ones = ones ^ num & ~twos
 * twos = twos ^ num & ~ones
 * 而只出现一次的num的one是1，所以返回one就可以了
 * @param {*} nums
 * @returns
 */
var singleNumber2 = function (nums) {
    let [ones, twos] = [0, 0];
    nums.forEach((num) => {
        ones = ones ^ (num & ~twos);
        twos = twos ^ (num & ~ones);
    });
    return ones;
};

// [9,8,4,3,1]
// 构建大顶堆
// 大顶堆的root和最后一个元素交换

const heapify = (arr, i) => {
    let root = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;
    if (left < len && arr[root] < arr[left]) {
        root = left;
    }
    if (right < len && arr[root] < arr[right]) {
        root = right;
    }
    if (root !== i) {
        [arr[i], arr[root]] = [arr[root], arr[i]];
        heapify(arr, root);
    }
};

function buildMaxHeap(arr) {
    for (let i = Math.floor(len / 2); i >= 0; i--) {
        heapify(arr, i);
    }
}

const heapSort = (arr) => {
    buildMaxHeap(arr)
    log("build max heap", arr);
    for (let i = arr.length - 1; i > 0; i--) {
        [arr[i], arr[0]] = [arr[0], arr[i]];
        len--
        heapify(arr, 0);
    }
};

// const arr = [7, 9, 8, 4, 3, 1, 2];
// var len = arr.length
// heapSort(arr);
// log("arr", arr);

