const {parentPort} = require('worker_threads');

// listen for a message from the main thread
parentPort.on("message",(dataFromMain)=>{ 
    console.log(`Worker receive: ${dataFromMain}`);
    //simulate a heavy task
    let result=0;
    for(let i=0;i<1e9;i++){
        result+=i;
    }
   // send the result back to the main thread;
   parentPort.postMessage(`Task Done! Result is: ${result}`)
   process.exit(0)
})
