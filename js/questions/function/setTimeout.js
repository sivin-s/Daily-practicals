//  what is the output of 'i' 

for(let i=0;i<5;i++){
    setTimeout(function(){
        console.log(i)
    },i * 1000)
}// here i give 1,2,3,4,5 -> in sequently

for(var i=0;i<5;i++){
    setTimeout(function(){
        console.log(i)
    },i*1000)
} /*
   1.  here i give 5
   2.  var doesn't have block scope
   3.  for loop is synchronous and setTimeout is asynchronous fn, therefore var is globally - 
   when async fn calls after timeout in 'var i' become '5';
*/ 