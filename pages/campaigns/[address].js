import React, { Component } from "react";
import Campaign from "../../ethereum/campaign";
import web3 from "../../ethereum/web3";
import ContributeForm from "../../components/ContributeForm";
import Navbar from "../../components/NavbarNew";
import Link from "next/link";

class CampaignShow extends Component {
  static async getInitialProps(props) {
    // passing the contract instance address of deployed contract instance by factory to get the instance object of that campaign locally
    const campaign = Campaign(props.query.address);

    const summary = await campaign.methods.getSummary().call();
    console.log(summary);

    return {
      address: props.query.address,
      name: summary[0],
      category: summary[1],
      description: summary[2],
      minimumContribution: summary[3].toString(),
      balance: summary[4].toString(),
      requestsCount: summary[5].toString(),
      approversCount: summary[6].toString(),
      manager: summary[7],
    };
  }

  render() {
    const {
      name,
      description,
      category,
      balance,
      manager,
      minimumContribution,
      requestsCount,
      approversCount,
    } = this.props;

    return (
      <div className="bg-gradient-to-br from-black via-gray-900 to-cyan-500 w-full h-screen text-white">
        <Navbar></Navbar>
        <Link href="/campaigns" className="">
          <h1 className="text-md mt-6 mb-3 mx-12 w-32 text-gray-300 hover:text-white  cursor-pointer"> <b className="text-cyan-500">←</b> All campaigns</h1>
        </Link>
        <main className="flex ">
          <section className="bg-black bg-opacity-50 backdrop-blur-lg backdrop-filter rounded-xl p-16  overflow-y-auto mx-20 my-4">
            <div class="flex justify-start items-center cursor-default h-60 bg-gradient-to-br from-cyan-500 via-white to-white text-black m-8 mt-0 rounded-lg border-2 border-cyan-500 shadow-cyan-500 shadow-lg">
              <div class="p-6">
                <div id="header" class="flex items-center mb-4">
                  <img alt="avatar" class="w-20 rounded-full border-2 border-gray-300" src="https://picsum.photos/seed/picsum/200" />
                  <div id="header-text" class="leading-5 ml-6 sm">
                    <h4 id="name" class="text-xl text-black font-semibold">{name}</h4>
                    <h5 id="job" class="font-semibold text-cyan-600">{category}</h5>
                  </div>
                </div>
                <div id="quote">
                  <q class="italic text-gray-600">{description}</q>
                </div>
                <div className="flex justify-end text-gray-700 mt-3 font-extralight">Minimum Contribution <b>: {minimumContribution} wei</b></div>
              </div>
            </div>

            <div className="container px-4 pt-2">
              <div className="flex text-xl align-middle justify-start m-4">
                <p>Campaign Balance</p>
                <p className="px-4">-</p>
                <p className=""> <b className="text-cyan-500">{web3.utils.fromWei(balance, "ether").toString()}</b>  ether</p>
              </div>

              <div className="flex text-xl align-middle justify-start m-4">
                <p>Manager Address</p>
                <p className="px-4">-</p>
                <p className=""> {manager}</p>
              </div>

              <div className="flex justify-between mt-6">
                <div className="flex-col  text-xl align-middle justify-start m-4">
                  <p>Requests Count</p>
                  <p className="flex text-2xl justify-center text-cyan-500"> <b>{requestsCount}</b> </p>
                </div>

                <div className="flex-col text-xl align-middle justify-start m-4">
                  <p>Contributers Count</p>
                  <p className="flex justify-center text-cyan-500 text-2xl"> <b>{approversCount}</b> </p>
                </div>
              </div>

            </div>

          </section>
          <section>
            <ContributeForm address={this.props.address} />

            <Link href={`/campaigns/${this.props.address}/requests`} class="max-w-7xl mx-auto shadow-lg shadow-white rounded-lg mr-20">
              <div class="relative group">
                <div class="absolute -inset-1 bg-gradient-to-r from-black to-cyan-500 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                <div class="relative px-7 py-6 bg-white opacity-80 ring-1 ring-gray-900/5 rounded-lg leading-none flex items-top justify-start space-x-6">
                  <div class="space-y-2">
                    <p class="text-slate-800"><b>View Requests</b></p>
                    <p class="block text-cyan-500 group-hover:text-cyan-800 transition duration-200" target="_blank"><b>requests Details →</b> </p>
                  </div>
                </div>
              </div>
            </Link>

          </section>
        </main>
      </div >
    );
  }
}

export default CampaignShow;
