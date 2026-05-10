class Node{
    constructor(data){
        this.data =data;
        this.next = null;
    }
}

class SingleLinkedList{
    constructor(){
        this.head = null;
    }
    append(data){
        if(!this.head){
            this.head = new Node(data);
            return;
        }
        let cur = this.head;
        while(cur.next){
            cur = cur.next;
        }
        cur.next = new Node(data);
    }
    printList(){
        let cur = this.head;
        while(cur){
            console.log(cur.data);
            cur = cur.next;
        }
    }
    prepend(data){
          if(!this.head){
            this.head = new Node(data);
            return;
          }
          let newNode = new Node(data);
          newNode.next = this.head;
          this.head = newNode;
    }
    delete(data){
        if(!this.head){
            return;
        }
        if(this.head.data === data){
            this.head = this.head.next;
            return;
        }
        let cur = this.head;
        while(cur && cur.next){
            if(cur.next.data === data){
                cur.next = cur.next.next;
            }
            cur = cur.next;
        }
    }
    find(data){
             let cur = this.head;
       while(cur){
          if(cur.data === data){
             return cur;
          }
          cur = cur.next;
       }
       return null;
    }
   insertAt(data,index){
    const newNode = new Node(data);
      if(index === 0){
          newNode.next = this.head;
          this.head = newNode;
          return;
      }
      let curIndex=0;
      let cur = this.head;
      while(cur){
        if(curIndex === index-1){
            newNode.next = cur.next;
            cur.next = newNode;
             return;
        }
        cur = cur.next;
        curIndex++;
      }
     
   }
   reverse(){
      let cur = this.head;
      let prev = null;
      while(cur){
       let next = cur.next // tmp
        cur.next = prev;
        prev = cur;
        cur = next;
      }
      this.head = prev;
   }
   size(){
       let len = 0;
     let cur = this.head;
     while(cur){
        cur = cur.next;
        len++;
     } 
     return len;
   }
   findMiddle(){
    //  let len = this.size();
    //  const middle = Math.floor(len/2);
    //  let cur = this.head;
    //  let curPosition = 0
    //  while(cur){
    //     if(curPosition === middle){
    //         return cur;
    //     }
    //     cur = cur.next;
    //     curPosition++;
    //  } 
    let slow = this.head;
    let fast = this.head;
    while(fast && fast.next){
        slow = slow.next;
        fast = fast.next.next;
    }
     return slow;
   }
   hasCycle(){
    /*
      fast and slow approach we use finding middle node and cycle.
    */
    const set = new Set()
    // let cur = this.head; // O(n)
    //  while(cur){
    //    if(set.has(cur)) return true;
    //    set.add(cur)
    //    cur = cur.next;
    //  }
    //  return false;
     let slow = this.head;
     let fast = this.head;
     while(fast && fast.next){
         slow = slow.next;
         console.log("s >", slow)
         fast = fast.next.next;
         console.log("f >", fast)
        //  console.log("<>",slow, fast)
         if(slow === fast){
             return  true;
         }
     }
     return false;
   }
   mergeSortedLists(l1,l2){
      const dummy = new Node(0);
      let cur = dummy;
      while(l1 && l2){
        cur.next = new Node(l1.data);
        cur.next.next = new Node(l2.data);
        l1 = l1.next;
        l2  = l2.next;
        cur = cur.next.next;
      }
      return dummy;
   }
   removeNthFromEnd(n){
      const dummy = new Node(0);
      dummy.next = this.head;
      let slow = dummy;
      let fast = dummy;
      for(let i=0;i<n;i++){
         fast = fast.next;
      }
      while(fast.next){
        slow = slow.next;
        fast = fast.next;
      }
     slow.next = slow.next.next;
     this.head = dummy.next;
   }
}

const sl = new SingleLinkedList();
sl.append(1);
sl.append(2);
sl.append(3);
sl.append(4);
sl.append(5);

sl.removeNthFromEnd(2);
sl.printList(); // 1 -> 2 -> 3 -> 5 -> null

 sl.removeNthFromEnd(1);
sl.printList(); // 1 -> 2 -> 3 -> null

 sl.removeNthFromEnd(3);
sl.printList(); // 2 -> 3 -> null

// merge sorted list
function mergeSortedLists(l1,l2){
     const dummy = new Node(0);
     console.log(l1)
     let cur = dummy;
     let p1= l1.head; // why i use p1 to extract linked list from the head;
     let p2= l2.head;
     while(p1 && p2){
        if(p1.data <= p2.data){
            cur.next = p1;
            p1 = p1.next;
        // }else if(l2.data <= l1.data){  // why i didnot use, because l2 or l1 will become null it cause error(undefined).
        }else{
            cur.next = p2;
            p2 = p2.next;
        }
        cur = cur.next;
     }
     cur.next = p1 || p2
 const result = new SingleLinkedList();
   result.head = dummy.next;
   return result; 
}

/*
  const sl = new SingleLinkedList();
sl.append(10);
sl.append(20);
sl.append(30);
sl.append(40);
sl.append(50);
console.log(sl.findMiddle().data); // 30

const sl2 = new SingleLinkedList();
sl2.append(10);
sl2.append(20);
sl2.append(30);
sl2.append(40);
console.log(sl2.findMiddle().data); // 30
*/

/*
  const sl = new SingleLinkedList();
sl.append(10);
sl.append(20);
sl.append(30);
sl.append(40);

sl.printList(); // 10 -> 20 -> 30 -> 40 -> null
sl.reverse();
sl.printList(); // 40 -> 30 -> 20 -> 10 -> null
*/

/*
  const sl = new SingleLinkedList();
sl.append(10);
sl.append(20);
sl.append(30);

sl.insertAt(99, 0);
sl.printList(); // 99 -> 10 -> 20 -> 30 -> null

sl.insertAt(55, 2);
sl.printList(); // 99 -> 10 -> 55 -> 20 -> 30 -> null

sl.insertAt(77, 10); // out of bounds
sl.printList(); // 99 -> 10 -> 55 -> 20 -> 30 -> 77 -> null
*/
/*
  const sl = new SingleLinkedList();
sl.append(10);
sl.append(20);
sl.append(30);
sl.append(40);

sl.delete(10); // delete head
sl.printList(); // 20 -> 30 -> 40 -> null

sl.delete(30); // delete middle
sl.printList(); // 20 -> 40 -> null

sl.delete(40); // delete tail
sl.printList(); // 20 -> null
*/

/*
const sl = new SingleLinkedList();
sl.append(10);
sl.append(20);
sl.append(30);
sl.prepend(5);
sl.prepend(1);
sl.printList();
*/

// const sl = new SingleLinkedList();
// sl.append(10);
// sl.append(20);
// sl.append(30);
// sl.append(40);
// // console.log(sl.hasCycle()); // false

// sl.head.next.next.next = sl.head.next; // [40].next → [20]
// console.log(sl.hasCycle()); // true

//const l1 = new SingleLinkedList();
//l1.append(1); l1.append(3); l1.append(5);

//const l2 = new SingleLinkedList();
//l2.append(2); l2.append(4); l2.append(6);

//const merged = mergeSortedLists(l1, l2);
//merged.printList(); // 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> null
//console.log(merged)


/*
   const sl = new SingleLinkedList();
sl.append(1);
sl.append(2);
sl.append(3);
sl.append(4);
sl.append(5);

sl.removeNthFromEnd(2);
sl.printList(); // 1 -> 2 -> 3 -> 5 -> null

sl.removeNthFromEnd(1);
sl.printList(); // 1 -> 2 -> 3 -> null

sl.removeNthFromEnd(3);
sl.printList(); // 2 -> 3 -> null
*/
