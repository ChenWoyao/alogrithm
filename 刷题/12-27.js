const log = console.log.bind(console)

/**
 * first angle char in str
 * char 是一个8位， 所以有256种可能
 */
const firstNotRepeatingChar = str => {
    if (str === null) {
        return ''
    }
    const hashTable = {}
    str.forEach(item => {
        hashTable[item] = hashTable[item] ? 1 : hashTable[item]++
    })
    return Object.keys(hashTable).find(key => hashTable[key] === 1)
}

/**
 * 1, 2, 3, 3, 3, 3, 4, 5 => 3 -> 4
 */

let count = 0

const getFirstK = (list, num, start, end, length) => {
    let len = list.length
    if (len === 1) {
        list[0] === num ? count++ : 0
    }
    let midIndex = Math.floor((end - start) / 2)
    let mid = list[midIndex]

    if (mid < num) {
        // 右边
        getFirstK(list, num, midIndex, end, length)
    }else if (mid === num) {
        // 正好找到
        let isFirst = list[midIndex - 1] !== num
        if (isFirst) {
            log('isFirst', midIndex)
            let index = midIndex
            while(index < length && list[index] === num) {
                index += 1
                count += 1
            }
            log(length, index, count, num, list[index])
        } else {
            // 不是第一个，继续二分找
            getFirstK(list, num, start, midIndex, length)
        }
    }else if (mid > num) {
        // 左边
        getFirstK(list, num, start, midIndex, length)
    }
}

const arr = [1, 2, 3, 3, 3, 3, 4, 4, 5 ]
getFirstK(arr, 3, 0, arr.length, arr.length)
log(count)

