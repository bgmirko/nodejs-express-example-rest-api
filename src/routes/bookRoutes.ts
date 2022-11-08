import express from "express";
import type { Request, Response } from "express";
import { BookController } from "../controllers/bookController";

const router = express.Router();

router.get("/books", async (req: Request, res: Response) => {
  await BookController.getBooks(req, res);
});

router.post("/books/new", async (req: Request, res: Response) => {
  await BookController.createBook(req, res);
});

router.delete("/books/delete/:id", async (req: Request, res: Response) => {
  await BookController.deleteBook(req, res);
});

router.put("/books/update/:id", async (req: Request, res: Response) => {
  await BookController.updateBook(req, res);
});

export const bookRoutes = router;
