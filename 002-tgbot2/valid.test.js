import { add } from "./main.js";
import { assert, assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { writeNewTask } from "./main.js";
import { assertNotEquals } from "https://deno.land/std@0.224.0/assert/assert_not_equals.ts";

Deno.test("test 'add()' function", () => {
  const res = add(5, 7);
  assertEquals(res, 12);
});

Deno.test("test 'add()' function for string", () => {
  const res = add("privet", "Dima");
  assertEquals(res, "privetDima");
});

Deno.test("test priver", () => {
  let v1 = "privet";
  assertEquals(v1, "privet");
});

Deno.test("test objects", () => {
  let o1 = {
    a: 1,
    b: 2,
  };

  let o2 = {
    b: 2,
    a: 1,
  };

  assertEquals(o1, o2);
  //  assert(o1 === o2)
});

// Deno.test('writeNewTask', async () =>  {
//   // Deno.removeSync('tasks.txt')
//   // await writeNewTask('homework')
//   const contentOfTheFile = await Deno.readTextFile('tasks.txt')
//   console.log(contentOfTheFile)
//   assertEquals(contentOfTheFile, '"hom"ework"')
// })

async function gg1() {
  const obg = {
    city: "Moscow",
  };
  Deno.removeSync("tasks.txt");
  await writeNewTask(obg);
  const contentOfTheFile = await Deno.readTextFile("tasks.txt");
  console.log(contentOfTheFile);
  assertEquals(contentOfTheFile, '"city":"Moscow"');
}

Deno.test("this is a new test", gg1);


Deno.test('testFileContent' , () => {
  const textInFile = Deno.readTextFileSync('test_data.txt')
  assertEquals(textInFile, 'string1 /n string2')
})


Deno.test("maths", () => {
  const result = 7 + 2;
  assertEquals(result, 9)
})


 

// Deno.test("test mornningg greetings", ()) => {
//   assertEquals(greet(6), 'good morning')
// }
//https://chatgpt.com/share/67f97145-bd1c-8003-b46e-661e6d2b3347




 