const log = console.log.bind(console)
/**
 * 欧几里得算法求p与q的最大公约数
 * q为0则公约数是p
 * p % q 的余数 r, p 与 q的公约数即是 q 与 r的公约数
 * @param p: int
 * @param q: int
 */
const gcd = (p, q) => {
  if (q === 0) {
    return p
  }
  r = p % q
  return gcd(q, r)
}

/**
 * 二分查找
 * @param key:int
 * @param a:int[]
 */
const binarySearch = (key, a) => {
  let lo = 0
  let hi = a.length - 1
  while (lo < hi) {
    let mid = (hi - lo) / 2
    if (key < a[mid]) {
      hi = mid - 1
    } else if (key > a[mid]) {
      lo = mid + 1
    } else {
      return mid
    }
  }
  return -1
}

/**
 * 求值: ( 1 + ( ( 2 + 3 ) * ( 4 * 5 )))
 * */

const nums = '0123456789'.split('')
const leftBracket = "("
const rightBracket = ")"
const options = ["+", "-", "*", "/"]
const resolveExpression = (str) => {
  const ops = []
  const vals = []
  let cp_str = str.split('')
  while (cp_str.length) {
    let token = cp_str.shift()
    if (nums.includes(token)) {
      vals.push(token)
    } else if (options.includes(token)) {
      ops.push(token)
    } else if (rightBracket.includes(token)) {
      let op = ops.pop()
      let v = vals.pop()
      let logicMap = {
        "+": (val, vals) => val = Number(vals.pop()) + Number(val),
        "-": (val, vals) => val = Number(vals.pop()) - Number(val),
        "*": (val, vals) => val = Number(vals.pop()) * Number(val),
        "/": (val, vals) => val = Number(vals.pop()) / Number(val),
      }
      vals.push(logicMap[op](v, vals))
    } // 其他的啥都不做(空格和左括号这些)
  }
  // 最后栈里只会剩一个数据
  return vals.pop()
}

/*固定容量的栈*/
class FixedCapacityStackOfStrings {
  constructor(arr) {
    this.arr = arr
    this.n = 0
  }
  resize(max) {
    // max > this.arr.length
    let new_arr = new Array(max)
    this.arr.forEach((item, index) => {
      new_arr[index] = item
    })
    this.arr = new_arr
  }
  pop() {
    let item = this.arr[this.n - 1]
    this.arr[this.n - 1] = null
    this.n -= 1
    if (this.n > 0 && this.n === this.arr.length / 4) {
      this.resize(this.arr.length / 2)
    }
    return item
  }
  push(item) {
    if (this.n === this.arr.length) {
      this.resize(2 * this.arr.length)
    }
    this.arr[this.n] = item
    this.n += 1
  }
}

/*
* union-find算法
* UF(int N) 以整数标识（0 到 N-1）初始化 N 个触点
* void union(int p, int q) 在 p 和 q 之间添加一条连接
* int find(int p) p（0 到 N-1）所在的分量的标识符
* boolean connected(int p, int q) 如果 p 和 q 存在于同一个分量中则返回 true
* int count() 连通分量的数量
* */

class UF {
  constructor(N) {
    this.count = N // 分量数量
    for (let i = 0; i < N.length; i++) {
      this.id[i] = i // 分量id, 索引是触点
    }
  }
  count() {
    return this.count
  }
  connected(p, q) {
    return find(p) == find(q)
  }
  find(p) {
    return id[p]
  }
  union(p, q) {
    let p_id = find(p)
    let q_id = find(q)
    if (p_id == q_id) return
    for (let i = 0; i < id.lenght; i++) {
      if (id[i] == p_id) {
        id[i] = q_id
      }
    }
  }
  rootUnion(p, q) {
    let p_root = find(p)
    let q_root = find(q)
    if (p_root == q_root) {
      return
    }
    id[p_root] = q_root
    this.count--
  }
}


class SortTemplate {
  static sort(arr) {
  }
  static less(v, w) {
    return v < w
  }
  static exch(arr, i, j) {
    let t = arr[i]
    arr[i] = arr[j]
    arr[j] = t
  }
  static show(arr) {
    let r = ''
    arr.forEach(item => {
      r = r + item + ' '
    })
    console.log(r)
  }
  static isSorted(arr) {
    for (let i = 0; i < a.length; i++) {
      if (this.less(a[i], a[i - 1])) {
        return false
      }
    }
    return true
  }
}

/*
* 一种最简单的排序算法是这样的：首先，找到数组中最小的那个元素，
* 其次，将它和数组的第 一个元素交换位置（如果第一个元素就是最小元素那么它就和自己交换）。
* 再次，在剩下的元素中 找到最小的元素，将它与数组的第二个元素交换位置。
* 如此往复，直到将整个数组排序。这种方法 叫做选择排序，因为它在不断地选择剩余元素之中的最小者。
*/
class Selection extends SortTemplate {
  static sort(arr) {
    super.sort(arr)

    let len = arr.length
    for (let i = 0; i < len; i++) {
      let min = i
      for (let j = i + 1; j < len; j++) {
        if (this.less(arr[j], arr[min])) {
          min = j
        }
      }
      this.exch(arr, i, min)
    }
  }
}

/*
* 打扑克牌用的就是插入排序
* 通常人们整理桥牌的方法是一张一张的来，
* 将每一张牌插入到其他已经有序的牌中的适当位置。
* 在计算机的实现中，为了给要插入的元素腾出空间，
* 我们需要将其余所有元素在插入之前都向右移 动一位。
* 这种算法叫做插入排序，实现请见算法
*/
class Insertion extends SortTemplate {
  static sort(arr) {
    super.sort(arr)
    let len = arr.length
    for (let i = 1; i < len; i++) {
      for (let j = i; j > 0 && this.less(arr[j], arr[j - 1]); j--) {
        this.exch(arr, j, j - 1)
      }
    }
  }
}


/*
* shell sort
* 间隔h的子数组列进行插入排序，然后对子数组列在拆成间隔为h'的子数组列
* 进行直到间隔h'''....~为1
* */
class Shell extends SortTemplate {
  static sort(arr) {
    super.sort(arr)
    let len = arr.length
    let h = 1
    // log('this', this)
    while(h < len / 3){
      h = 3 * h + 1 // h = 1, 4, 13 ...
    }
    /**
     * 假设arr长度为12，则h间距的值为 4
     * i从 h(4, 1) 到 12
     * j从 i 到 h(4, 1)，等差为4，例如: [4, 8, 12] [5, 9]
     * */
    // 我的理解是从 n(h ... arr.length) 开始， 对arr[n, n - h, n - 2h ... 0]数组进行插入排序
    // 知道h为1的时候结束
    while (h >= 1) {
      for (let i = h; i < len; i++) {
        for (let j = i; j >= h && this.less(arr[j], arr[j-h]); j -= h) {
          this.exch(arr, j, j - h)
        }
        // log('arr now', arr)
      }
      // log('loop h:%d', h)
      // h 一直除以到1
      h = Math.floor(h / 3)
    }
  }
}


class myShell extends SortTemplate {
  static sort(arr) {
    super.sort(arr)
    // log('this', this)
    let len = arr.length
    let gap = 1
    while (gap < len / 3) {
      gap = len / 3 + 1
    }
    while (gap >= 1) {
      for (let i = gap; i < len; i++) {
        for (let j = i; j > 0 && this.less(arr[j], arr[j - gap]); j -= gap) {
            this.exch(arr, j, j - gap)
        }
      }
      gap = Math.floor(gap / 3)
    }
  }
}

const algTime = async (alg, arr) => {
  let start = new Date()
  let MapAlg = {
    "Insertion": Insertion.sort.bind(Insertion),
    "Selection": Selection.sort.bind(Selection),
    "Shell": Shell.sort.bind(Shell),
    // "Merge": Merge.sort,
    // "Quick": Quick.sort,
    // "Heap": Heap.sort,
  }
   MapAlg[alg] && await MapAlg[alg](arr)

  let end = new Date()
  return end - start
}

let arr = [8, 5, 4, 3, 1, 2, 6, 7]
// algTime('Shell', arr).then(res => log(res))


const quickSort = (arr) => {
  if (arr.length === 1 || arr.length === 0) {
    return arr
  }
  log("now", arr)
  let mid = Math.floor(arr.length / 2)
  let left = arr.filter(item => item < arr[mid])
  let right = arr.filter(item => item > arr[mid])
  return quickSort(left).concat([arr[mid]]).concat(quickSort(right))
}



// 归并排序
// 左边用尽去右边，右边用尽去左边
// 右边的当前元素小于左边的当前去右边元素。。。。。
class Merge extends SortTemplate {
  static sort(arr) {
    super.sort(arr)

  }
}


let a = [4, 3, 2]

