import express, { Request, Response } from "express";

import { fsService } from "./fs.service";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/users", async (req: Request, res: Response) => {
  try {
    const users = await fsService.read();
    res.json(users);
  } catch (e) {
    res.status(500).json(e.message);
  }
});

app.post("/users", async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const users = await fsService.read();
    const index = users.findIndex((user) => user.email === email);
    if (index !== -1) {
      return res.status(409).json("User with this email already exist");
    }

    const newUser = {
      id: users[users.length - 1].id + 1,
      name,
      email,
      password,
    };
    users.push(newUser);
    await fsService.write(users);

    res.status(201).json(newUser);
  } catch (e) {
    res.status(500).json(e.message);
  }
});

app.get("/users/:userId", async (req: Request, res: Response) => {
  try {
    const users = await fsService.read();
    const user = users.find((user) => user.id === +req.params.userId);
    if (!user) {
      return res.status(404).json("User not found");
    }
    res.json(user);
  } catch (e) {
    res.status(500).json(e.message);
  }
});

app.put("/users/:userId", async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const { name, email, password } = req.body;
    const users = await fsService.read();
    const user = users.find((user) => user.id === userId);
    if (!user) {
      return res.status(404).json("User not found");
    }
    if (name) {
      user.name = name;
    }
    if (email) {
      user.email = email;
    }
    if (password) {
      user.password = password;
    }
    await fsService.write(users);
    res.status(201).json(user);
  } catch (e) {
    res.status(500).json(e.message);
  }
});

app.delete("/users/:userId", async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const users = await fsService.read();
    const index = users.findIndex((user) => user.id === userId);
    if (index !== -1) {
      res.status(404).json("User deleted");
    }
    users.splice(index, 1);
    await fsService.write(users);
    res.sendStatus(204);
  } catch (e) {
    res.status(500).json(e.message);
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
