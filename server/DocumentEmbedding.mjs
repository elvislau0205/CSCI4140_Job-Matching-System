import { OllamaEmbeddings } from '@langchain/community/embeddings/ollama';

let Document_Embedding = function(){
    this.embeddings = new OllamaEmbeddings({
        model: "llama2",
        baseUrl: "http://localhost:11434",
    });
}

Document_Embedding.prototype.getEmbedding = async function(docs) {
    const documentEmbeddings = await this.embeddings.embedDocuments(docs);
    return documentEmbeddings
};


export {Document_Embedding};