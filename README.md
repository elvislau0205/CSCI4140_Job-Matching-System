# CSCI4140_Job-Matching-System
Set-up server
0. npm install
1. Download Ollama from https://ollama.com/download
2. Open cmd and type: ollama run llama2 (To download the model)
3. npm run dev

Set-up client
0. npm install
1. npm run dev

Folder structure
-> /client: frontend next.js project
-> /server: backend node.js project
-> /server/FAISS_Vector_Store: Vector store

Requirement
RAM: 16GB for running 7B models 
Disk Space: 12GB for installing Ollama and the base models, Additional space required for storing model data, depending on the models you use
CPU: Any modern CPU with at least 4 cores is recommended
GPU: Nvidia