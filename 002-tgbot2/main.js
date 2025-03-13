export function add(abracadabra, y) {
  return abracadabra + y;
}

export async function writeNewTask(task) {
  try {
    const taskData = JSON.stringify(task, null, 2);
    await Deno.writeTextFile("tasks.json", taskData, { append: true });
    return true;
  } catch (error) {
    console.error("Error writing task:", error);
    return false;
  }
}
