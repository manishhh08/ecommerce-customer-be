import { addSubscriberToMailChimp } from "../utils/mailChimp.js";

export const subscribeByEmail = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res
      .status(400)
      .json({ status: "error", message: "Email is required" });
  }

  try {
    const { status, data } = await addSubscriberToMailChimp(email);
    if (status >= 400) {
      console.log("Mailchimp error:", data);
      return res.status(400).json({
        status: "error",
        message: data.detail || "Mailchimp error",
      });
    }
    res.status(200).json({
      status: "success",
      message: "You have been subscribed successfully.",
      mailchimpId: data.id,
    });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error. Please try again later.",
    });
  }
};
