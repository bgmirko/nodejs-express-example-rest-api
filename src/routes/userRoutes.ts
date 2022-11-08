import express from "express";
import type { Request, Response } from "express";
import { UserController } from "../controllers/userController";

const router = express.Router();

router.get("/users", async (req: Request, res: Response) => {
  await UserController.getUsers(req, res);
});

router.post("/users/new", async (req: Request, res: Response) => {
  await UserController.createUser(req, res);
});

router.delete("/users/delete/:id", async (req: Request, res: Response) => {
  await UserController.deleteUser(req, res);
});

router.put("/users/update/:id", async (req: Request, res: Response) => {
  await UserController.updateUser(req, res);
});

export const userRoutes = router;
