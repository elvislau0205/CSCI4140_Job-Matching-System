import Link from 'next/link';

export default function NavBar() {
    return(
        <header>
            <h1 className='Title'>Job Matching System</h1>
            <nav>
                <Link href="CV">CV Management</Link>
                <Link href="Job">Job Matching</Link>
                <span></span>
            </nav>
        </header>
    )
}