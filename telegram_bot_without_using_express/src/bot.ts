import {Bot, InputFile, webhookCallback} from 'grammy'
import 'dotenv/config'
import path from 'node:path';

const token = process.env.BOT_TOKEN;

if(!token) throw new Error("Bot token is missing");

const bot = new Bot(token);

bot.use((ctx,next)=>{
    if(!ctx.message) return
    console.log(ctx.message.text);
    next()
})

// commands menu
await bot.api.setMyCommands([
    {command: "start",description: "start the bot"},
    {command: "clear",description: "clear the message"},
    {command: "send",description: "get the file"}
])


// auto delete message
bot.command("clear", async(ctx)=>{
    const msg = await ctx.reply("This message will self-destruct in 5 seconds ⌛")
    setTimeout(async()=>{
        try {
             await ctx.api.deleteMessage(ctx.chatId,msg.message_id)
        } catch (error) {
            console.error("Failed to delete message :", error)
        }
    },5000)
})

bot.command("start", async(ctx)=>{
    await  ctx.reply("Hello test ok...")
})

bot.command("send", async(ctx)=>{
    // Batch -> Read a file with 50 user IDs and send messages to all.
    // inputfile() allow batch processing of files in execution at onces ->  for large files
//    console.log( path.resolve(import.meta.dirname,"../text.txt"))
   try {
    const msg1 =  await ctx.reply("this file delete with in 2s")
     const msg2 =    await ctx.replyWithDocument(new InputFile(path.resolve(import.meta.dirname,"../text.txt"),"hello.txt"),{caption: "Text file"})
        setTimeout(async()=>{
            try {
                await ctx.api.deleteMessages(ctx.chatId, [msg1.message_id,msg2.message_id])
            } catch (error) {
                console.error("Failed to delete message " , error)
            }
        },2000)
   } catch (error) {
        console.log(error)
   }
})
bot.on("message:text", async(ctx)=>{
     await ctx.react("❤‍🔥")
    await ctx.reply("You said !! : "+ ctx.message.text)
    await ctx.replyWithPoll("Poll",["Option 1","Option 2","Option 3"])
    await ctx.replyWithAnimation("https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExempscWxtY3YxcDB5dmpnYXQxcmo3MmxwdHF5OWdjMHpqN3ZzaGpkMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/FY8c5SKwiNf1EtZKGs/giphy.gif",
        {caption:"Gif",protect_content:true,has_spoiler:true,duration: 10})
})


//export default webhookCallback(bot, "https") // only for vercel.


bot.start().then(()=>{   // localhost or instances - long polling -> " is like server denys the respond to user "
    console.log("Bot started (long polling)");
})
