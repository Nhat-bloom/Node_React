import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const productSchema = new mongoose.Schema(
  {
    name: String,
    price: Number,
    image: String,
    description: String,
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",
      },
    ],
  },
  { timestamps: true, versionKey: false }
);
//create indexes for the fields we need to search
productSchema.plugin(mongoosePaginate);
productSchema.index({ name: "text" });
export default mongoose.model("Product", productSchema);
