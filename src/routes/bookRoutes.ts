import express from "express";
import type { Request, Response } from "express";
import { BookController } from "../controllers/bookController";
import { authenticateUserToken } from "../middleware/authenticateToken";
import { RequestCustom } from "../utils/types";
import { authorPermissionCreateBook } from "../middleware/authorPermissionCreateBook";


const router = express.Router();

router.get("/books", async (req: Request, res: Response) => {
  await BookController.getBooks(req, res);
});

router.post("/books/new", authenticateUserToken, authorPermissionCreateBook, async (req: Request, res: Response) => {
  await BookController.createBook(req, res);
});

router.delete("/books/delete/:id", authenticateUserToken, async (req: RequestCustom, res: Response) => {
  await BookController.deleteBook(req, res);
});

router.put("/books/update/:id", authenticateUserToken, async (req: RequestCustom, res: Response) => {
  await BookController.updateBook(req, res);
});

export const bookRoutes = router;
