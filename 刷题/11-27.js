const log = console.log.bind(console)

const printMatrixClockWisely = (matrix, rows, cols) => {
  if (matrix === null || rows <= 0 || cols <= 0) {
    return
  }
  let start = 0
  while (2 * start < cols && 2 * start < rows) {
    printMatirxInCircle(matrix, rows, cols, start)
    start++
  }
}

const printMatirxInCircle = (matrix, rows, cols, start) => {
  // 终止行号 > 起始行号 => 第二步存在
  // 终止列号 > 起始列号 => 第三步存在
  // 第四步: 终止行号要比起始行号大于等于2 && 终止列号大鱼起始列号
  let endX = cols - 1 - start
  let endY = rows - 1 - start
  let result = []
  for (let i = start; i <= endX; i++) {
    result.push(matrix[start][i])
  }
  if (start < endY) {
    for (let i = start + 1; i <= endY; i++) {
      result.push(matrix[i][endX])
    }
  }
  if (start < endX && start < endY) {
    for (let i = endX - 1; i >= start; i--) {
      result.push(matrix[endY][i])
    }
  }
  if (start < endX && start < endY - 1) {
    for (let i = endY - 1; i >= start + 1; i--) {
      result.push(matrix[i][start])
    }
  }
}

class myStack {
  constructor() {
    this.dataArr = []
    this.minArr = []
  }
  push(val) {
    this.dataArr.push(val)
    if (this.minArr.length === 0 || val < this.minArr.slice(-1)) {
      this.minArr.push(val)
    } else {
      this.minArr.push(this.minArr.slice(-1))
    }
  }
  pop() {
    this.dataArr.pop()
    this.minArr.pop()
  }
  min(){
    return this.minArr.slice(-1)
  }
}


