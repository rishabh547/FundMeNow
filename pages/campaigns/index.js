import React, { Component } from "react";
import factory from "../../ethereum/factory";
import Link from "next/link";
import { useRouter } from "next/router";
import Navbar from "../../components/NavbarNew";
import GlassCard from "../../components/GlassCard";
import Campaign from "../../ethereum/campaign";

class CampaignIndex extends Component {
  static async getInitialProps() {
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    console.log("Deployed Campaigns: ", campaigns);

    let campaignDetails = [];
    //Need to handle Runtime error here
    //What if Campaign length is zero?
    if (campaigns?.length === 0) {
      // setErrorMessage("Campaign Size is zero");
      // setLoading(false);
      return campaignDetails;
    }
    for (let i = 0; i < campaigns?.length; i++) {
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
      <div className="bg-gradient-to-br from-black via-gray-900 to-cyan-500 w-full h-full text-white ">
        <Navbar></Navbar>
        <div className="">
          <div className="flex align-center justify-between">
            <h1 className="text-4xl mt-6 mx-12">Open Campaigns</h1>
          </div>
          <section className="bg-black bg-opacity-50 backdrop-blur-lg backdrop-filter rounded-xl grid grid-cols-3 gap-1 p-16 pb-6 overflow-y-auto scrollbar-none mx-20 my-4">
            {
              this.props.campaignDetails?.map((campaign) => {
                return <GlassCard campaign={campaign} />;
              })
            }
          </section>
        </div>
      </div>
    );
  }
}

export default CampaignIndex;
