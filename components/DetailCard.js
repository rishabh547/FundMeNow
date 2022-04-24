import React from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/DetailCard.module.css";

export default (props) => {
  return (
    <div class={styles.card}>
      <p>{props.heading}</p>
      <p>{props.value}</p>
      {/* <p class={styles.card_number}>{campaign.address}</p> */}
    </div>
  );
};
