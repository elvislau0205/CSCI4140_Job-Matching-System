# CSCI4140_Job-Matching-System
Set-up server
```
npm install
```
Then, download Ollama from https://ollama.com/download. After downloading, do this to download the model
```
ollama run llama2
```
If you run this application on Windows, run this to update the version of faiss-node
```
node -p "process.arch"
```
Then we can run the server via:
```
npm run dev
```

Set-up client
```
npm install
npm run dev
```

Folder structure
-> /client: Frontend Next.js project
-> /server: Backend Express project
-> /server/FAISS_Vector_Store: Vector store

Requirement
RAM: 16GB for running 7B models

Disk Space: 12GB for installing Ollama and the base models, Additional space required for storing model data, depending on the models you use

CPU: Any modern CPU with at least 4 cores is recommended

GPU: Nvidia