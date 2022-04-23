import React from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/CustomButton.module.css";

export default (props) => {
  return (
    <Link href={props.link}>
      <a>
        <button className={styles.createButton}>{props.children}</button>
      </a>
    </Link>
  );
};
