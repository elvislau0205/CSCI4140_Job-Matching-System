import Link from 'next/link';
import TextInput from './TextInput';
import { XMarkIcon } from '@heroicons/react/16/solid';
import React from 'react';

interface InputProps {
    value: string;
    setValue: (value: string) => void;
    placeholder: string;
    className?: string;
    tags: string[];
    setTags: () => void;
    removeTag: (tag: string) => void;
    id: string;
}

export default function TagInput(props: InputProps) {
    function handleEnter() {
        props.setTags();
    }
    return (
        <div className={props.className}>
            <TextInput value={props.value} setValue={props.setValue} placeholder={props.placeholder} onChange={props.setValue} onEnter={handleEnter} id={props.id}></TextInput>
            <div className="tag_list">
                {props.tags.map((tag) => {
                    return (
                    <div className="tag_pill" key={tag}>
                        {tag}
                        <XMarkIcon className="ml-2 h-4 w-4 cursor-pointer" onClick={()=>props.removeTag(tag)}></XMarkIcon>
                    </div>)
                })}
            </div>
        </div>
    )
}
  