import { FaissStore } from "@langchain/community/vectorstores/faiss";
import { Document_Loader } from "./DocumentLoader.mjs";
import { Document_Embedding } from "./DocumentEmbedding.mjs";
import * as fs from 'fs';
import * as path from 'path';

let Vector_Store = function()
{
    this.directory = "./FAISS_Vector_Store";
    this.DL = new Document_Loader();
    this.DE = new Document_Embedding();
}

Vector_Store.prototype.storePDF = async function(src)
{
    // Create docs with a loader
    const docs = await this.DL.LoadPDFFrom(src);

    // Load the docs into the vector store
    const vectorStore = await FaissStore.fromDocuments(docs, this.DE.embeddings);

    // Save the vector store to a directory
    const directory = this.directory;

    // Check if old index file exist
    const path = path.join(this.directory, 'faiss.index')
    if (fs.existsSync(path)) {
        const mergedVectorStore = await FaissStore.load(path, this.DE.embeddings);
        await mergedVectorStore.save(directory);
    }else{
        await vectorStore.save(directory);
    }

    //faiss.index is the index file
    //docstore.json is the metadata file
}

Vector_Store.prototype.loadVectorStore = async function()
{
    const directory = this.directory;
    // Load the vector store from the same directory
    const loadedVectorStore = await FaissStore.load(directory, this.DE.embeddings);
    return loadedVectorStore;
}

Vector_Store.prototype.search = async function(keyword, docNum)
{
    const loadedVectorStore = this.loadVectorStore();
    // vectorStore and loadedVectorStore are identical
    const result = await loadedVectorStore.similaritySearch(keyword, docNum);
    return result;
}

// let vs = new Vector_Store();
// vs.storePDF(`C:/Users/user/Downloads/Resume.pdf`);