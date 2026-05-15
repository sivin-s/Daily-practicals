const arr = [3,1,-4,5,6,2];
for(let i=0;i<arr.length;i++){
   let max = i;
   for(let j=i+1;j<arr.length;j++){
        if(arr[j] < arr[max]){
           max = j;
        }
   }
   if(i!==max){
      [arr[i],arr[max]] = [arr[max],arr[i]];
   }
}
console.log(arr)