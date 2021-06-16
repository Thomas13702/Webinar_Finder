import { API_URL } from "@/config/index";
import cookie from "cookie";

export default async (req, res) => {
  if (req.method === "POST") {
    const { identifier } = req.body;
    console.log(`Hello ${identifier}`);

    const strapiRes = await fetch(`${API_URL}/auth/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: identifier,
        url: "http:/localhost:1337/admin/plugins/users-permissions/auth/reset-password",
      }),
    });

    const data = await strapiRes.json();

    if (strapiRes.ok) {
      res.status(200).json({ user: data.user });

      console.log("user recieved an email");
    } else {
      console.log(data);

      res
        .status(data.statusCode)
        .json({ message: data.message[0].messages[0].message });
      console.log("An error occurred:", error.response);
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};
