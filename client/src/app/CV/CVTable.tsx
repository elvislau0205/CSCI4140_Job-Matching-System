"use client";

import { useEffect, useState } from 'react';
import styles from './CVTable.module.css'

export default function CVTable() {
    const API = "http://localhost:3001/CV";
    const [CVList, setCVList] =  useState([]);
    useEffect(()=>{
        getCV();
    }, [])
    async function getCV(){
        fetch(API)
            .then((res) => res.json())
            .then((data) => setCVList(data));
    }

    return (<>
    <button onClick={()=>{getCV()}} className='text-white rounded-2xl bg-gray-900 p-2 float-end m-2'>Reload</button>
    <table className={styles.CVTable}>
        <thead className="bg-gray-200 border-b-2 border-gray-400">
        <tr>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">Name</th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">Education Institution</th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">Education Degree</th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">Working Experience</th>
        </tr>
        </thead>
        <tbody>
            {CVList.map(CV => <tr key={CV._id}>
                <td className='p-3 text-xl text-gray-700'>{CV.name}</td>
                <td className='p-3 text-sm text-gray-700'>{CV.education_institution}</td>
                <td className='p-3 text-sm text-gray-700'>{CV.education_degree}</td>
                <td className='p-3 text-sm text-gray-700'>{CV.work_experience.map(work => 
                    <div key={work._id} className='rounded-xl shadow-lg'>
                        <div className='p-5 flex flex-col'>
                            <div className='text-xl font-medium mt-3 text-gray-700'>{work.company_name || "Unknown company"}</div>
                            <div className='text-xl font-medium mt-3 text-gray-700'>{work.job_title || "Unknown position"}</div>
                            <div className='text-xl font-medium mt-3 text-gray-700'>{work.dates_of_employment || "Unknown dates"}</div>
                            <div className='text-xl font-medium mt-3 text-gray-700'>{work.description || "Unknown details"}</div>
                        </div>
                    </div>
                )}</td>
                </tr>)}
        </tbody>
    </table>
    </>
    )
}
  