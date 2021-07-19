const log = console.log.bind(console)
/**
# 根据身高重建队列
[题目来源](https://leetcode-cn.com/problems/queue-reconstruction-by-height/)
[[5, 0]]-> [[5, 0], [null], [5, 2],  null, [4, 4],  [7, 1]]
-> [[5, 0], [7, 0], [5, 2], [6, 1], [4, 4],  [7, 1]]

pepole = [[7,0],[4,4],[7,1],[5,0],[6,1],[5,2]]
=> 先h排序, 再k排序
=> [[4, 4], [5, 2], [5, 0], [6, 1], [7, 1], [7, 0]]
7个人没有排序
=> [null, null, null, null, null, null]
h:4的person前面有比我高的有4个，那么我肯定是是未排坑位的第四个坑
=> [null, null, null, null, [4, 4], null]
h:5的person,前面2个比我高，那么我肯定是是未排坑位的第三个坑
=> [[5, 0], null, [5, 2], null, [4, 4], null]
h:6,前面有一个人比我高， 那么我肯定是是未排坑位的第二个坑
=> [[5, 0], null, [5, 2], null, [4, 4], null]
=> [[5, 0], [7, 0], [5, 2], [6, 1], [4, 4], [7, 1]]
思路:
step1: 先h排序，再k排序
一次遍历排序后得数组，按照它的k属性，和未排坑位，决定他的位置
*/

const reconstructQueue = pepole => {
    const people = pepole.sort((cur, next) => {
        if (cur[0] - next[0] === 0) {
            return 0 - (cur[1] - next[1])
        }
        return cur[0] - next[0]
    })
    const unsorted = new Array(people.length).fill(null)
    pepole.forEach(person => {
        let [height, position] = person.slice()
        // log('height, position', height, position)
        for (let i = 0; i < unsorted.length; i++) {
            if (!unsorted[i]) {
                if (position === 0) {
                    unsorted[i] = person
                    break
                }
                position -= 1
            }
        }
        // log('unsorted', unsorted)
    })
    return unsorted
}


/*
# 盛最多水的容器
[题目来源](https://leetcode-cn.com/problems/container-with-most-water/)
思路:
[1,8,6,2,5,4,8,3,7]
双指针: left: lindex, right: rindex, value: min(lval, rval) * (rindex - lindex)
*/

const maxArea = function (height) {
    let [left, right] = [0, height.length - 1]
    let result = 0
    while (left < right) {
        const [lval, rval] = [height[left], height[right]]
        result = Math.max(result, Math.min(lval, rval) * (right - left))
        if (lval <= rval) {
            left++
        } else {
            right--
        }
    }
    return result
}

const result = [1, 8, 6, 2, 5, 4, 8, 3, 7]
log(maxArea(result))

/**
 * # 每日温度
 * [题目来源](https://leetcode-cn.com/problems/daily-temperatures/)
 * 使用单调栈来维护一个单调区间
 */

 var dailyTemperatures = function(temperatures) {
    const length = temperatures.length
    const [stack, ans] = [[], new Array(length).fill(0)]
    for (let i = 0; i < length; i++) {
        let cur = temperatures[i]
        let intervalMax = temperatures[stack.slice(-1)[0]]
        // log('cur', `(${i})${cur}`, 'intervalMax', `(${stack.slice(-1)[0]})${intervalMax}`)
        while(stack.length && cur > temperatures[stack.slice(-1)[0]]) {
            let top = stack.pop()
            ans[top] = i - top
            // log('expect', top, ans[top])
        }
        stack.push(i)
    }
    return ans
};

temperatures = [73,74,75,71,69,72,76,73]
log(dailyTemperatures(temperatures))
