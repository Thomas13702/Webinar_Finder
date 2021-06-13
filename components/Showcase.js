import styles from "@/styles/Showcase.module.css";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export default function Showcase() {
  return (
    <div>
      <div className={styles.flexContainer}>
        <div className={styles.container1}>
          <div className={styles.text}>
            <h2>Learn new skills with our webinars</h2>

            <p className={styles.p}>Find something that interests you</p>
          </div>
        </div>
        <div className={styles.container2}></div>
      </div>
    </div>
  );
}
