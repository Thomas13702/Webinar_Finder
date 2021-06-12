import { FaBars, FaTimes, FaRegDotCircle } from "react-icons/fa";
import { SiWebpack } from "react-icons/si";
import { useState, useEffect, useContext } from "react"; //have to bring in when you want to use a specific context
import Search from "./Search";
import DropDownMenu from "./DropDownMenu";
import Link from "next/link";
import styles from "@/styles/Header.module.css";
import AuthContext from "@/context/AuthContext";

export default function Header() {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const [authenticated, setAuthenticated] = useState(true);

  const { user, logout, login } = useContext(AuthContext);

  useEffect(() => {
    user ? setAuthenticated(true) : setAuthenticated(false);
  });

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
              <li className={styles.option}>
                <DropDownMenu closeMobileMenu={closeMobileMenu} />
              </li>
              <li className={styles.option} onClick={closeMobileMenu}>
                <a href="/webinars/add">Add Events</a>
              </li>
              <li className={styles.option} onClick={closeMobileMenu}>
                <a href="/account/dashboard">Dashboard</a>
              </li>
              <li className={styles.option}>
                <Search />
              </li>
              <li
                className={`${styles.option}`}
                onClick={() => {
                  closeMobileMenu;
                  logout();
                }}
              >
                <a href="#" className={styles.signUp}>
                  Logout
                </a>
              </li>
            </>
          )}

          {!authenticated && (
            <>
              <li className={`${styles.option} ${styles.mobileOption}`}>
                <DropDownMenu />
              </li>
              <li className={`${styles.option} ${styles.mobileOption}`}>
                <Search />
              </li>
              <li
                className={`${styles.option} ${styles.mobileOption}`}
                onClick={closeMobileMenu}
              >
                <a href="/account/login">SIGN-IN</a>
              </li>
              <li
                className={`${styles.option} ${styles.mobileOption}`}
                onClick={closeMobileMenu}
              >
                <a href="/account/register" className={styles.signUp}>
                  SIGN-UP
                </a>
              </li>
            </>
          )}
        </ul>
      </div>
      {!authenticated && (
        <ul className={styles.signinUp}>
          <li className={styles.signIn}>
            <DropDownMenu />
          </li>
          <li className={styles.search}>
            <Search />
          </li>
          <li className={styles.signIn} onClick={closeMobileMenu}>
            <a href="/account/login">SIGN-IN</a>
          </li>
          <li onClick={closeMobileMenu}>
            <a href="/account/register" className={styles.signupBtn}>
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
