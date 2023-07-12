import dotenv from "dotenv";
import Product from "../models/product";
import Category from "../models/category";
import { productSchema } from "../schemas/product";
dotenv.config();

export const getAll = async (req, res) => {
  const {
    _limit = 10,
    _sort = "name",
    _order = "ascend",
    _page = 1,
    _q = "",
  } = req.query;
  const options = {
    sort: { [_sort]: _order === "descend" ? -1 : 1 },
    limit: _limit,
    populate: "categories",
    page: _page,
    options: { $text: { $search: _q } },
  };
  try {
    const products = await Product.paginate({}, options);
    if (products.length === 0) {
      return res.status(404).json({
        message: "Không có sản phẩm nào",
      });
    }
    return res.json({
      message: "Lấy danh sách sản phẩm thành công",
      products,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
export const getOne = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id }).populate({
      path: "categories",
      select: "name",
    });
    if (!product) {
      return res.json({
        message: "Không tìm thấy sản phẩm",
      });
    }
    res.json({
      message: "Lấy sản phẩm thành công",
      product,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
export const create = async (req, res) => {
  try {
    const { error } = productSchema.validate(req.body);
    if (error)
      return res.status(400).json({
        message: error.details[0].message,
      });
    const product = await Product.create(req.body);
    if (!product) {
      return res.json({
        message: "Thêm sản phẩm không thành công",
      });
    }
    product.categories.forEach(async (category) => {
      try {
        await Category.findByIdAndUpdate(category._id, {
          $addToSet: { products: product._id },
        });
      } catch (error) {
        return res.status(404).json({
          message: error.message,
        });
      }
    });
    return res.json({
      message: "Thêm sản phẩm thành công",
      product,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};
export const update = async (req, res) => {
  try {
    const { error } = productSchema.validate(req.body);
    if (error)
      return res.status(400).json({
        message: error.details[0].message,
      });
    const product = await Product.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    if (!product) {
      return res.json({
        message: "Cập nhật sản phẩm không thành công",
      });
    }
    product.categories.forEach(async (category) => {
      try {
        await Category.findByIdAndUpdate(category._id, {
          $addToSet: { products: product._id },
        });
      } catch (error) {
        return res.status(404).json({
          message: error.message,
        });
      }
    });
    res.json({
      message: "Cập nhật sản phẩm thành công",
      product,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

export const remove = async (req, res) => {
  try {
    const product = await Product.deleteOne(
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
      product,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};
