import React from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/CustomButton.module.css";

export default (props) => {
  return (
    <button className={styles.createButton} onClick={props.func}>
      {props.children}
    </button>
  );
};
