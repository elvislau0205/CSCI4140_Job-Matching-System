import Link from 'next/link';

export default function Navbar() {
    return (
    <div className="navbar_container">
        <div className="navbar_items">
            <div className="font-semibold text-2xl">JobMatch</div>
            <div className="navbar_links">
                <Link href="/" className="navbar_link">Home</Link>
                <Link href="/CV" className="navbar_link">Submit CV</Link>
                <Link href="/search" className="navbar_link">Candidate Search</Link>
            </div>
        </div>
        
    </div>
    )
}
  