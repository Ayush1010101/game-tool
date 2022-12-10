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

  const { data } = await axios("https://api.openai.com/v1/completions", {
    method: "POST",
    data: {
      model: "text-davinci-003",
      prompt,
      temperature: 0.7,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    },
    headers: { Authorization: `Bearer ${apiKey}` },
  });

  console.log(data);

  res.status(200).json(data);
}
