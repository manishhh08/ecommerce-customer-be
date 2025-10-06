import Customer from "./customerSchema";

export const getAllCustomers = () => {
    return Customer.find({});
};

export const insertCustomer = (customerObj) => {
    const newCustomer = new Customer(customerObj);
    return newCustomer.save();
};

export const getCustomerById = (customerId) => {
    return Customer.findById(customerId);
};

export const updateCustomerById = (customerId, updateObj) => {
    return Customer.findByIdAndUpdate(customerId, updateObj, { new: true });
};

export const deleteCustomerById = (customerId) => {
    return Customer.findByIdAndDelete(customerId);
};