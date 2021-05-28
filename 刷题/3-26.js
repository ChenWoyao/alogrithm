const log = console.log.bind(console);

function ListNode(val) {
    this.val = val;
    this.next = null;
}

var hasCycle = function (head) {
    let result = false;
    if (!head) return result;
    let slow = head;
    let quick = head.next;
    while (slow && quick !== slow && quick) {
        slow = slow.next;
        quick = quick.next.next;
    }
    if (quick === slow) {
        return true;
    }
    return result;
};

var detectCycle = function (head) {
    const set = new Set();
    let pos = -1;
    if (!head) return pos;
    while (head) {
        if (set.has(head)) {
            break;
        } else {
            set.add(head);
        }
        pos += 1;
        head = head.next;
    }
    return pos;
};

// head = [3,2,0,-4], pos = 1

/**
 * nums: 有序递增数组[1, 2, 3, 5, 8]
 */
var search = function (nums, target) {
    const len = nums.length;
    let left = 0;
    let right = len - 1;
    while (left <= right) {
        let mid = Math.floor(left + (right - left) / 2);
        if (nums[mid] === target) {
            return mid;
        } else if (target > nums[mid]) {
            left = mid + 1;
        } else if (target < nums[mid]) {
            right = mid - 1;
        }
    }
    return -1;
};


