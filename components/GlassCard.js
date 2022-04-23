import React from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/GlassCard.module.css";

export default (props) => {
  let campaign;
  ({ campaign } = props);
  return (
    <Link href={`/campaigns/${campaign.address}`}>
      <a>
        <div class={styles.card}>
          <p>{campaign.name}</p>
          <p>{campaign.description}</p>
          {/* <p class={styles.card_number}>{campaign.address}</p> */}
        </div>
      </a>
    </Link>
  );
};
