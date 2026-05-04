const arr = [2,4,5,6,7,8];

// arr.map((cur,i,arr)=> cur);

Array.prototype.myMap = function(cb){
    const tmp = [];
    for(let i=0;i<this.length;i++){
        tmp.push(cb(this[i],i,this))
    }
    return tmp;
}

const newArr = arr.myMap((cu)=>cu*2)
console.log(newArr)