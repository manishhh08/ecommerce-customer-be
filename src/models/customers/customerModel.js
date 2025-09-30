import Customer from "./customerSchema.js";

export const newCustomer = (customerObject) => {
  return Customer.insertOne(customerObject);
};
export const getAllUsers = () => {
  return Customer.find();
};

export const findById = (customerId) => {
  return Customer.findById(customerId);
};

export const findByFilter = (filterObj) => {
  return Customer.findOne(filterObj);
};

export const updateById = (customerId, updateObj) => {
  return Customer.findByIdAndUpdate(customerId, updateObj);
};

export const deleteById = (customerId) => {
  return Customer.findOneAndDelete(customerId);
};
