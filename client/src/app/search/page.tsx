'use client'

import TagInput from '@/components/TagInput';
import TextInput from '@/components/TextInput';
import Link from 'next/link';
import React, { useEffect } from 'react';
import styles from './search.module.css';

export default function CVPage() {
    const [job_role, setJobRole] = React.useState<string>("software engineer");
    const [industry, setIndustry] = React.useState<string>("logistics");
    const [seniority, setSalary] = React.useState<string>("mid-level");
    const [tagName, setTagName] = React.useState<string>("");
    const [tags, setTags] = React.useState<string[]>(["html/css", "javascript", "typescript", "react", "angular", "node", "express"]);
    const [results, setResults] = React.useState([]);
    function addTag() {
        if(tags.includes(tagName)) return;
        setTags([...tags, tagName]);
        setTagName("");
    }
    function removeTag(tag: string) {
        setTags(tags.filter(t => t!== tag));
    }
    function searchJob() {
        let searchString = "";
        if(job_role) searchString += "Job Title: "+job_role+", ";
        if(industry) searchString += "Industry: "+industry+", ";
        if(seniority) searchString += "Seniority: "+seniority+", ";
        if(tags.length) searchString += "Tags: "+tags.join(", ")+" ";
        fetch("http://localhost:3001/match", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                job: searchString
            })
        })
        .then((res) => {
            return res.json()
        }).then((res) => {
            setResults(res.candidates)
            console.log(res.candidates)
        })
        .catch((err) => console.log(err));
    }
    function removeDuplicates(arr: any) {
        let unique:any = [];
        arr.forEach((element:any) => {
            if (!unique.includes(element)) {
                unique.push(element);
            }
        });
        return unique;
    }
    return (
        <div className="page_section">
            <div>Search for suitable candidate!</div>
            <TextInput value={job_role} setValue={setJobRole} onChange={setJobRole} placeholder='Job Role' className="mt-3" id="Job Role" />
            <TextInput value={industry} setValue={setIndustry} onChange={setIndustry} placeholder='Job Industry' className="mt-3" id="Job Industry" />
            <TextInput value={seniority} setValue={setSalary} onChange={setSalary} placeholder='Seniority' className="mt-3" id="Seniority" />
            <TagInput value={tagName} setValue={setTagName} placeholder='Tags to look for' tags={tags} setTags={addTag} removeTag={removeTag} className="mt-3" id="Job Industry" />
            <div className={styles.search_button} onClick={()=>searchJob()}>Search</div>
            {
                results && results.length>0?(
                    <>
                        <div className="mt-4">Search results</div>
                        <div className="flex flex-col">
                          <div className="-m-1.5 overflow-x-auto">
                            <div className="p-1.5 min-w-full inline-block align-middle">
                              <div className="overflow-hidden">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                                  <thead>
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Rank</th>
                                        <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Name</th>
                                        <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Past Position(s)</th>
                                        <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Past Industries</th>
                                        <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Skills</th>
                                        <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Score</th>
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                                      {results.map((result, index) => {
                                          return(
                                              // <div key={index}>
                                              //     <div>{index+1+". "+result.candidate?.name}</div>
                                              //     <div>{result.score}</div>
                                              // </div>
                                              <tr key={index}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">{index+1}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">{result.candidate?.name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">{removeDuplicates(result.candidate?.workExperience.map((w) => w.jobTitle)).join(",")}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">{removeDuplicates(result.candidate?.workExperience.map((w) => w.occupationIndustry)).join(",")}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">{removeDuplicates(result.candidate?.skills.map((w) => w)).join(",")}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">{result.score}</td>
                                              </tr>
                                          )
                                      })}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                    </>
                )
                :(
                    <div className="mt-4">No Results yet!</div>
                )
            }
        </div>
    )
}
