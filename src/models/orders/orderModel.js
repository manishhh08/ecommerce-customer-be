import Order from "./orderSchema.js";

export const newOrder = (orderObject) => {
  return Order.create(orderObject);
};
export const fetchOrderByFilterQuery = (id) => {
  return Order.find({ customerId: id });
};

export const findByFilter = (filterObj) => {
  return Order.findOne(filterObj);
};
