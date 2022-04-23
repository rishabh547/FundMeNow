import React from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/GlassCard.module.css";

export default (props) => {
  return (
    <div class={styles.card}>
      <p>MY CARD</p>
      <p class={styles.card_number}>4242 8224 6317 0005</p>
    </div>
  );
};
