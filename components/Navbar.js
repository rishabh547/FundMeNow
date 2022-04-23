import React from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Navbar.module.css";

export default (props) => {
  return (
    <div className={styles.nav}>
      <Link href="/">
        <a>
          <div className={styles.navLink}>
            <h3>FundMeNow</h3>
          </div>
        </a>
      </Link>
      <Link href="/campaigns">
        <a>
          <div className={styles.navLink}>
            <h3>Campaigns</h3>
          </div>
        </a>
      </Link>
      <Link href="campaigns/new">
        <a>
          <div className={styles.navLink}>
            <h3>Create</h3>
          </div>
        </a>
      </Link>
    </div>
  );
};
