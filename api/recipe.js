import { InferenceClient } from "@huggingface/inference";

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients.
`;

export default async function handler(req, res) {
  const hf = new InferenceClient(process.env.HF_TOKEN);
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  try {
    const { ingredientsString } = req.body;

    const response = await hf.chatCompletion({
      model: "zai-org/GLM-5.2:deepinfra",
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!`,
        },
      ],
      max_tokens: 1024,
    });

    res.status(200).json({
      recipe: response.choices[0].message.content,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: error.message,
    });
  }
}