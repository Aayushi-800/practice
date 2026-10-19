import { Router } from "express";
import { body, validationResult } from "express-validator";
import { requireAuth } from "../middleware/authMiddleware.js";
import {
  getNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote
} from "../controllers/noteController.js";

const router = Router();

function validate(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Validation failed",
      errors: errors.array().map(({ path, msg }) => ({ field: path, message: msg }))
    });
  }
  next();
}

router.use(requireAuth);

router.get("/", getNotes);
router.get("/:id", getNoteById);
router.post(
  "/",
  [
    body("title").isString().trim().isLength({ min: 1, max: 150 }).withMessage("Title must be 1–150 characters."),
    body("content").optional().isString().isLength({ max: 20000 }).withMessage("Content must be at most 20,000 characters.")
  ],
  validate,
  createNote
);
router.patch(
  "/:id",
  [
    body("title").optional().isString().trim().isLength({ min: 1, max: 150 }).withMessage("Title must be 1–150 characters."),
    body("content").optional().isString().isLength({ max: 20000 }).withMessage("Content must be at most 20,000 characters.")
  ],
  validate,
  updateNote
);
router.delete("/:id", deleteNote);

export default router;