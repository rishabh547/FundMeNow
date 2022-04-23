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

  render() {
    return (
      <>
        <Navbar></Navbar>
        <Layout>
          <div>
            <div className={styles.title}>
              <h1 className={styles.heading}>Open Campaigns</h1>
            </div>
            {/* Code for displaying the campaigns */}
            <section className={styles.campaigns}>
              {this.props.campaigns.map((address) => {
                const campaign = {
                  address: address,
                  name: "Name",
                  description: "Description",
                };
                return (
                  <Link href={`/campaigns/${campaign.address}`}>
                    <a>
                      <GlassCard campaign={campaign} />
                    </a>
                  </Link>
                );
              })}
            </section>

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
