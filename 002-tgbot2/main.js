export function add(abracadabra, y) {
  return abracadabra + y;
}

export async function writeNewTask(task) {
  const taskData = JSON.stringify(task, null, 2);
  await Deno.writeTextFile("tasks.txt", taskData, { append: true });
}
