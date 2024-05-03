import { FaissStore } from "@langchain/community/vectorstores/faiss";
import { Document_Loader } from "./DocumentLoader.mjs";
import { Document_Embedding } from "./DocumentEmbedding.mjs";
import { Document } from "@langchain/core/documents";
import * as fs from 'fs';
import * as path from 'path';

let Vector_Store = function()
{
    this.directory = "./FAISS_Vector_Store";
    this.DL = new Document_Loader();
    this.DE = new Document_Embedding();
    this.FaissStore = null;
}

Vector_Store.prototype.loadDocs = async function(src)
{
    // Create docs with a loader
    const docs = await this.DL.LoadPDFFrom(src);
    return docs
}

Vector_Store.prototype.indexing = async function(CV_JSON)
{
    
    const docs = [new Document({
        pageContent: JSON.stringify(CV_JSON),
        metadata: { page: 1 },
    })];
    // Load the docs into the vector store
    const vectorStore = await FaissStore.fromDocuments(docs, this.DE.embeddings);

    // Save the vector store to a directory
    const directory = this.directory;
    if (!fs.existsSync(directory)){
        fs.mkdirSync(directory);
    }

    // Check if old index file exist
    const indexFile = path.join(directory, 'faiss.index');
    if (fs.existsSync(indexFile)) {
        const mergedVectorStore = await FaissStore.load(directory, this.DE.embeddings);
        await mergedVectorStore.mergeFrom(vectorStore);
        await mergedVectorStore.save(directory);
        this.FaissStore = mergedVectorStore;
    }else{
        await vectorStore.save(directory);
        this.FaissStore = vectorStore;
    }

    //faiss.index is the index file
    //docstore.json is the metadata file
}

Vector_Store.prototype.loadVectorStore = async function()
{
    const directory = this.directory;
    // Load the vector store from the same directory
    const loadedVectorStore = await FaissStore.load(directory, this.DE.embeddings);
    this.FaissStore = loadedVectorStore;
    return loadedVectorStore;
}

Vector_Store.prototype.search = async function(keyword, docNum = 2)
{
    const loadedVectorStore = await this.loadVectorStore();
    // vectorStore and loadedVectorStore are identical
    const result = await loadedVectorStore.similaritySearchWithScore(keyword, docNum);
    return result;
}

// let vs = new Vector_Store();
// vs.storePDF(`C:/Users/user/Downloads/Resume.pdf`);

export {Vector_Store}