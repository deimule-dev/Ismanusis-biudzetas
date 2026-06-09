import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import OpenAI from "openai";
import type { IncomingMessage, ServerResponse } from "http";

function readBody(
  req: IncomingMessage
): Promise<string> {

  return new Promise((resolve, reject) => {

    let data = "";

    req.on("data", (chunk) => {
      data += chunk;
    });

    req.on("end", () => {
      resolve(data);
    });

    req.on("error", reject);
  });
}

export default defineConfig(({ mode }) => {

  const env = loadEnv(
    mode,
    process.cwd(),
    ""
  );

  return {
    plugins: [
      react(),

      {
        name: "ai-api",

        configureServer(server) {

          server.middlewares.use(
            async (
              req,
              res: ServerResponse,
              next
            ) => {

              if (
                req.url !== "/api/ai" ||
                req.method !== "POST"
              ) {
                return next();
              }

              try {

                const body = JSON.parse(
                  await readBody(req)
                );

                const openai = new OpenAI({
                  apiKey:
                    env.OPENAI_API_KEY,
                });

                const response =
                  await openai.chat.completions.create({

                    model: "gpt-4o-mini",

                    messages: [
                      {
                        role: "system",
                        content:
                          "You are a personal finance advisor.",
                      },
                      {
                        role: "user",
                        content:
                          body.prompt,
                      },
                    ],
                  });

                res.setHeader(
                  "Content-Type",
                  "application/json"
                );

                res.end(
                  JSON.stringify({
                    insight:
                      response
                        .choices[0]
                        .message.content,
                  })
                );

              } catch {

                res.statusCode = 500;

                res.setHeader(
                  "Content-Type",
                  "application/json"
                );

                res.end(
                  JSON.stringify({
                    error:
                      "Failed to get AI response",
                  })
                );
              }
            }
          );
        },
      },
    ],
  };
});
