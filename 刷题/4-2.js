const log = console.log.bind(console);

/**
 * 最长回文子串
 */

/**
 * 我的思路: 滑动窗口
 * update right：'bab'
 * update left: 'aba'
 * update left: 'ba'
 * update left: 'a'
 * @param {*} s
 * 官方动态规划
 * dp 是否是以start为开始的回文字符串
 * dp[start, end] = s[start] === s[end] && dp[start + 1, end - 1]
 * (end - 1) - (start + 1) + 1 < 2 => end - start < 3
 * 长度小于三的直接判断开始和最后一个元素是否相等
 * 中心扩散法
 * 边界情况即为子串长度为 11 或 22 的情况。我们枚举每一种边界情况，并从对应的子串开始不断地向两边扩展。
 * 回朔法就不考虑了，回溯肯定是可行的。
 */
 var longestPalindrome = function(s) {
    let n = s.length;
    let res = '';
    let dp = Array.from(new Array(n),() => new Array(n).fill(0));
    for(let i = n-1;i >= 0;i--){
        for(let j = i;j < n;j++){
            dp[i][j] = s[i] == s[j] && (j - i < 2 || dp[i+1][j-1]);
            if(dp[i][j] && j - i +1 > res.length){
                res = s.substring(i,j+1);
            }
        }
    }
    return res;
};

const target = [['bab', 'aba'], 'bb', 'a', 'a']
const s1 = 'babad'
const s2 = 'cbbd'
const s3 = 'a'
const s4 = 'ac'

// log(longestPalindrome(s1))
// log(longestPalindrome(s2))
// log(longestPalindrome(s3))
// log(longestPalindrome(s4))

var threeSum = function(nums) {
    let ans = [];
    const len = nums.length;
    if(nums == null || len < 3) return ans;
    nums.sort((a, b) => a - b); // 排序
    for (let i = 0; i < len ; i++) {
        if(nums[i] > 0) break; // 如果当前数字大于0，则三数之和一定大于0，所以结束循环
        if(i > 0 && nums[i] == nums[i-1]) continue; // 去重
        let L = i+1;
        let R = len-1;
        while(L < R){
            const sum = nums[i] + nums[L] + nums[R];
            if(sum == 0){
                ans.push([nums[i],nums[L],nums[R]]);
                while (L<R && nums[L] == nums[L+1]) L++; // 去重
                while (L<R && nums[R] == nums[R-1]) R--; // 去重
                L++;
                R--;
            }
            else if (sum < 0) L++;
            else if (sum > 0) R--;
        }
    }
    return ans;
};
