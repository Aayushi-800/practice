import { Router } from "express";
import { body, validationResult } from "express-validator";
import { register, login, getMe } from "../controllers/authController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = Router();

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Validation failed",
      errors: errors.array().map(({ path, msg }) => ({ field: path, message: msg }))
    });
  }
  next();
};

router.post(
  "/register",
  [
    body("name").isString().trim().isLength({ min: 2, max: 80 }).withMessage("Name must be 2–80 characters."),
    body("email").isEmail().withMessage("Provide a valid email address.").normalizeEmail(),
    body("password").isString().isLength({ min: 8, max: 72 }).withMessage("Password must be 8–72 characters.")
  ],
  validateRequest,
  register
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Provide a valid email address.").normalizeEmail(),
    body("password").isString().notEmpty().withMessage("Password is required.")
  ],
  validateRequest,
  login
);

router.get("/me", requireAuth, getMe);

export default router;