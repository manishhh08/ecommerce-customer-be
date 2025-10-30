import fetch from "node-fetch";
import config from "../config/config.js";

export const addSubscriberToMailChimp = async (email) => {
  const url = `https://${config.mailchimp.mailserver}.api.mailchimp.com/3.0/lists/${config.mailchimp.aid}/members`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `apikey ${config.mailchimp.mailapikey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email_address: email,
      status: "subscribed",
    }),
  });

  const data = await response.json();

  return { status: response.status, data };
};
