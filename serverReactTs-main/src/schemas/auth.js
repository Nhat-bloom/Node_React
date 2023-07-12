import Joi from "joi";

export const signupSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email().required().messages({
    "string.empty": "Email khong duoc de trong",
    "string.email": "Khong dung dinh dang email",
    "any.required": "Truong email la bat buoc",
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "Password phai co it nhat {#limit} ki tu",
    "string.empty": "Password khong duoc de trong",
    "any.required": "Password la bat buoc",
  }),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "any.only": "Password khong khop",
    "any.required": "Confirm password la bat buoc",
  }),
});

export const signinSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.base": "Email phai la chu",
    "string.email": "Khong dung dinh dang email",
    "string.empty": "Email khong duoc de trong",
    "any.required": "Truong email la bat buoc",
  }),
  password: Joi.string().required().min(6).messages({
    "string.base": "Password phai la chu",
    "string.empty": "Password khong duoc de trong",
    "string.min": "Password co toi thieu 6 ki tu",
    "any.required": "Truong password la bat buoc",
  }),
});
