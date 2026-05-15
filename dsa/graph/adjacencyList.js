class Graph{
    constructor(){
        this.adjacencyList={};
    }
    addVertex(vertex){
        if(!this.adjacencyList[vertex]){
            this.adjacencyList[vertex] = new Set();
        }
    }    
    addEdge(vertex1,vertex2){
       this.addVertex(vertex1);
       this.addVertex(vertex2);
       this.adjacencyList[vertex1].add(vertex2);
       this.adjacencyList[vertex2].add(vertex1);
    }
   bfs(startVertex){
    if(!this.adjacencyList[startVertex]){
        return [];
    }
      const queue = [startVertex];
      const visited = {};
      visited[startVertex] = true;
      const res = [];
      while(queue.length > 0){
            const cur = queue.shift();
            res.push(cur);
            this.adjacencyList[cur].forEach((neighbor)=>{
                 if(!visited[neighbor]){
                     visited[neighbor] = true;
                     queue.push(neighbor);
                 }
            })
      }
      return res;
   }
   dfs(startVertex){
    if(!this.adjacencyList[startVertex]){
        return [];
    }
    const visited = {};
    visited[startVertex] = true;
    const stack = [startVertex];
     const res = [];
     while(stack.length > 0){
        const cur = stack.pop();
        res.push(cur);
        this.adjacencyList[cur].forEach((neighbor)=>{
            if(!visited[neighbor]){
                visited[neighbor] = true;
                stack.push(neighbor);
            }
        })
     }
     return res;
   } 
}
const graph = new Graph();
graph.addEdge(1, 2);
graph.addEdge(1, 3);
graph.addEdge(2, 4);
graph.addEdge(3, 4);
graph.addEdge(4, 5);

console.log(graph.bfs(1))
console.log(graph.dfs(1))

// console.log(graph.adjacencyList);