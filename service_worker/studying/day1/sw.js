
self.addEventListener("install",(e)=>{
    console.log("sw installed ", e)
})

self.addEventListener("activate",(e)=>{
    console.log("sw activate", e)
})