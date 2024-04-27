import ollama from 'ollama'
import { Ollama } from "@langchain/community/llms/ollama";
import {Vector_Store} from './VectorStore.mjs';
import { CV_Parser } from './CVParser.mjs';
import { mongoDB } from './MongoDB.mjs';

let AIService = function()
{
  this.VS = new Vector_Store();
  this.ollama_endpoint = "http://localhost:11434";
  this.ollama_model = "mistral";
  this.model =  new Ollama({baseUrl: this.ollama_endpoint, model: this.ollama_model});
  this.parser = new CV_Parser();
  this.DB = new mongoDB();
}

AIService.prototype.storeCV = async function(src)
{
  try
  {
    const docs = await this.VS.loadDocs(src);
    const CVtext = docs[0].pageContent;
    const CV_JSON = await this.parseCV(CVtext);
    console.log(CV_JSON)
    /*const CV_JSON = {
      name: 'Lau Ho Man, Elvis',
      education_institution: 'The Chinese University of Hong Kong (CUHK)',
      education_degree: 'Bachelor of Engineering in Computer Science',
      work_experience: [
        {
          company_name: '',
          job_title: 'Digital Strategy Analyst',
          dates_of_employment: '06/2023-08/2023',
          description: 'Developed an AI web application and wrote report based on the need of the customer.\n' +
            'Developed a web application with login and user role manipulation functions.'
        },
        {
          company_name: '',
          job_title: '',
          dates_of_employment: '',
          description: ''
        }
      ]
    } */
    this.DB.addCV(CV_JSON);
    this.VS.indexing(CV_JSON);
    return {status: 'success'};
  }
  catch
  {
    return {status: 'failed'};
  }
}


AIService.prototype.searchCV = async function(keyword)
{
  await this.VS.loadVectorStore();
  const result = await this.VS.search(keyword);
  return result;
}

//Ollama-js: faster 
//reference docs: https://github.com/ollama/ollama-js
AIService.prototype.getTextResponse = async function(user_input)
{
  const message = { role: 'user', content: user_input }
  const response = await ollama.chat({ model: 'mistral', messages: [message], stream: true })
  for await (const part of response) {
    process.stdout.write(part.message.content)
  } 
}

AIService.prototype.parseCV = async function(CV)
{
  const JSON = await this.parser.parse(CV);
  return JSON;
}

AIService.prototype.jobMatch = async function(job)
{
  const record = await this.searchCV(job);
  const CV = record[0].pageContent;
  const CV_JSON = await this.parseCV(CV);
  console.log(CV_JSON);
  return CV_JSON;
}

AIService.prototype.CVProcessing = async function(src)
{
  const record = await this.searchCV(job);
  const CV = record[0].pageContent;
  const CV_JSON = await this.parseCV(CV);
  console.log(CV_JSON);
  return CV_JSON;
}

export {AIService}

