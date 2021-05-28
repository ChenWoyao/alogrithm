const log = console.log.bind(console)

/**
 * 丑数
 * 我们把只包含因子2、3和5的数称作丑数（UglyNumber）。
 * 求按从小到大的顺序的第1500个丑数。例如6、8都是丑数，
 * 但14不是，因为它包含因子7。习惯上我们把1当做第一个丑数。
 */

const isUgly = num => {
    while (num % 2 === 0) {
        num /= 2;
    }
    while (num % 3 === 0) {
        num /= 3;
    }
    while (num % 5 === 0) {
        num /= 5;
    }
    return num === 1;
}

const getUglyNumber = index => {
    if (index <= 0) {
        return 0
    }
    let [num, uglyFound] = [0, 0]
    while (uglyFound < index) {
        num++
        if (isUgly(num)) {
            uglyFound++
        }
    }
    log('num', num)
    return num;
}

/**
 * [1, 2, 3, 4, 5, 6, 8,
 *  9, 10, 12, 15, 16, 18, 20, 24, 25]
 *  25 的下一个是里面的某个数字乘以2.
 *  如何找出这个数字，这个数字前面的数乘以2都小于
 *  25，后面的树乘以2都大于25.
 *  所以就是12=> 15 * 2 = 30.
 *  同理：8 => 9 * 3 = 27
 *   5 => 6 * 5 = 30
 *  于是25的下一个数是min(30, 27, 30)
 *  in fact:
 *  25 / 2 = 12 -> 15
 *  25 / 3 => 8 => 9
 *  25 / 5 => 5 => 6
 */

const getUglyNumber_solution2 = (index) => {
    if (index <= 0) return 0

    let uglyNumbers = new Array(index)
    uglyNumbers[0] = 1
    let nextUglyIndex = 1

    let multiply2Index = 0
    let multiply3Index = 0
    let multiply5Index = 0

    while (nextUglyIndex < index) {
        let multiply2 = uglyNumbers[multiply2Index]
        let multiply3 = uglyNumbers[multiply3Index]
        let multiply5 = uglyNumbers[multiply5Index]
        let min = Math.min(multiply2 * 2, multiply3 * 3, multiply5 * 5)
        uglyNumbers[nextUglyIndex] = min
        while (multiply2 * 2 <= uglyNumbers[nextUglyIndex]) {
            multiply2Index++
            multiply2 = uglyNumbers[multiply2Index]
        }
        while (multiply3 * 3 <= uglyNumbers[nextUglyIndex]) {
            multiply3Index++
            multiply3 = uglyNumbers[multiply3Index]
        }
        while (multiply5 * 5 <= uglyNumbers[nextUglyIndex]) {
            multiply5Index++
            multiply5 = uglyNumbers[multiply5Index]
        }
        nextUglyIndex++
    }
    return uglyNumbers[index - 1]
}

let t1 = new Date()
// log(getUglyNumber(1500))
let t2 = new Date()
// log(getUglyNumber_solution2(1500))
let t3 = new Date()

// log('m1:', t2 - t1)
// log('m1:', t3 - t2)

log('test')
