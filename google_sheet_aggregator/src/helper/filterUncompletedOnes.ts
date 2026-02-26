
interface SheetData{
    date: string;
    day: string;
    tasks: {
        [taskName: string] : string   // Dynamic key for task name and its status (completed property in js)
    }[]
}


// {
//   date: '2026-02-16',
//   day: '1',
//   tasks: [
//     { JavaScript: '🔴 not completed' },
//     { 'React-JS': '🔴 not completed' },
//     { Redux: '🔴 not completed' },
//     { 'DSA-Sorting': '🔴 not completed' },
//     { Grammar: '🔴 not completed' },
//     { Recursion: '🔴 not completed' }
//   ]
// }

export  const filterUnCompletedOnes =  (data: any):SheetData=>{

const rows = data.slice(1)

const heading = data.slice(0,1).flat().slice(2);


let reshapedData  = rows.map((row,i)=>{
    // row, inside more one column
   const tasks =  row.slice(2).map((col,j)=>{
         return {[heading[j]!] : col}
    })
    return {
        date: row[0], day: row[1], tasks
    }
})

const filteredData = reshapedData.map((cu)=>{
    // filtered task -> remove 'not completed'
   const tasks =  cu?.tasks.filter((cu)=>{
      const obj = Object.entries(cu)[0] 
      if(obj?.at(1)?.includes("not completed")){
         return true;
      }
   })
 if(tasks.length === 0){
    return null
 }
   return {
      ...cu, tasks      
   }
})
return filteredData
}
// console.log(reshapedData[0])