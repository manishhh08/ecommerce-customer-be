import { decodeFunction, encodeFunction } from "../utils/encodeHelper.js";
import { createAccessToken, createRefreshToken } from "../utils/jwt.js";
import { findByFilter } from "../models/users/userModel.js";

export const createNewCustomer = async (req, res) => {
    // Implementation for creating a new customer
    const { username, email, password } = req.body;
    const hashedPassword = await encodeFunction(password);
    try {
        const newCustomer = {
            username,
            email,
            password: hashedPassword,
            role: "customer",
        };
        if (role !== "customer") {
            return res.status(400).json({
                status: "error",
                message: "Invalid role. Only 'customer' role is allowed.",
            });
        }

        res.status(201).json({
            status: "success",
            message: "Customer registered successfully",
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "An error occurred while registering the customer.",
        });
    }
}

export const loginCustomer = async (req, res) => {
    // Implementation for customer login
    const { email, password } = req.body;
    try {
        const user = await findByFilter(email);
        if (user.role == "customer") {
            const result = decodeFunction(password, user.password);

            let payload = {
                id: user._id,
                email: user.email,
                role: user.role,
            };
        } else {
            return res.status(403).json({
                status: "error",
                message: "Access denied. Not a customer.",
            });
        }

        let accessToken = createAccessToken(payload);
        let refreshToken = createRefreshToken(payload);

        if (result) {
            return res.status(200).json({
                status: "success",
                message: "Login successful",
                accessToken,
                refreshToken,
            });
        } else {
            return res.status(401).json({
                status: "error",
                message: "Invalid credentials",
            });
        }
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "An error occurred while logging in.",
        });
    }
};