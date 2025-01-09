import express from "express";
import { addMenu, editMenu } from "../controllers/menu.controller";
import upload from "../middlewares/multer";
import { isAuthenticated } from "../middlewares/isAuthenticated";

const router = express.Router();

// Apply `isAuthenticated` middleware globally to all routes
router.use(isAuthenticated);

// Routes
router.route("/").post(isAuthenticated, upload.single("image") addMenu);
router.route("/:id").post(isAuthenticated, upload.single("image") editMenu);

export default router;
