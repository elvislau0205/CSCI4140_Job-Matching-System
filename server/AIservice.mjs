import { Ollama } from "@langchain/community/llms/ollama";
import ollama from 'ollama'

//reference docs: https://js.langchain.com/docs/integrations/llms/ollama
// const model = new Ollama({
//     baseUrl: "http://localhost:11434", // Default value
//     model: "llama2", // Default value
//   });

//   const stream = await model.stream(
//     `Translate "I love programming" into German.`
//   );

//   const chunks = [];
//   for await (const chunk of stream) {
//     chunks.push(chunk);
//   }

//   console.log(chunks.join(""));
  

//reference docs: https://github.com/ollama/ollama-js
const message = { role: 'user', content: 'Why is the sky blue?' }
const response = await ollama.chat({ model: 'llama2', messages: [message], stream: true })
for await (const part of response) {
  process.stdout.write(part.message.content)
}