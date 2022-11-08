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

router.post('/users/login', async(req: Request, res: Response)=> {
  await UserController.loginUser(req,res);
})

router.post('/users/refresh_token', async(req: Request, res: Response) => {
  await UserController.refreshToken(req, res);
})

export const userRoutes = router;
