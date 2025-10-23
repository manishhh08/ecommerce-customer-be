import Customer from "./customerSchema.js";

export const newCustomer = (customerObject) => {
  return Customer.create(customerObject);
};
export const getAllCustomers = () => {
  return Customer.find();
};

export const findCustomer = (customerId) => {
  return Customer.findById(customerId);
};

export const findByFilter = (filterObj) => {
  return Customer.findOne(filterObj);
};

export const updateById = (customerId, updateObj) => {
  return Customer.findByIdAndUpdate(customerId, updateObj, { new: true });
};

export const deleteById = (customerId) => {
  return Customer.findOneAndDelete(customerId);
};
