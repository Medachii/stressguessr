"use server";
import { promises as fs } from 'fs';


export async function Read() {
    const file = await fs.readFile(process.cwd() + '/app/data.txt', 'utf8');
    return file;
  }

