import User from "./userSchema.js";

export const newUser = (userObject) => {
  return User.insertOne(userObject);
};

export const findById = (userId) => {
  return User.findById(userId);
};

export const findByFilter = (filterObj) => {
  return User.findOne(filterObj);
};

export const updateById = (userId, updateObj) => {
  return User.findByIdAndUpdate(userId, updateObj);
};

export const deleteById = (userId) => {
  return User.findOneAndDelete(userId);
};
