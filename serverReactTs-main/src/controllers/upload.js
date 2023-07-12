import cloudinary from "../config/cloudinary";

export const uploadImage = async (req, res) => {
  console.log(req.file);
  return;
  if (!file) {
    return res.status(404).json({
      message: "No file was upload!",
    });
  }
  try {
    const result = await cloudinary.uploader.upload(file.originalname);
    console.log(result);
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};
