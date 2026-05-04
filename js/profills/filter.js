const arr = [2,4,5,null,7,8];

// arr.filter((cu,i,arr)=>{
    //    return true
 // })

Array.prototype.myFilter = function(cb){
   const tmp = [];
   for(let i=0;i<this.length;i++){
      const val =  cb(this[i],i,arr)
       if(Boolean(val)){
           tmp.push(val)
       }
   }
   return tmp;
}

const res = arr.myFilter((cur,i,arr)=>{
    if(cur%2===0){
        return cur;
    }
})
console.log(res)