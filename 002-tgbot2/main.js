import { assertEquals } from "https://deno.land/std@0.224.0/assert/assert_equals.ts";
import { Bot } from "https://deno.land/x/grammy/mod.ts"; 
const bot = new Bot("new Bot('AAE3IjbPSgyofDonX1nIDUkHz5hZpe9zcps');

bot.command("start", (ctx) => ctx.reply("You can fail ONLY after you had set a goal/plan/time/input/feedback."));

bot.on("message", (ctx) =>){
  console.log(ctx.message)
}


Deno.test("name test one", () => {
  assertEquals()
})


https://chatgpt.com/share/68027570-d55c-800e-8435-40d210edd81b 

// Deno.test("test mornningg greetings", ()) => {
//   assertEquals(greet(6), 'good morning')
// }


// export function add(abracadabra, y) {
//   return abracadabra + y;
// }

// export async function writeNewTask(task) {
//   const taskData = JSON.stringify(task, null, 2);
//   await Deno.writeTextFile("tasks.txt", taskData, { append: true });
// }
