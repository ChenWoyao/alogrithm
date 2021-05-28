const log = console.log.bind(console)

// # 路径算法
// """
// dijkstra算法,最经典的单源最短路径算法
// bellman-ford算法,允许负权边的单源最短路径算法
// floyd算法,经典的多源最短路径算法
// """

// 算法思想参考: https://blog.csdn.net/Puppet__/article/details/76146848
// 代码参考: https://www.cnblogs.com/xbblogs/p/9964265.html
/*
* 初始状态：S是记录各个顶点间最短路径的矩阵。
第1步：初始化S。
矩阵S中顶点a[i][j]的距离为顶点i到顶点j的权值；如果i和j不相邻，则a[i][j]=∞。实际上，就是将图的原始矩阵复制到S中。
注:a[i][j]表示矩阵S中顶点i(第i个顶点)到顶点j(第j个顶点)的距离。
第2步：以顶点A(第1个顶点)为中介点，若a[i][j] > a[i][0]+a[0][j]，则设置a[i][j]=a[i][0]+a[0][j]。
以顶点a[1]6，上一步操作之后，a[1][6]=∞；而将A作为中介点时，(B,A)=12，(A,G)=14，因此B和G之间的距离可以更新为26。
同理，依次将顶点B,C,D,E,F,G作为中介点，并更新a[i][j]的大小。
* */

class mGraph {
  constructor() {
    this.vexs = [] // 顶点集合
    this.arc = [] // 邻接矩阵
    // numVexs, numEdegs
    // this.numVexs = numVexs // 当前顶点数目
    // this.numEdges = numEdegs // 当前的边数
  }
}

let g = new mGraph()


// 这里假设为有向图，创建不对称的邻接矩阵
const createMatrix = (vexNum) => {
  let rows = []
  for (let i = 0; i < vexNum; i++) {
    let cols = []
    for (let j = 0; j < vexNum; j++) {
      let edeg = Math.floor(Math.random() * Math.floor(100))
      let toInfinity = [1, 11, 21, 31, 41, 51, 61, 71, 81, 91]
      if (edeg in toInfinity) {
        edeg = Infinity
      }
      cols.push(edeg)
    }
    rows.push(cols)
  }
  return rows
}

let pathmatirx = []; //二维数组 表示顶点到顶点的最短路径权值和的矩阵
let shortPathTable = []; //二维数组 表示对应顶点的最小路径的前驱矩阵

let vexNum = 6
for (let i = 0; i < vexNum; i++) {
  g.vexs[i] = i
}
g.arc = createMatrix(vexNum)
log('current', g.arc)

function Floyd(vexNum) {
  // 初始化
  for (let i = 0; i < vexNum; i++) {
    pathmatirx[i] = []
    shortPathTable[i] = []
    for (let j = 0; j < vexNum; j++) {
      shortPathTable[i][j] = g.arc[i][j]
      pathmatirx[i][j] = j
    }
  }

  //遍历顶点数，每个顶点做一次中介点
  for (let i = 0; i < vexNum; i++) {
    // 开始遍历图
    for (let j = 0; j < vexNum; j++) {
      for (let k = 0; k < vexNum; k++) {
        if (shortPathTable[j][k] > shortPathTable[j][i] + shortPathTable[i][k]) {
          shortPathTable[j][k] = shortPathTable[j][i] + shortPathTable[i][k]
          pathmatirx[j][k] = pathmatirx[j][i]
        }
      }
    }
  }
}

function PrintAll(vexNum) {
  for (let v = 0; v < vexNum; ++v) {
    for (let w = v + 1; w < vexNum; w++) {
      console.log('V%d-V%d weight: %d', v, w, shortPathTable[v][w]);
      k = pathmatirx[v][w];
      console.log(' Path: %d', v);
      while (k != w) {
        console.log(' -> %d', k);
        k = pathmatirx[k][w];
      }
      console.log(' -> %d', w);
    }
  }
}

// Floyd(vexNum)
// PrintAll(vexNum)

/*
* 迪杰斯特拉算法：
* @params
* dis: 保存源点到各个顶点的最短距离
* q: 当前最短路径的顶点集合
* r: 无法到达顶点集合
参考： https://www.cnblogs.com/xbblogs/p/9963698.html
* */

/*
* 思路: 贪婪算法，初始位置顶级集合，每次从未知顶点集合pop一个出来作为中转点，直到没有中转点。
* 依据dis数组，在未知顶点集合Q中选出距离源点最近的一个顶点u，放入P中，
* 并考察所有以u为起点的边，以u作为中转点，检验是否能够减短源点到其他点的距离。如果有，就更新dis数组。
* 重复上一步骤，直到Q中没有顶点。
* */
function Node(val, pre) {
  this.val = val // 当前距离
  this.pre = pre || null // 上一个距离自己最近的点
}


function dijkstra(matrix, start = 0) {
  const rows = matrix.length
  const cols = matrix.length

  // 初始化distance，
  let distance = new Array(rows)
  for (let i = 0; i < rows; i++) {
    distance[i] = new Node(Infinity)
  }
  // 初始化访问节点, 并设置源点
  let visited = new Array(row).fill(false)
  distance[start] = new Node(0)

  while (visited.some(item => !item)) {
    visited[start] = true
    if (distance[start].val < Infinity) {
      for (let j = 0; j < cols; j++) {
        if (matrix[start][j] + distance[start].val < distance[j].val) {
          distance[j].val = matrix[start][j] + distance[start].val
          distance[j].pre = start
        }
      }
    }
    let minIndex = -1;
    let min = Infinity;
    for (let k = 0; k < rows; k++) {
      if (!visited[k] && distance[k].val < min) {
        min = distance[k].val;
        minIndex = k;
      }
    }
    start = minIndex
  }
  return distance
}


function uniquePush(arr, val) {
  let status = arr.some(item => {
    return item === val
  })
  if (!status) {
    arr.push(val)
  }
}

function goHeavy(arr) {
  // {1, 3, 2, 0, 2, 5, 3}
  let r = []
  for (let i = 0; i < arr.length; i++) {
    let val = arr[i]
    for (let j = i; j < arr.length; j++) {
      let next = arr[j]
      if (next === val) {
        uniquePush(r, next)
      }
    }
  }
  return r
}

log(goHeavy([1, 3, 2, 0, 2, 5, 3]))

/*
[2， 3， 5， 4， 3， 2， 6， 7]
=> 1->4, 5->8 [5, 6]
=> 1->2, 3->4 [2, 3]
* */

// 去重，采用不需要辅助空间的策略
// 在1-n长度的数组中，如果每个元素在整个数组中出现的次数大于n，就一定会有重复元素
// 然后只要每次二分，直到二分区间没有上面的情况就停止
function countRange(arr, start, end) {
  if (arr.length === 0) return 0
  let count = 0
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] >= start && arr[i] <= end) {
      count += 1
    }
  }
  return count
}

function getDuplication(arr) {
  if (arr.length <= 1) {
    return -1
  }
  let start = 0
  let end = length - 1
  while (end >= start) {
    let mid = Math.floor((end - start) / 2) + start
    let count = countRange(arr, start, mid)
    if (end === start) {
      if (count > 1) {
        return start
      } else {
        return
      }
    }
    if (count > (mid - start + 1)) {
      end = mid
    } else {
      start = mid + 1
    }
    return -1
  }
}

