class MinHeap{
  constructor(){
     this.heap=[]
  }
  parentIndex(index){
    return Math.floor((index-1)/2);
  }
  leftIndex(index){
    return (2*index + 1)
  }
  rightIndex(index){
    return (2*index + 2)
  }
  swap(index1,index2){
    [this.heap[index1],this.heap[index2]] = [this.heap[index2],this.heap[index1]];
  }
  heapifyUp(index){
    while(index > 0){
       let parentIndex = this.parentIndex(index);
       if(this.heap[parentIndex]<=this.heap[index]){
          break;
       }
       this.swap(parentIndex, index);
      index =  parentIndex;
    }
  }
  add(value){
    this.heap.push(value);
    this.heapifyUp(this.heap.length-1)
  }
  heapifyDown(index){
    while(true){
        let leftIndex = this.leftIndex(index);
        let rightIndex = this.rightIndex(index);
        let minIndex = index;
        if(leftIndex < this.heap.length && this.heap[leftIndex] < this.heap[minIndex]){
          minIndex = leftIndex;
        }
        if(rightIndex < this.heap.length && this.heap[rightIndex] < this.heap[minIndex]){
          minIndex =  rightIndex;
        }
        if(minIndex === index){
           break;
        }
        this.swap(index, minIndex)
        index = minIndex;
    }
  }
  delete(){
    if(this.heap === undefined) return [];
    if(this.heap.length === 1) return this.heap.pop()
    const val =  this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown(0)
    return val;
  }
  isEmpty(){
    return this.heap.length === 0;
  }
}

function heapSort(arr){
  const min = new MinHeap()
   arr.forEach((cu)=>{
      min.add(cu)
   })
   while(!min.isEmpty()){
    console.log(min.delete())
   }
}
heapSort([1,5,3,-2,4])