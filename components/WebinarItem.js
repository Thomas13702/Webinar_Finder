import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/WebinarItem.module.css";

export default function EventItem({ evt }) {
  return (
    <div className={styles.event}>
      <div className={styles.img}>
        <Image
          src={
            evt.image
              ? evt.image.formats.thumbnail.url
              : "images/event-default.png"
          }
          // have to have height and width in Image tag
          width={170}
          height={100}
        />
        {/* dont need to specify public folder as it automatically looks there */}
      </div>
      <div className={styles.info}>
        <span>
          {new Date(evt.date).toLocaleDateString("en-US")} at {evt.time}
        </span>
        <h3>{evt.name}</h3>
      </div>
      <div className={styles.link}>
        <Link href={`/webinars/${evt.slug}`}>
          <a className="btn"> Details</a>
        </Link>
      </div>
    </div>
  );
}
