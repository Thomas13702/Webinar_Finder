import Layout from "@/components/Layout";
import Image from "next/image";
import Link from "next/link";
import { API_URL } from "@/config/index";
import styles from "@/styles/Webinar.module.css";
import { name } from "../../helpers/title";
import { useRouter } from "next/router";

export default function slug({ webs }) {
  const router = useRouter();

  return (
    <Layout>
      <div className={styles.event}>
        <span>
          {new Date(webs.date).toLocaleDateString("en-US")} at {webs.time}
        </span>
        <h1>{webs.name}</h1>
        {webs.image && (
          <div className={styles.image}>
            <Image
              src={
                typeof webs.image.formats.medium !== "undefined"
                  ? webs.image.formats.medium.url
                  : webs.image.formats.thumbnail.url
              }
              width={
                typeof webs.image.formats.medium !== "undefined"
                  ? 960
                  : webs.image.formats.thumbnail.width
              }
              height={
                typeof webs.image.formats.medium !== "undefined"
                  ? 600
                  : webs.image.formats.thumbnail.height
              }
            />
          </div>
        )}
        <h3>Speaker</h3>
        <p>{webs.speaker}</p>
        <h3>Webinar Type</h3>
        <p>{name(webs.webinarType)}</p>
        <h3>Description</h3>
        <p>{webs.description}</p>
        <h3>Webinar Link</h3>
        <Link
          href={
            webs.website.includes("http://") ||
            webs.website.includes("https://")
              ? webs.website
              : `https://${webs.website}`
          }
        >
          <a>{webs.website}</a>
        </Link>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ query: { slug } }) {
  const res = await fetch(`${API_URL}/webinars?slug=${slug}`);
  const webinars = await res.json();

  return {
    props: {
      webs: webinars[0],
    },
  };
}
