import axios from "axios";
import { ACCESS_TOKEN, SUBMIT_URL } from "../config/env.js";

export default async function submitResults(stats) {
  const response = await axios.post(
    SUBMIT_URL,
    { stats },
    {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    },
  );

  return response.data;
}
