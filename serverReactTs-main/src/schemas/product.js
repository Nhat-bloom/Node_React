import Joi from "joi";

export const productSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  image: Joi.string().required(),
  description: Joi.string().required(),
  categories: Joi.array().required(),
});
