import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(req: Request) {

  const body = await req.json();

  const response =
    await openai.chat.completions.create({

      model: "gpt-4o-mini",

      messages: [

        {
          role: "system",
          content:
            "You are a personal finance advisor."
        },

        {
          role: "user",
          content: body.prompt
        }

      ]

    });

  return Response.json({

    insight:
      response
        .choices[0]
        .message
        .content

  });

}
