import express from 'express';
import {webhookCallback} from 'grammy'
import bot from './bot.js'
import 'dotenv/config';

const app = express();

app.use(express.json());

app.get("/",(req,res)=>{
    res.json({message: "bot testing..."})
})

const secretPath =  process.env.BOT_TOKEN

//app.use(`/${secretPath}`, webhookCallback(bot,"express")); // vercel deploy

// bot.api.deleteMyCommands();

bot.start().then(()=> console.log("bot running")) // localhost and instance 
.catch(console.log)

app.listen(8080,()=>{
    console.log("app is running on port ")
})

//export default app;   // for vercel deploy



