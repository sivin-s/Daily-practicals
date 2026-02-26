import mongoose from "mongoose";


mongoose.connect(process.env.MONGODB_URI!);

mongoose.connection.on("connected",()=> console.log("Connected to MongoDB 💽"))
mongoose.connection.on("disconnected",()=> console.log("Disconnected from MongoDB"))
mongoose.connection.on("error",()=> {
    console.log("Error in connecting to MongoDB")
    process.exit(1)
})

export default mongoose

// error 
process.on("exit",(code)=>{
    console.log("Exit with code", code)
})
// clean 
process.on('SIGTERM', () => {
    console.log('Application is being terminated');
    mongoose.connection.close()
        .then(() => {
            console.log('Disconnected from MongoDB');
            process.exit(0);
        })
        .catch((error) => {
            console.error('Error closing MongoDB connection:', error);
            process.exit(1);
        });
});