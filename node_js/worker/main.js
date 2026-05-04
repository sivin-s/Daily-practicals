const {Worker} = require('worker_threads');
console.log("Main thread : starting application");

const myWorker1 = new Worker('./worker.js') //  create (hire) a new worker;

// send data to the worker
myWorker1.postMessage("start the heavy calculation please");

// listen for the result coming back from the worker
myWorker1.on("message",(resultFromWorker)=>{
    console.log(`Main thread : ${resultFromWorker}`)
   
})

// Main thread keeps running
console.log("Main thread running!!")
