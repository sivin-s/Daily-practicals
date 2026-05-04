/*
   Q, Return only name of students in Capital.
*/

let students = [
    {name: "Anu", rollNumber: 31 , marks: 80},
    {name: "Jenny", rollNumber: 22, marks: -65},
    {name: "Anil", rollNumber: 33, marks: 22}
]

// console.log(students.map((cu)=> cu.name.toUpperCase()))

/*
  q2, Return only details of those who scored more than 60 marks
*/
// data is students below 
// console.log(students.filter((cu)=> cu.marks > 60))

/*
   q3, More than 60 marks and roll-number greater than 15
*/ 
// console.log(students.filter((cu)=> cu.marks > 60 && cu.rollNumber > 15))

/*
  q4, Sum of marks of all students
*/
// console.log(students.reduce((acc,cu)=> acc + cu.marks,0))

/*
  q5, Return only names of students who scored more than 60
*/
//   const res = students.filter((cu)=>cu.marks > 60)
//              .map((cu)=> cu.name)
//    console.log(res)

/*
  q6,  Return total marks for students with marks greater than 60
       after 20 marks have been added to those who scored less than 60
*/

const res = students.map((cu)=>{
    if(cu.marks < 60){
        cu.marks +=20;
    }
    return cu;
}).filter((cu)=> cu.marks > 60)
.reduce((acc,curr)=> acc+curr.marks,0)
console.log(res)