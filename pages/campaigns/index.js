import React, { Component } from "react";
import { Card, Button } from "semantic-ui-react";
import factory from "../../ethereum/factory";
import Layout from "../../components/Layout";
import Link from "next/link";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";
import GlassCard from "../../components/GlassCard";
import CustomButon from "../../components/CustomButton";
import styles from "../../styles/Campaign.module.css";
import Campaign from "../../ethereum/campaign";

// import "semantic-ui-css/semantic.min.css";

class CampaignIndex extends Component {
  static async getInitialProps() {
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    // console.log("Deployed Campaigns: ", campaigns);

    let campaignDetails = [];

    for (let i = 0; i < campaigns.length; i++) {
      const campaign = Campaign(campaigns[i]);
      const summary = await campaign.methods.getSummary().call();

      campaignDetails.push({
        address: campaigns[i],
        name: summary[0],
        category: summary[1],
        description: summary[2],
        minimumContribution: summary[3].toString(),
        balance: summary[4].toString(),
        requestsCount: summary[5].toString(),
        approversCount: summary[6].toString(),
        manager: summary[7],
      });
    }

    return { campaignDetails };
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
              {
                this.props.campaignDetails.map((campaign) => {
                  return <GlassCard campaign={campaign} />;
                })
              }
            </section>

            <div className={styles.buttonContainer}>
              <CustomButon link="/campaigns/new">Create a Campaign</CustomButon>
            </div>

            {/* {this.renderCampaigns()} */}
          </div>
        </Layout>
      </>
    );
  }
}

export default CampaignIndex;
