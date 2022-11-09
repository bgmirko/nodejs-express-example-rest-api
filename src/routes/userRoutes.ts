import express from "express";
import type { Request, Response } from "express";
import { UserController } from "../controllers/userController";
import { authenticateUserToken } from "../middleware/authenticateToken";
import { isAdmin } from "../middleware/isAdmin";
import { RequestCustom } from "../utils/types";

const router = express.Router();

router.get("/users", async (req: Request, res: Response) => {
  await UserController.getUsers(req, res);
});

router.post("/users/new", authenticateUserToken, isAdmin, async (req: Request, res: Response) => {
  await UserController.createUser(req, res);
});

router.delete("/users/delete/:id", authenticateUserToken, isAdmin, async (req: Request, res: Response) => {
  await UserController.softDeleteUser(req, res);
});

router.put("/users/update/:id", authenticateUserToken, isAdmin, async (req: Request, res: Response) => {
  await UserController.updateUser(req, res);
});

router.post("/users/deactivate", authenticateUserToken, async (req: RequestCustom, res: Response) => {
  await UserController.deactivateUser(req, res);
});

router.post('/users/login', async(req: Request, res: Response)=> {
  await UserController.loginUser(req,res);
})

router.post('/users/refresh_token', async(req: Request, res: Response) => {
  await UserController.refreshToken(req, res);
})

export const userRoutes = router;
