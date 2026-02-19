/*
 1. You have an array of numbers: [3, 7, 2, 9, 4].
 How would you find the largest number in this array using JavaScript?
*/
function largestNumber(arr = [3, 7, 2, 9, 4]) {
  // return Math.max.apply(null,arr)
  // return Math.max(...arr)
  let max = arr[0]; // O(1)
  for (let i = 1; i < arr.length; i++) {
    // O(n)
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  return max;
}
// console.log(largestNumber())

/*
  2. you want to find the second largest number in the array.
   How would you modify your function?
*/
function secondLargestNumber(arr = [1, 2, 3, 4, 5]) {
  // 1. arr.sort((a,b)=> b-a)[1]
  // 2.
  //    let largest = -1
  //    let secondLargest = -1;
  //    for(const ele of arr){
  //       if(ele>largest){
  //         largest = ele
  //       }
  //    }
  //    console.log(largest)
  //    for(const ele of arr){
  //      if(ele > secondLargest && ele !== largest){
  //         secondLargest = ele
  //      }
  //    }
  //    console.log(secondLargest, largest)
  // 3.
  let largest = -1,
    secondLargest = -1; // O(1)
  for (let i = 0; i < arr.length; i++) {
    // O(n)
    if (arr[i] > largest) {
      secondLargest = largest;
      largest = arr[i];
    }
  }
  console.log(secondLargest, largest);
}
// secondLargestNumber()
/*
  3.  How would you find the third largest number in the array using a single pass?
*/
function thirdLargestNumber(arr = [1, -3, 200, 40, 5]) {
  // O(n)
  let largest = -1,
    secondLargest = -1,
    thirdLargestNumber = -1; // O(1)
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > largest) {
      thirdLargestNumber = secondLargest;
      secondLargest = largest;
      largest = arr[i];
    }
  }
  console.log(thirdLargestNumber);
}
// thirdLargestNumber()

/*
 4. how would you write a function to find the n-th largest number in an array (dynamic)
*/
function nThLargestNumber(arr = [3, 2, 1, 4, 5, 7, 6, null], n = 5) {
  return arr.sort((a, b) => b - a)[n - 1];
}
// console.log(nThLargestNumber())

/*
  5. How would you write a function to find the n-th largest number without sorting or loops?
*/

function nThLargestNumberRecursion(arr = [3, 20, 4, 5, 2, 1], n = 1) {
  let max;
  for (let i = 0; i < n; i++) {
    max = Math.max(...arr);
    arr = arr.filter((cu) => cu !== max);
  }
  return max;
}
// console.log(nThLargestNumberRecursion())

/*
  ## Notice: You’re building a user management system.
   You have an array of user objects, and you need to filter out users who are inactive (isActive: false) or have an invalid email (missing @).
  6. Write a function called getValidUsers that takes an array of users and 
   returns a new array containing only valid users (active + valid email).
*/
// const users = [
//   { name: "Alice", isActive: true, email: "alice@example.com" },
//   { name: "Bob", isActive: false, email: "bob@example.com" },
//   { name: "Charlie", isActive: true, email: "invalid-email" },
//   { name: "Diana", isActive: true, email: "diana@example.com" },
// ];

function getValidUsers(users) {
  return users.filter((cu) => cu?.email.includes("@") && cu?.isActive);
}
// console.log(getValidUsers(users))

/*
7. Transforming Data for APIs
Scenario:
You’re working on a dashboard that displays product names in uppercase. You have an array of product objects, and you need to transform it into an array of uppercase product names.
Task:
Write a function called getUppercaseProductNames that takes an array of products and returns a new array of product names in uppercase.
*/
const products = [
  { id: 1, name: "laptop" },
  { id: 2, name: "phone" },
  { id: 3, name: "tablet" },
];
/**
 * @param {Array} products
 */
function getUppercaseProductNames(products) {
  return products.map((cu) => cu?.name.toUpperCase());
}
// console.log(getUppercaseProductNames(products))

/*
  8. Scenario:
You’re analyzing sales data. You have an array of order objects, each with a price and quantity. Calculate the total sales (sum of price * quantity for all orders).
Task:
Write a function called calculateTotalSales that takes an array of orders and returns the total sales.
*/
const orders = [
  { price: 10, quantity: 2 },
  { price: 5, quantity: 3 },
  { price: 15, quantity: 1 },
];
/**
 * @param {Array} orders
 */
function calculateTotalSales(orders) {
  return orders.reduce((acc, cu, i) => {
    return (acc += cu?.price * cu?.quantity);
  }, 0);
}
// console.log(calculateTotalSales(orders))

/*
  9.  Finding the First Matching User
Scenario:
You’re building an admin panel and need to find the first user with the role "admin".
Task:
Write a function called findAdmin that takes an array of users and returns the first user object where role === "admin".
*/
const users = [
  { name: "Alice", role: "user" },
  { name: "Bob", role: "admin" },
  { name: "Charlie", role: "user" },
];
/**
 * @param {Array} users
*/
function findAdmin(users){
   return users.find((cu)=> cu.role === "admin")
}
console.log(findAdmin(users))
/*
  10. Scenario:
You’re building a task manager and need to verify if all tasks in an array are marked as completed (completed: true).
Task:
Write a function called areAllTasksComplete that takes an array of tasks and returns true if all tasks are completed, otherwise false.
*/
const tasks = [
    { id: 1, completed: true },
    { id: 2, completed: true },
    { id: 3, completed: false },
];
/**
 * @param {Array} tasks
*/
function areAllTasksComplete(tasks){
   return tasks.every((cu)=> cu.completed)
}
// console.log(areAllTasksComplete(tasks))

/*
  11. Scenario:
You’re generating a sentence from an array of words for a chatbot response.
Task:
Write a function called buildSentence that takes an array of words and returns a single string with the words joined by spaces.
*/
const words = ["Hello", "world", "from", "JavaScript"];
/**
 * @param {Array} words 
*/
function buildSentence(words){
    return words.join(' ')
}
console.log(buildSentence(words))