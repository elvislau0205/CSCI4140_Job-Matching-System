'use client'

import TagInput from '@/components/TagInput';
import TextInput from '@/components/TextInput';
import Link from 'next/link';
import React from 'react';
import styles from './search.module.css';

export default function CVPage() {
    const [job_role, setJobRole] = React.useState<string>("");
    const [industry, setIndustry] = React.useState<string>("");
    const [seniority, setSalary] = React.useState<string>("");
    const [tagName, setTagName] = React.useState<string>("");
    const [tags, setTags] = React.useState<string[]>([]);
    function addTag() {
        if(tags.includes(tagName)) return;
        setTags([...tags, tagName]);
        setTagName("");
    }
    function removeTag(tag: string) {
        setTags(tags.filter(t => t!== tag));
    }
    React.useEffect(() => {
        console.log(job_role);
    }, [job_role]);
    return (
        <div className="page_section">
            <div>Search for suitable candidate!</div>
            <TextInput value={job_role} setValue={setJobRole} onChange={setJobRole} placeholder='Job Role' className="mt-3" id="Job Role" />
            <TextInput value={industry} setValue={setIndustry} onChange={setIndustry} placeholder='Job Industry' className="mt-3" id="Job Industry" />
            <TextInput value={seniority} setValue={setSalary} onChange={setSalary} placeholder='Seniority' className="mt-3" id="Seniority" />
            <TagInput value={tagName} setValue={setTagName} placeholder='Tags to look for' tags={tags} setTags={addTag} removeTag={removeTag} className="mt-3" id="Job Industry" />
            <div className={styles.search_button}>Search</div>
        </div>
    )
}
