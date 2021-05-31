import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import Layout from "@/components/Layout";

import { API_URL } from "@/config/index";

export default function Home({ webinars }) {
  return (
    <Layout>
      <div>
        <h1>Upcoming Webinars</h1>
        {webinars.length === 0 && <h3>No webinars to show</h3>}
        <div className={styles.main}>
          <div className={styles.feedContainer}>
            <div className={styles.feed}>
              {webinars.map((webs, index) => (
                <Link key={webs.id} href={`/webinars/${webs.slug}`}>
                  <div className={styles.card}>
                    <Image
                      src={webs.image.formats.thumbnail.url}
                      width={170}
                      height={100}
                    />
                    <h4>{webs.name}</h4>
                    <p>{webs.description.slice(0, 15) + "..."}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`${API_URL}/webinars?_sort=date:ASC&_limit=8`);
  const webinars = await res.json();

  return {
    props: { webinars },
  };
}
