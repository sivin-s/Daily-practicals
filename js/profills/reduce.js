const arr = [4,2,5,1,-3,3];

/*
  arr.reduce((acc,cu,i,arr)=>{
     return acc +=cu
    },0)
*/

Array.prototype.myReduce = function(cb,initialValue){
    // reduce iterate through left to right;
    // if no initialValue reduce take first value in array.
    let accumulator = initialValue;
    for(let i=0;i<this.length;i++){
        accumulator = accumulator ? cb(accumulator,this[i],i,this) : this[i];
     }
     return accumulator;
}

const res = arr.myReduce((acc,cu,i,arr)=>{
     return   acc +=cu  
},0)
console.log(res);