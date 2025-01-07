import express from "express";
import {
  createResturant,
  getResturant,
  getResturantOrder,
  getSingleResturant,
  searchResturant,
  updateOrderStatus,
  updateResturant,
} from "../controllers/resturant.controller";
import upload from "../middleware/multer";
import { isAuthenticated } from "../middleware/isAuthenticated";

const router = express.Router();

// Routes
router
  .route("/")
  .post(upload.single("imageFile"), createResturant)
  .get(getResturant)
  .put(upload.single("imageFile"), updateResturant);

router.route("/order").get(getResturantOrder);
router.route("/order/:orderId/status").put(updateOrderStatus);
router.route("/search/:searchText").get(searchResturant);
router.route("/:id").get(getSingleResturant);

export default router;
