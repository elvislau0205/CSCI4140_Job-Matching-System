import Link from 'next/link';
import Image from 'next/image'
import styles from './Home.module.css'

export default function Home() {
  return (
    <div>
      <div style={{width: '100%', height: '100%', marginTop: "64px", position: "relative"}}>
        <Image src="/home_hero_banner.jpg" alt="hero" width={0} height={0} sizes="100vw" style={{ width: '100vw', height: 'auto' }} />
        <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-end">
          <div className="home_hero_header">Welcome</div>
          <div className="home_hero_header">To</div>
          <div className="home_hero_header">JobMatch</div>
        </div>
      </div>
      <div className="page_section" style={{marginTop: "12px"}}>
        <div className="home_description">
          <div className="text-lg mt-4 text-center">JobMatch is a platform to streamline recruiting process for recruiters</div>
          <div className={styles.feature_cards}>
            <div className={styles.feature_card}>
              <div className={styles.card_title}>Upload CVs</div>
              <div>Upon receiving candidate resumes, recruiters can upload them via the JobMatch System into our candidate pool</div>
            </div>
            <div className={styles.feature_card}>
              <div className={styles.card_title}>CV Processing</div>
              <div>Our system will help determine the attributes of the candidate based on their CV, and they will be very useful for the searching process</div>
            </div>
            <div className={styles.feature_card}>
              <div className={styles.card_title}>Candidate Search</div>
              <div>The user can search for a list of candidates that fit their recruitment needs, and they can adjust the weight of each attribute for a better result.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
