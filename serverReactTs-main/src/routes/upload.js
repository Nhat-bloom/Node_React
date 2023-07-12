import { Router } from "express";
import multer from "multer";
import { uploadImage } from "../controllers/upload";

const upload = multer({});
const router = Router();

router.post("/upload", upload.array("image", 5), uploadImage);

export default router;
