import { FaBars, FaTimes, FaRegDotCircle } from "react-icons/fa";
import { SiWebpack } from "react-icons/si";
import { useState, useEffect } from "react"; //have to bring in when you want to use a specific context
import Search from "./Search";
import Link from "next/link";
import styles from "@/styles/Header.module.css";

export default function Header() {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const [authenticated, setAuthenticated] = useState(false);

  return (
    <div className={styles.header}>
      <div className={styles.logoNav}>
        <div className={styles.logoContainer}>
          <Link href="/">
            <a className={styles.logo}>
              {/* <FaRegDotCircle  /> */}
              Webinar Finder
            </a>
          </Link>
        </div>
        <ul
          className={
            click ? `${styles.navOptions} ${styles.active}` : styles.navOptions
          }
        >
          {authenticated && (
            <>
              <li className={styles.option} onClick={closeMobileMenu}>
                <a href="#">Webinars</a>
              </li>
              <li className={styles.option} onClick={closeMobileMenu}>
                <a href="#">Add Events</a>
              </li>
              <li className={styles.option} onClick={closeMobileMenu}>
                <a href="#">Dashboard</a>
              </li>
              <li className={styles.option}>
                <Search />
              </li>
            </>
          )}

          {!authenticated && (
            <>
              <li className={`${styles.option} ${styles.mobileOption}`}>
                <Search />
              </li>
              <li
                className={`${styles.option} ${styles.mobileOption}`}
                onClick={closeMobileMenu}
              >
                <a href="#">SIGN-IN</a>
              </li>
              <li
                className={`${styles.option} ${styles.mobileOption}`}
                onClick={closeMobileMenu}
              >
                <a href="" className={styles.signUp}>
                  SIGN-UP
                </a>
              </li>
            </>
          )}
        </ul>
      </div>
      {!authenticated && (
        <ul className={styles.signinUp}>
          <li className={styles.search}>
            <Search />
          </li>
          <li className={styles.signIn} onClick={closeMobileMenu}>
            <a href="#">SIGN-IN</a>
          </li>
          <li onClick={closeMobileMenu}>
            <a href="" className={styles.signupBtn}>
              SIGN-UP
            </a>
          </li>
        </ul>
      )}

      <div className={styles.mobileMenu} onClick={handleClick}>
        {click ? (
          <FaTimes className={styles.menuIcon} />
        ) : (
          <FaBars className={styles.menuIcon} />
        )}
      </div>
    </div>
  );
}
