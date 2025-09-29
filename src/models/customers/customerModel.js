import Customer from "./customerSchema.js";

export const newCustomer = (userObject) => {
  return Customer.insertOne(userObject);
};

export const findById = (userId) => {
  return Customer.findById(userId);
};

export const findByFilter = (filterObj) => {
  return Customer.findOne(filterObj);
};

export const updateById = (userId, updateObj) => {
  return Customer.findByIdAndUpdate(userId, updateObj);
};

export const deleteById = (userId) => {
  return Customer.findOneAndDelete(userId);
};
