import { PDFLoader } from "langchain/document_loaders/fs/pdf";

let Document_Loader = function()
{
}

Document_Loader.prototype.LoadPDFFrom = async function(src) {
    const loader = new PDFLoader(src);
    const docs = await loader.load();
    return docs
};

export {Document_Loader};

// let dl = new Document_Loader();
// const doc = await dl.LoadPDFFrom(`C:/Users/user/Downloads/Resume.pdf`);
// console.log(doc);