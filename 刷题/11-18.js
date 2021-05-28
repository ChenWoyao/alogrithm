const log = console.log.bind(console)

// n->{m1, m2, ....mx} m1*m2*....mx 的最大值
// f(n) = max(f(i) * f(n-i))
// 但是可以求得f(
const maxProductAfterCutting_solution = len => {
  // 绳子长度:len
  if (len < 2) {
    return 0
  }
  if (len === 2) {
    return 1
  }
  if (len === 3) {
    return 2
  }

  let products = []
  products[0] = 0
  products[1] = 1
  products[2] = 2
  products[3] = 3

  let max
  let result = [[0], [1], [2], [3]]
  let arr = []

  for (let i = 4; i <= len; i++) {
    max = 0
    for (let j = 1; j <= i / 2; j++) {
      let product = products[j] * products[i - j]
      if (max < product) {
        max = product
        arr = [j, i - j]
      }
      products[i] = max
      result[i] = arr
    }
  }
  log(products)
  max = products[len]
  return result
}


// 贪婪
const maxProductAfterCutting_solution1 = len => {
  if (len < 2) {
    return 0
  }
  if (len === 2) {
    return 1
  }
  if (len === 3) {
    return 2
  }
  let timesOf3 = Math.floor(len / 3)
  // 剩下最后长度为4
  if (len - timesOf3 * 3 === 1) {
    timesOf3 -= 1
  }
  let timesOf2 = (len - timesOf3 * 3) / 2
  log(timesOf2)
  return Math.pow(3, timesOf3) * Math.pow(2, timesOf2)
}


// log(maxProductAfterCutting_solution1(11))

// 二进制的与, 或, 异或
// 二进制的左移: m左移n位，最左边的n位被丢弃，右边补上n个0
// 二进制的右移：m右移n位，最右边的n位被丢弃，如果数字是一个无符号
// 数值，则用0填补最左边的n位，如果是负数，最左边补n个1
// 00001010 >> 2 => 00000010
// 10001010 >> 3 => 11110001

// num -> nums of 1

const numberOf1 = n => {
  // let count = 0
  // while (n) {
  //   if (n & 1) {
  //     count++
  //   }
  //   n = n >> 1
  // }
  // 100010111
  // 111111111
  // -10 1010
  let count = 0
  let flag = 1
  while(flag){
    if (n & flag) {
      count++
    }
    // 0001,0010,0100,1000,
    flag = flag << 1
  }
  return count
}

// int 32位 1010=>00000000 00000000 00000000 00001010
// => 10000000 00000000 00000000 00001010 -10的源码
// => 11111111 11111111 11111111 11110101 -10的反码
// => 11111111 11111111 11111111 11110110 -10的反码加一
// => 负数以源码的补码表示
// => 负数的补码为对该数的原码除符号位外各位取反，然后在最后一位加1.
log(numberOf1(-10))

// num - 1 =>

