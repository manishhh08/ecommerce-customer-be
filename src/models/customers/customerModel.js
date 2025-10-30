import Customer from "./customerSchema.js";
import mongoose from "mongoose";

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

export const addRecentlyViewedProduct = async (customerId, productId, limit = 10) => {
  const _cid = new mongoose.Types.ObjectId(customerId);
  const _pid = new mongoose.Types.ObjectId(productId);

  await Customer.updateOne(
    { _id: _cid },
    {
      $pull: {
        recentViewedProducts: { productId: _pid },
      },
    }
  );

  await Customer.updateOne(
    { _id: _cid },
    {
      $push: {
        recentViewedProducts: {
          $each: [{ productId: _pid, viewedAt: new Date() }],
          $position: 0,
          $slice: limit,
        },
      },
    }
  );
};

export const getRecentlyViewedProducts = async (customerId, limit = 10) => {
  const data = await Customer.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(customerId) } },
    { $project: { recentViewedProducts: { $slice: ["$recentViewedProducts", limit] } } },
    { $unwind: "$recentViewedProducts" },
    {
      $lookup: {
        from: "products",
        localField: "recentViewedProducts.productId",
        foreignField: "_id",
        as: "product",
      },
    },
    { $unwind: "$product" },
    {
      $replaceRoot: { newRoot: "$product" },
    },
  ]);

  return data;
};
