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


/*
  Q, Find the maximum sum of any contiguous subarray of size k.
  const nums = [2, 1, 5, 1, 3, 2];
const k = 3;
let wSum = 0
let maxSum = 0;
for(let i=0;i<k;i++){
   wSum += nums[i];
}
maxSum = wSum;
for(let i=k;i<nums.length;i++){
    # Notice:: newWindowSum = oldWindowSum - elementLeaving + elementEntering
    wSum = (wSum - nums[i-k]) + nums[i];
    maxSum = Math.max(maxSum, wSum)
}
console.log(wSum,maxSum)
*/

/*
  Q,  Find the length of the longest substring without repeating character.
const str = "abcabcbb";
let longestSub = 0;
const set = new Set();
for(let s=0;s<str.length;s++){
    for(let e=s;e<str.length;e++){
            console.log(set)
           if(set.has(str[e])){
               break;
           }else{
               set.add(str[e])
           }
    }
    longestSub = Math.max(longestSub,set.size)
}
console.log(longestSub);
const str = "abcabcbb";
let longestLengthOfString = 0;
let startOfWindow = 0;
let currentOfWindow = 0;
const  characterSet = new Set();
while(currentOfWindow < str.length){
    if(characterSet.has(str[currentOfWindow])){
        characterSet.delete(str[startOfWindow++])
    }else{
        characterSet.add(str[currentOfWindow++]);
    }
    longestLengthOfString = Math.max(longestLengthOfString,characterSet.size)
}

console.log(longestLengthOfString)
*/

/*
 Q, Rotate the array to the right by k steps in place.
const nums = [1, 2, 3, 4, 5];
const k = 2;
for(let i=0;i<k;i++){
   nums.unshift(nums.pop()) 
}
console.log(nums)
## space complexity 2nd method

function reverse(start,end){
   console.log(end)
   while(start < end){
     [nums[start],nums[end]] = [nums[end],nums[start]];
      start++;
      end--;
   }
}
reverse(0,nums.length-1) // reverse entire array
console.log(nums)
reverse(0,k-1)  // reverse first k elements
reverse(k,nums.length-1) // reverse the remaining elements(from k to end)
console.log(nums)

*/

/*
  Q, Transform this array into an object where each id is the key;
  const students = [
  { id: 1, name: "Alice", grade: 85 },
  { id: 2, name: "Bob", grade: 92 },
  { id: 3, name: "Charlie", grade: 78 }
];
const obj = {}
for(const ele of students){
    obj[ele.id] = {name: ele.name, grade: ele.grade}  
}
console.log(obj)
const students = [
  { id: 1, name: "Alice", grade: 85 },
  { id: 2, name: "Bob", grade: 92 },
  { id: 3, name: "Charlie", grade: 78 }
];
const res = students.reduce((acc,cu)=>{
   acc[cu.id] = {name:cu.name,grade:cu.grade}
   return acc;
},{})
console.log(res)
*/

/*
  // Task: Using a single chain — filter only in-stock items,
//  apply a 10% discount to their price, and
//  return an array of strings like:
const inventory = [
  { product: "laptop", price: 999, inStock: true },
  { product: "phone", price: 499, inStock: false },
  { product: "tablet", price: 299, inStock: true },
  { product: "watch", price: 199, inStock: false }
];
  ####
  100%-10% = 90%;
  90/100= 0.9 -> ratio
   discount = price * 0.9
  ###

 const res = inventory.filter((cu)=> cu.inStock)
     .map((cu)=> `${cu.product}: $${(cu.price*0.9).toFixed(2)}`)
 console.log(res)

*/

/*
 Q, Flatten a Nested Array
   const nested = [1, [2, 3], [4, [5, 6]], [7, [8, [9]]]];
function flat(nested,temp=[]){
    for(const ele of nested){
        if(Array.isArray(ele)){
            flat(ele,temp)
        }else{
             temp.push(ele)
        }
    }
    return temp;
}
console.log(flat(nested))
or
const flat = (arr) => arr.reduce((acc, cu) => 
    Array.isArray(cu) ? acc.concat(flat(cu)) : [...acc, cu]
, []);
*/

/*
Q,  Deep Object Comparison.
const obj1 = { name: "Alice", address: { city: "NY", zip: "10001" }};
const obj2 = { name: "Alice", address: { city: "NY", zip: "10001" } };

 console.log(JSON.stringify(obj1)===JSON.stringify(obj2))

function deepEqual (obj1,obj2){
    ## Notice it checking only deep(case of object nested) it not related to keys names.
    ## check the any of the params is primitive; (to skip primitive value)
   if(typeof obj1 !== 'object' || typeof obj2 !== 'object'){
       return obj1 === obj2;
   }
   ## same keys
   if(Object.keys(obj1).length === Object.keys(obj2).length){
      return true;
   }
   
   for(const key of Object.keys(obj1)){
       if(!deepEqual(obj1[key],obj2[key])){
         return false;
       }
   }
   return true;
   
}
const res = deepEqual(obj1,obj2)
console.log(res)
*/

/*
  // Q, Task: Return the most frequent character. Ignore spaces.
const str = "hello world";
const freq = {};
for(const char of str){
    if(char === ' ') continue;
    freq[char] = (freq[char] || 0) + 1
}
let max = 0;
let char = ''
for(const [key,value] of Object.entries(freq)){
    if(value > max){
        max = value;
        char = key
    }
}
console.log(max,freq,char)
*/

/*
  ## Q, Task: Capitalize the first letter of every word.
const str = "Hello World this is JavaScript";
let res = ''
for(const word of str.split(' ')){
    res += word.at(0).toUpperCase() + word.substring(1) + " ";
}
console.log(res)

*/

/*
  # Q, Task: Remove all duplicates and return only numbers that appear exactly once.
const nums = [1, 2, 2, 3, 4, 4, 5, 5, 5];
const freq={};
for(const ele of nums){
    freq[ele] = ( freq[ele] || 0 ) + 1;
}
let res = Object.entries(freq).filter(([k,v])=> v === 1).map((cu)=> parseInt(cu));
console.log(res)
*/

/*
# Task: Find the most frequent word in the sentence.
const sentence = "the cat sat on the mat by the cat";
const freq = new Map();
for(const word of sentence.split(' ')){
    freq.set(word,(freq.get(word)||0)+1)
}
let max = 0;
let word = ''
freq.forEach((v,k)=>{
    console.log(v,k)
     if(v > max){
        max= v;
        word= k;
     }
})
console.log(word)
*/

/*
 # Task: The array is sorted. Find the index of target using binary search.
const nums = [1, 3, 5, 7, 9, 11];
const target = 9;
function binarySearch(nums,target,left=0,right=nums.length-1){
    if(left > right) return -1; // base case and guarding out bound index;
    const mid  = Math.floor((left+right)/2);
    if(nums[mid] === target){
        return mid;
    }
    if(target < nums[mid]){
        return binarySearch(nums,target,left,mid-1);
    }else{
        return binarySearch(nums,target,mid+1,right);
    }
}
console.log(binarySearch(nums,target))

*/

/*
  Task: In a single chain:

Keep only active users
Sort them by score descending
Return only their names

Expected output: ["Diana", "Alice", "Charlie"]

const users = [
  { id: 1, name: "Alice", active: true, score: 85 },
  { id: 2, name: "Bob", active: false, score: 92 },
  { id: 3, name: "Charlie", active: true, score: 78 },
  { id: 4, name: "Diana", active: true, score: 95 },
  { id: 5, name: "Eve", active: false, score: 88 }
];
const reShapedData = users.filter((cu)=> cu.active)
                  .sort((a,b)=> b.score-a.score)
                  .map((cu)=> cu.name)
console.log(reShapedData)
*/

/*

*/