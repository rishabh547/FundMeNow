import React, { Component } from "react";
import { Card, Button } from "semantic-ui-react";
import factory from "../../ethereum/factory";
import Layout from "../../components/Layout";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import GlassCard from "../../components/GlassCard";
import styles from "../../styles/Campaign.module.css";

// import "semantic-ui-css/semantic.min.css";

class CampaignIndex extends Component {
  static async getInitialProps() {
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    console.log("Deployed Campaigns: ", campaigns);
    return { campaigns };
  }

  renderCampaigns() {
    const items = this.props?.campaigns?.map((address) => {
      return {
        header: address,
        description: (
          <Link href={`/campaigns/${address}`}>
            <a>View Campaign</a>
          </Link>
        ),
        fluid: true,
      };
    });

    return <Card.Group items={items} />;
  }

  render() {
    return (
      <>
        <Navbar></Navbar>
        <Layout>
          <div>
            <div className={styles.title}>
              <h1>Open Campaigns</h1>
            </div>
            <div className={styles.campaigns}>
              <GlassCard></GlassCard>
            </div>

            <Link href="/campaigns/new">
              <a>
                <Button
                  floated="right"
                  content="Create Campaign"
                  icon="add circle"
                  primary
                />
              </a>
            </Link>

            {/* {this.renderCampaigns()} */}
          </div>
        </Layout>
      </>
    );
  }
}

export default CampaignIndex;
