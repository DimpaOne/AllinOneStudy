import { add } from "./main.js";
import { assert, assertEquals } from "https://deno.land/std/testing/asserts.ts";

Deno.test("test 'add()' function", () => {
  const res = add(5, 7);
  assertEquals(res, 12);
});

Deno.test("test 'add()' function for string", () => {
  const res = add("privet", "Dima");
  assertEquals(res, "privet Dima");
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
