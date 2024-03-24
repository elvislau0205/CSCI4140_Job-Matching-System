import { z } from "zod";
import { Ollama } from "@langchain/community/llms/ollama";
import { RunnableSequence } from "@langchain/core/runnables";
import { StructuredOutputParser } from "langchain/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";

// We can use zod to define a schema for the output using the `fromZodSchema` method of `StructuredOutputParser`.
const ZodSchema = z.object({
  name: z.string().describe("The name of the candidate."),
  education_institution: z.string().describe("The name of the education institution of the candidate."),
  education_degree: z.string().describe("The degree earned by the candidate in the education institution."),
  work_experience: z.array(z.object({
    company_name: z.string().describe("The company name of the work, ignore if not mentioned."),
    job_title: z.string().describe("The title of the work."),
    dates_of_employment: z.string().describe("The start and end date of the work."),
    description: z.string().describe("The describtion of the work, ignore if not mentioned."),
  }))
  .describe("The past work experience of the candidate, only include the company name, job title, dates of employment, and a brief description of the job.")
})

let CV_Parser = function (){
  this.parser = StructuredOutputParser.fromZodSchema(ZodSchema);
  this.chain = RunnableSequence.from([
    PromptTemplate.fromTemplate(
      "{format_instructions}\n{CV}"
    ),
    new Ollama({baseUrl: "http://localhost:11434", model: "mistral"}),
    this.parser,
  ]);
}


//console.log(parser.getFormatInstructions());

/*
Answer the users question as best as possible.
You must format your output as a JSON value that adheres to a given "JSON Schema" instance.

"JSON Schema" is a declarative language that allows you to annotate and validate JSON documents.

For example, the example "JSON Schema" instance {{"properties": {{"foo": {{"description": "a list of test words", "type": "array", "items": {{"type": "string"}}}}}}, "required": ["foo"]}}}}
would match an object with one required property, "foo". The "type" property specifies "foo" must be an "array", and the "description" property semantically describes it as "a list of test words". The items within "foo" must be strings.
Thus, the object {{"foo": ["bar", "baz"]}} is a well-formatted instance of this example "JSON Schema". The object {{"properties": {{"foo": ["bar", "baz"]}}}} is not well-formatted.

Your output will be parsed and type-checked according to the provided schema instance, so make sure all fields in your output match the schema exactly and there are no trailing commas!

Here is the JSON Schema instance your output must adhere to. Include the enclosing markdown codeblock:
```
{"type":"object","properties":{"answer":{"type":"string","description":"answer to the user's question"},"sources":{"type":"array","items":{"type":"string"},"description":"sources used to answer the question, should be websites."}},"required":["answer","sources"],"additionalProperties":false,"$schema":"http://json-schema.org/draft-07/schema#"}
```

What is the capital of France?
*/

CV_Parser.prototype.parse = async function(CV)
{
  const response = await this.chain.invoke({
    CV: CV,
    format_instructions: this.parser.getFormatInstructions(),
  });
  return response;
}



/*
{ answer: 'Paris', sources: [ 'https://en.wikipedia.org/wiki/Paris' ] }
*/

export {CV_Parser}