import CVForm from "./CVForm"
import Link from 'next/link';

export default function CVPage() {
    return (<>
        <h1>CV page</h1>
        <Link href="/">Back</Link>
        <CVForm />
    </>
    )
}
  