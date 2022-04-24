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
          <p>Name: {campaign.name}</p>
          <p>Description: {campaign.description}</p>
          <p>Category: {campaign.category}</p>
          <p>Minimum Contribution: {campaign.minimumContribution} wei</p>
          {/* <p class={styles.card_number}>{campaign.address}</p> */}
        </div>
      </a>
    </Link>
  );
};
