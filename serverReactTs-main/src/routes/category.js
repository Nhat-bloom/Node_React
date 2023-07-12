import express from "express";
import {
  create,
  getAll,
  getOne,
  remove,
  update,
} from "../controllers/category";
import { checkPermission } from "../middleware/checkPermission";

const router = express.Router();

router.get("/categories", getAll);
router.get("/categories/:id", getOne);
router.post("/categories", checkPermission, create);
router.delete("/categories/:id", checkPermission, remove);
router.put("/categories/:id", checkPermission, update);

export default router;
