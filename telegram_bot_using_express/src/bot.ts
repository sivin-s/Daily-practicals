import {Bot} from 'grammy';
import 'dotenv/config';

const token = process.env.BOT_TOKEN;
if(!token) throw new Error("Bot token is missing");

export const bot = new Bot(token);

bot.on("message",async (ctx)=>{
  await ctx.reply(`You said : ${ctx.message.text}`)
})

// add commands menu etc......  here


export default bot