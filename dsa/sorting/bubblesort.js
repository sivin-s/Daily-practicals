const arr = [3,1,4,5,6,2];
do{ //worst/average O(n2)  // best case O(n) -> optimize(flag)
   let swapped = false;
   for(let i=0;i<arr.length;i++){
       if(arr[i+1] < arr[i]){
         [arr[i],arr[i+1]] = [arr[i+1],arr[i]];
         swapped= true;
       }
   }
   if(!swapped){
      break;
   }
}while(true)
console.log(arr);