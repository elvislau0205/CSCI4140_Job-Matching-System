import CVForm from "./CVForm"
import Link from 'next/link';

export default function CVPage() {
    return (
        <div className="page_section">
            <div>You can upload your resumes here!</div>
            <CVForm />
        </div>
    )
}
