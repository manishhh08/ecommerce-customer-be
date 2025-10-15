import Order from "./orderSchema.js";

export const newOrder = (orderObject) => {
  return Order.create(orderObject);
};
export const fetchOrderByFilterQuery = (filter) => {
  return Order.find(filter);
};

export const findByFilter = (filterObj) => {
  return Order.findOne(filterObj);
};

export const getMostPopularProducts = () => {
  return Order.aggregate([
    // 1️⃣ Unwind the items array so each product becomes its own document
    { $unwind: "$items" },

    // 2️⃣ Group by productId and count how many times each appears
    {
      $group: {
        _id: "$items.productId",
        totalCount: { $sum: "$items.quantity" },
      },
    },

    // 3️⃣ Sort by totalCount descending
    { $sort: { totalCount: -1 } },

    // 4️⃣ Take the top one (most frequent)
    { $limit: 4 },
  ]);
};
