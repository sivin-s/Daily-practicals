const {spawn} = require('child_process')

console.log("Main process: starting child..")

// spawn a new node process to run script.js
const child = spawn('node',['script.js']);

// unique id
console.log("Main process PID:"+process.pid)
console.log("Child process PID:"+child.pid)

// capture the output from the child
child.stdout.on("data",(data)=>{
    console.log("child said : "+data)
})

child.stderr.on("data",(err)=>{
    console.log("child said error :"+ err)
})

// know when the child stops
child.on('close',(code)=>{
    console.log('child process stopped with code: '+code)
})

