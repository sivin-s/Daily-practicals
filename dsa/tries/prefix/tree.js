class TrieNode{
  constructor(){
     this.children={};
     this.isEndOfTheWord=false;
  }
}
class Trie{
  constructor() {
    this.root = new TrieNode();
  }
  add(word){
      let cur = this.root;
      for(const char of word){
           if(!cur.children[char]){
               cur.children[char] =  new TrieNode();
           }
           cur = cur.children[char];
      }
      cur.isEndOfTheWord = true;
  }
  search(word){
     let cur = this.root;
     for(const char of word){
         if(!cur.children[char]){
            return false;
         }
         cur = cur.children[char]
     }
     return cur.isEndOfTheWord;
  }
  prefix(word){
    let cur = this.root;
    for(const char of word){
       if(!cur.children[char]){
           return false;
       }
       cur = cur.children[char];
    }
    return true;
  }
}

const t =  new Trie();
t.add("hello")
t.add("hello world")
t.add("world")
// console.log(t);

function autoSuggest(node,word){
   let cur = node;
   for(const char of word){
       if(!cur.children[char]){
           return false;
       }
       cur = cur.children[char];
   }
   const tmp = [];
   collect(cur,word,tmp)
   return tmp;
}
function collect(node,word,tmp){
   if(node.isEndOfTheWord){
      tmp.push(word);
   }
   for(const char in node.children){
       collect(node.children[char],word+char,tmp)
   }
}
console.log(autoSuggest(t.root,"world"))