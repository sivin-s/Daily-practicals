const arr = [3,1,4,5,6,2];
function quick(arr){
  if(arr.length<=1) return arr;
   const pivot = arr[arr.length-1];
   const left=[];
   const right=[];
   for(let i=0;i<arr.length-1;i++){
     if(arr[i]<pivot){
       left.push(arr[i]);
     }else{
      right.push(arr[i])
     }
   }
   return [...quick(left),pivot,...quick(right)]
}
console.log(quick(arr))