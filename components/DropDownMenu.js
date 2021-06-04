import styles from "@/styles/DropDownMenu.module.css";
import Link from "next/link";

export default function DropDownMenu({ closeMobileMenu }) {
  return (
    <div className={styles.dropdown}>
      <button className={styles.dropbtn}>Find Webinars</button>
      <div className={styles.dropdownContent} onClick={closeMobileMenu}>
        <Link href="/types/types?term=business">
          <a>Business</a>
        </Link>
        <Link href="/types/types?term=computerscience">
          <a>Computer Science</a>
        </Link>
        <Link href="/types/types?term=healthandlifestyle">
          <a>Health and lifestyle</a>
        </Link>
        <Link href="/types/types?term=leadership">
          <a>Leadership</a>
        </Link>
        <Link href="/types/types?term=food">
          <a>Food</a>
        </Link>
        <Link href="/types/types?term=artsandcrafts">
          <a>Arts and Crafts</a>
        </Link>
        <Link href="/types/types?term=technology">
          <a>Technology</a>
        </Link>
        <Link href="/types/types?term=sport">
          <a>Sport</a>
        </Link>
        <Link href="/types/types?term=other">
          <a>Other</a>
        </Link>
      </div>
    </div>
  );
}
