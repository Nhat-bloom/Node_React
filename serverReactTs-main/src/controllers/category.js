import dotenv from "dotenv";
import Category from "../models/category";
import { categorySchema } from "../schemas/category";

dotenv.config();

export const getAll = async (req, res) => {
  try {
    const categories = await Category.find();
    if (categories.length === 0) {
      return res.status(404).json({
        message: "Không có danh muc nào",
      });
    }
    return res.json({
      message: "Lấy danh sách sản phẩm thành công",
      categories,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};
export const create = async (req, res) => {
  try {
    const { error } = categorySchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }
    const category = await Category.create(req.body);
    if (!category) {
      return res.json({
        message: "Thêm danh mục không thành công",
      });
    }
    return res.json({
      message: "Thêm danh mục thành công",
      category,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};
export const update = async (req, res) => {
  try {
    const { error } = categorySchema.validate(req.body);
    if (error)
      return res.status(400).json({
        message: error.details[0].message,
      });
    const category = await Category.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    if (!category) {
      return res.json({
        message: "Cập nhật sản phẩm không thành công",
      });
    }
    res.json({
      message: "Cập nhật sản phẩm thành công",
      category,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
export const getOne = async (req, res) => {
  try {
    const category = await Category.findById({ _id: req.params.id }).populate(
      "products"
    );
    if (!category) {
      return res.json({
        message: "Không tìm thấy danh muc",
      });
    }
    res.json({
      message: "Lấy danh muc thành công",
      category,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
export const remove = async (req, res) => {
  try {
    const category = await Category.deleteOne(
      { _id: req.params.id },
      { new: true }
    );
    // if (!product) {
    //     return res.json({
    //         message: "Xóa sản phẩm không thành công",
    //     });
    // }
    res.json({
      message: "Xóa sản phẩm thành công",
      category,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};
