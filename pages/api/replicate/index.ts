// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

type Data = {
  name: string;
};
type Input = {
  prompt: string;
  apiKey: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  console.log("request", req.body);
  const { prompt, apiKey } = JSON.parse(req.body) as Input;

  const { data } = await axios("https://api.replicate.com/v1/predictions", {
    method: "POST",
    data: {
      input: {
        prompt,
      },
      version:
        "6359a0cab3ca6e4d3320c33d79096161208e9024d174b2311e5a21b6c7e1131c",
    },
    headers: { Authorization: `Token ${apiKey}` },
  });

  res.status(200).json(data);
}
