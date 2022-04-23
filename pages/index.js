import React, { Component } from "react";
// import { Card, Button } from "semantic-ui-react";
import factory from "../ethereum/factory";
import Layout from "../components/Layout";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Link from "next/link";
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

    return <div></div>;
  }

  render() {
    return (
      <>
        <Navbar></Navbar>
        <Hero></Hero>
      </>
    );
  }
}

export default CampaignIndex;
