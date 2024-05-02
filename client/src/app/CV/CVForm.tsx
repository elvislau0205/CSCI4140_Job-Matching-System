'use client'

import { useState } from "react";
import styles from "./CV.module.css";
import { NextApiResponse } from "next";
import axios from "axios";

export default function CVForm() {
    const [file, setFile] = useState<File | null>(null);
    const [successAlert, setSuccessAlert] = useState(false);
    const [errorAlert, setErrorAlert] = useState(false);
    const API = "http://localhost:3001/upload";
    function uploadFile() {
        if(file){
           const formData = new FormData();
            formData.append("file", file);
            axios.post(API, formData).then((res)=>{
                console.log(res.data);
                setSuccessAlert(true);
                setErrorAlert(false);
                setTimeout(()=>{
                    setSuccessAlert(false);
                }, 3000);
            })
            .catch((error)=>{
                console.log(error);
                setErrorAlert(true);
                setSuccessAlert(false);
                setTimeout(()=>{
                    setErrorAlert(false);
                }, 3000);
            });
            // axios.get("/api/test").then((res)=>{
            //     console.log(res.data);
            // })
        }
    }
    return (
        // <form action={API} method="post" encType="multipart/form-data" className="inline-block">
        <div>
            <input type="file" name="file" onChange={(e)=>e.target.files&&setFile(e.target.files[0])} />
            <input
                className={styles.upload_btn}
                onClick={()=>{uploadFile()}}
                type="submit"
            ></input>
            {
                successAlert &&
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-3 w-fit pr-12" role="alert">
                    <strong className="font-bold">Success!</strong>
                    <span className="block sm:inline ml-2">The file has been uploaded to the system</span>
                    <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                        <svg className="fill-current h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg>
                    </span>
                </div>
            }
            {
                errorAlert && 
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-3 w-fit pr-12" role="alert">
                    <strong className="font-bold">Error!</strong>
                    <span className="block sm:inline ml-2">The file cannot be uploaded to the system</span>
                    <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                        <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                    </span>
                </div>  
            }
            
        </div>
        // </form>
    )
}
