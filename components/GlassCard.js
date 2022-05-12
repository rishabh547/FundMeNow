import React from "react";
import Head from "next/head";
import Link from "next/link";

export default (props) => {
  let campaign;
  ({ campaign } = props);
  return (
    <Link href={`/campaigns/${campaign.address}`}>
      <a>
        <div>
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
