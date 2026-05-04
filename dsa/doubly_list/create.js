
class Node{
    constructor(val){
        this.val = val;
        this.next = null;
        this.prev = null;
    }
}

class DL{
    constructor(){
        this.head = null;
    }
    addFirst(val){
        const newNode = new Node(val);
        newNode.next = this.head;
        if(this.head){
            this.head.prev = newNode;
        }
        this.head = newNode;
    }
    addEnd(val){ 
        const newNode = new Node(val);
        if(!this.head ){
            this.head = newNode;
            return;
        }
        let cur = this.head;
        while(cur.next){
            cur = cur.next;
        }
        newNode.prev = cur;
        cur.next = newNode;
    }
   size(){
    let cur = this.head;
    let count = 0;
    while(cur){
        count++;
        cur = cur.next;
    }
    return count;
   }
    addAt(index,val){
        const newNode = new Node(val);
        if(index < 0 || index > this.size()){
            console.log("Invalid index")
            return;
        }
        if(index === 0){
            newNode.next = this.head;
            if(this.head){
                 this.head.prev = newNode;
            }
            this.head = newNode
        }

        let cur = this.head;
        for(let i=0;i<index-1;i++){
            cur= cur.next;
        }
        newNode.prev = cur;
        newNode.next = cur.next;
        if(cur.next){
            cur.next.prev=  newNode;
        }
        cur.next = newNode;
    }
    removeFirst(){
        if(!this.head){
            return;
        }
        this.head = this.head.next;
        if(this.head){
            this.head.prev = null;
        }
    }
    removeLast(){
        if(!this.head){
            return;
        }
        if(!this.head.next){ // only have head
            this.head = null;
            return;
        }
        let cur = this.head;
        while(cur.next.next){
            cur = cur.next;
        }
        cur.next = null;
    }
    size(){
        let count = 0;
        let cur = this.head;
        while(cur){
            count++;
            cur = cur.next
        }
        return count;
    }
    removeAt(index){
       if(!this.head){
        return;
       }
       if(index < 0 || index > this.size()){
        console.log("not of boundary");
            return;
       }
       let cur = this.head;
       for(let i=0;i<index-1;i++){
             cur = cur.next;
       }
       if(cur.next){
           cur.next = cur.next.next
           if(cur.next){
             cur.next.prev = cur;
           }
       }
       
    }
}
