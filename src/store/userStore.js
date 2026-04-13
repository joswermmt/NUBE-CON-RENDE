import { readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_PATH = join(__dirname, "../../data/users.json");

async function readUsers() {
  const raw = await readFile(DATA_PATH, "utf8");
  return JSON.parse(raw);
}

async function writeUsers(users) {
  await writeFile(DATA_PATH, JSON.stringify(users, null, 2), "utf8");
}

export async function findAll() {
  return readUsers();
}

export async function findById(id) {
  const users = await readUsers();
  return users.find((u) => u.id === id) ?? null;
}

export async function create(user) {
  const users = await readUsers();
  const nextId = users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1;
  const created = { ...user, id: nextId };
  users.push(created);
  await writeUsers(users);
  return created;
}

export async function update(id, patch) {
  const users = await readUsers();
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) return null;
  users[index] = { ...users[index], ...patch, id };
  await writeUsers(users);
  return users[index];
}

export async function remove(id) {
  const users = await readUsers();
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) return false;
  users.splice(index, 1);
  await writeUsers(users);
  return true;
}
