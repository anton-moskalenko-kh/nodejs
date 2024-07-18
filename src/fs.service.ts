import fs from "node:fs/promises";
import path from "node:path";

import { IUserInterface } from "./interfaces/user.interface";

const pathToDb = path.join(process.cwd(), "db.json");

class FsService {
  public async read(): Promise<IUserInterface[]> {
    const json = await fs.readFile(pathToDb, "utf-8");
    return json ? JSON.parse(json) : [];
  }
  public async write(users: IUserInterface[]): Promise<void> {
    await fs.writeFile(pathToDb, JSON.stringify(users));
  }
}

export const fsService = new FsService();
