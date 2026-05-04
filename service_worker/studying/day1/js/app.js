
window.addEventListener("load",()=>{
    if("serviceWorker" in navigator){
    navigator.serviceWorker.register('../sw.js')
    .then((reg)=> console.log("sw registered successfully", reg))
    .catch((err)=> console.log("sw failed to registered", err))
}

})

