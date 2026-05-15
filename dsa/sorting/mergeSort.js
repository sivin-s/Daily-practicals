function mergeSort(arr){
   if(arr.length < 2) return arr;
   const middle = Math.floor(arr.length/2);
   const left = mergeSort(arr.slice(0,middle))
   const right = mergeSort(arr.slice(middle))
   return merge(left,right)
}
function merge(left,right){
  const tmp=[];
  while(left.length && right.length){
     if(left[0] < right[0]){
        tmp.push(left.shift())
     }else{
       tmp.push(right.shift())
     }
  }
  return [...tmp,...left,...right]
}
console.log(mergeSort(arr))