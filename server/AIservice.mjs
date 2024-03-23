import { Ollama } from "@langchain/community/llms/ollama";
import ollama from 'ollama';
import {Vector_Store} from './VectorStore.mjs';

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
// const message = { role: 'user', content: 'Why is the sky blue?' }
// const response = await ollama.chat({ model: 'llama2', messages: [message], stream: true })
// for await (const part of response) {
//   process.stdout.write(part.message.content)
// }

let AIService = function()
{
  this.VS = new Vector_Store();
}

AIService.prototype.readCV = function(src)
{
  this.VS.storePDF(src);

}

AIService.prototype.repsonse = async function(user_input)
{
  this.VS.loadVectorStore();
  this.VS.search("Software engineer");
  const message = { role: 'user', content: user_input }
  const response = await ollama.chat({ model: 'llama2', messages: [message], stream: true })
  for await (const part of response) {
    process.stdout.write(part.message.content)
  }
}

export {AIService}

