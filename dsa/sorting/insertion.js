const arr = [3,1,4,5,6,2];
function insertion(arr){
   let i=1;
   while(i < arr.length){
       let key = arr[i]; // tmp , insertion position
       let j= i-1;
       while(j >= 0 &&  arr[j] > key){
           arr[j+1] = arr[j];
           j--;
       }
       arr[j + 1] = key;
       i++;
   }
   return arr;
}
console.log(insertion(arr))