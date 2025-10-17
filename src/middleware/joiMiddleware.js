import Joi from "joi";

const joiValidator = (schema, req, res, next) => {
  const { error } = schema.validate(req.body);
  error
    ? res.status(404).json({
        status: "error",
        message: error.message,
      })
    : next();
};

export const loginValidation = (req, res, next) => {
  let loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  joiValidator(loginSchema, req, res, next);
};

export const createUserValidation = (req, res, next) => {
  let createUserSchema = Joi.object({
    fname: Joi.string().required(),
    lname: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string(),
    password: Joi.string().required(),
    cpassword: Joi.string()
      .valid(Joi.ref("password"))
      .required()
      .messages({ "any.only": "Password doesn't match" }),
    phone: Joi.string().required(),
  });

  joiValidator(createUserSchema, req, res, next);
};

export const verifyUserValidation = (req, res, next) => {
  let verifyUserSchema = Joi.object({
    token: Joi.string().required(),
    email: Joi.string().required(),
  });

  joiValidator(verifyUserSchema, req, res, next);
};

export const addProductValidation = (req, res, next) => {
  let createProductSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    stock: Joi.number().required(),
    category: Joi.string(),
    images: Joi.array().items(Joi.string()),
  });

  joiValidator(createProductSchema, req, res, next);
};

export const updateProductValidation = (req, res, next) => {
  let updateProductSchema = Joi.object({
    id: Joi.string().required(),
    name: Joi.string(),
    description: Joi.string(),
    price: Joi.number(),
    stock: Joi.number(),
    category: Joi.string(),
    images: Joi.array().items(Joi.string()),
  });

  joiValidator(updateProductSchema, req, res, next);
};

export const deleteProductValidation = (req, res, next) => {
  let updateProductSchema = Joi.object({
    id: Joi.string().required(),
  });

  joiValidator(updateProductSchema, req, res, next);
};

const orderItemSchema = Joi.object({
  productId: Joi.string().required(), // validate ObjectId format if needed
  quantity: Joi.number().min(1).required(),
  price: Joi.number().min(0).required(),
});

export const createOrderValidation = (req, res, next) => {
  let createOrderSchema = Joi.object({
    customerId: Joi.string().required(),
    total: Joi.number().required(),
    items: Joi.array().items(orderItemSchema).min(1).required(),
  });

  joiValidator(createOrderSchema, req, res, next);
};
