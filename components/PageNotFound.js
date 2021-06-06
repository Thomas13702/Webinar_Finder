import styles from "@/styles/404.module.css";
import Link from "next/link";

export default function PageNotFound() {
  return (
    <div>
      <div className={styles.imageBackground}>
        <h1 className={styles.text}>404</h1>
        <p className={styles.p}>There is nothing here</p>
        <div className={styles.linkDiv}>
          <Link href="/">
            <a className={styles.link}>Go Home</a>
          </Link>
        </div>
      </div>
    </div>
  );
}
