class Node{
    constructor(val){
        this.val=val;
        this.next= null;
    }
}

class Sl{
    constructor(){
        this.head= null;
    }
    add(val){
        if(!this.head){
            this.head = new Node(val);
            return;
        }
        let curr = this.head;
        while(curr.next){
            curr = curr.next;
        }
        // finally we found tail node
        curr.next = new Node(val);
    }
    /*
       add node to specific index;
    */
   size(){
    let cur = this.head;
    let count = 0;
    while(cur){
        cur = cur.next;
        count++;
    }
    return count;
   }
   addAt(index,val){
        if(index < 0 || index > this.size()){
              console.error("Invalid index");
              return;
        }
        const newNode = new Node(val);
        if(index === 0){
            newNode.next = this.head;
            this.head = newNode;
            return;
        }
        let cur =  this.head;
        for(let i=0;i<index-1;i++){
             cur = cur.next;
        }
        // console.log(cur.val)
        newNode.next = cur.next;
        cur.next = newNode;
   }
   print(){
    let cur = this.head;
    while(cur){
        console.log(cur.val)
        cur = cur.next;
    }
   }
   removeTop(){
     if(!this.head){
        console.log("Head is empty")
        return;
     }
     this.head = this.head.next;
   }
   removeEnd(){
      if(!this.head){
         console.log("Head is null") 
        return;
      }
      let cur = this.head;
      while(cur.next.next){
        cur = cur.next.next;
      }
     cur.next = null;
   }
   removeAt(index){
      if(!this.head){
           console.log("Head is null");
           return;
      }
      if(index === 0){
        this.head = this.head.next;
        return;
      }
      let cur = this.head;
      for(let i=0;i<index-1;i++){
          cur = cur.next;
      }
      cur.next = cur.next.next
   }
}

const sl = new Sl()
sl.add(4)
sl.add(24)
sl.add(49)
sl.add(9.4)
// sl.addAt(1,-10)
// sl.removeTop()
// sl.removeEnd()
sl.print()
sl.removeAt(2)
console.log("..............")
sl.print()



