/*
 Q, find second largest
const nums = [5, 3, 8, 1, 19, 12, 7, 4, 6];
let firstLargest = nums[0];
let secondLarget = nums[0];
for(const ele of nums){
    if(ele > firstLargest){
        secondLarget = firstLargest;
        firstLargest = ele;
    }else if(ele > secondLarget){
        secondLarget = ele;
    }
}
console.log(firstLargest, secondLarget)
*/

/*
  Q, move zeros to end of the array? 
  
  const nums = [0, 1, 0, 3, 12];
let interPos = 0;
for(let i=0;i<nums.length;i++){
    if(nums[i] !== 0){
        [nums[i],nums[interPos]] = [nums[interPos],nums[i]];
        interPos++;
    }
} 
console.log(nums)
*/

/*
  Q, Find the maximum sum subarray?
  const nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
let max= -Infinity;    // O(n2)
for(let i=0;i<nums.length;i++){
       let sum = 0;
    for(let j=i;j<nums.length;j++){
        sum +=nums[j];
        if(sum > max){
            max = sum;
        }
    }
}
console.log(max);
Notice:  first take subarray from array(no creation) then sum the elements each time  check sum with prev max_sum value. 
so..
   ### Kandane's Algorithm -> O(n)  ###
   let max= -Infinity;
let curSum = 0;

for(let i=0;i<nums.length;i++){
    curSum += nums[i];
    if(curSum > max){
        max = curSum;
    }
    if(curSum < 0 ){
        curSum = 0;
    }
}

console.log(max);
*/

/*
  Q,  check if the string is a palindrome.

  const str = "racecar";
const res = (
  ()=>{
    let start=0;
let end= str.length-1;

while(start < end){
    if(str[start] != str[end]){
        return false;
    }
    start++;
    end--;
}
return true;
  }
)()
console.log(res)
*/

/*
  Q, reverse the string
const str = "the sky is blue";

let res='';
for(const word of str.split(' ')){
    res = word +" " + res
}

console.log(res.trim())
*/

/*
  Q, Check if the two strings are anagrams of each other.
  const str = "anagram";
const str2 = "nagaram";

const res =  ([...str].sort().join('')) === ([...str2].sort().join(''))
console.log(res)
## approach 2
const res = (()=>{
    const str1 = "anagram";
const str2 = "nagaram";
if(str1.length !== str2.length){
   return  false;
}
let freq={}
for(const char of str1){
     freq[char] = (freq[char] || 0)+1
}

console.log(freq)
for(const char of str2){
    if(freq[char] === 0){
        console.log(freq[char])
        return false;
    }
    freq[char]--;
    
}
return true;
console.log(freq)
})()
console.log(res)

*/