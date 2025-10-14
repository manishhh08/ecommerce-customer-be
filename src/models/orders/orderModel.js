import Order from "./orderSchema.js";

export const newOrder = (orderObject) => {
  return Order.create(orderObject);
};
export const fetchOrderByIdQuery = (id) => {
  return Order.findById(id);
};

export const findByFilter = (filterObj) => {
  return Order.findOne(filterObj);
};
