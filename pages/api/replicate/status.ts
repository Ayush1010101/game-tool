import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

type Data = {
  name: string;
};
type Input = {
  url: string;
  apiKey: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  let { url, apiKey } = JSON.parse(req.body) as Input;

  const r = await axios.get(url, {
    headers: {
      Authorization: `Token ${apiKey}`,
      "Content-Type": "application/json",
      "Accept-Encoding": "gzip,deflate,compress",
    },
  });

  res.status(200).json(r.data);
}
