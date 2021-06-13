import Link from "next/link";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import styles from "@/styles/DashboardEvent.module.css";

export default function DashboardEvent({ webs, handleDelete }) {
  return (
    <div className={styles.event}>
      <h4>
        <Link href={`/webinars/${webs.slug}`}>
          <a>{webs.name}</a>
        </Link>
      </h4>
      <Link href={`/webinars/edit/${webs.id}`}>
        <a className={styles.edit}>
          <FaPencilAlt /> <span>Edit Event</span>
        </a>
      </Link>
      <a
        className={styles.delete}
        onClick={() => handleDelete(webs.id)}
        href="#"
      >
        <FaTimes /> <span>Delete Event</span>
      </a>
    </div>
  );
}
