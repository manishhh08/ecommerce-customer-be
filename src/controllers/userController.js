// import { getAllUsers } from "../models/customers/customerModel";

export const getUserDetail = (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found!",
      });
    }

    return res.json({
      status: "success",
      message: "User details fetched successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Failed to retrieve user details",
    });
  }
};

// export const getAllUsersController = async (req, res) => {
//   try {
//     const users = await getAllUsers();
//     res.json({
//       status: "success",
//       message: "Users retrieved successfully",
//       users,
//     });
//   } catch (err) {
//     res.json({
//       status: "error",
//       message: "Failed to retrieve users.",
//     });
//   }
// };

// export const registerUserController = async (req, res) => {
//   try {
//     const { username, email, password, role } = req.body;

//     // basic validation
//     if (!username || !email || !password) {
//       return res
//         .status(400)
//         .json({ status: "error", message: "All fields required" });
//     }

//     // check existing
//     const existing = await user.findOne({ email });
//     if (existing) {
//       return res
//         .status(400)
//         .json({ status: "error", message: "Email already exists" });
//     }

//     // create user
//     const user = await user.create({ username, email, password, role });

//     res.json({ status: "success", user });
//   } catch (error) {
//     console.error("registerUserController error:", error);
//     res.status(500).json({ status: "error", message: error.message });
//   }
// };
