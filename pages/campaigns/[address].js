import React, { Component } from "react";
import { Card, Grid, Button } from "semantic-ui-react";
import Layout from "../../components/Layout";
import Campaign from "../../ethereum/campaign";
import web3 from "../../ethereum/web3";
import ContributeForm from "../../components/ContributeForm";
import Navbar from "../../components/Navbar";
import DetailCard from "../../components/DetailCard";
import CustomButton from "../../components/CustomButton";
import Link from "next/link";
import styles from "../../styles/CampaignDetail.module.css";

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
      <>
        <Navbar></Navbar>
        <div className={styles.title}>
          <h1 className={styles.heading}>Campaign Details</h1>
        </div>
        <main className={styles.container}>
          <section className={styles.campaigns}>
            <DetailCard heading="Name" value={name}></DetailCard>
            <DetailCard heading="Description" value={description}></DetailCard>
            <DetailCard heading="Category" value={category}></DetailCard>
            <DetailCard
              heading="Balance"
              value={web3.utils.fromWei(balance, "ether").toString()}
            ></DetailCard>
            <DetailCard heading="Manager" value={manager}></DetailCard>
            <DetailCard
              heading="Minimum Contribution"
              value={minimumContribution}
            ></DetailCard>
            <DetailCard
              heading="Requests Count"
              value={requestsCount}
            ></DetailCard>
            <DetailCard
              heading="Approvers Count"
              value={approversCount}
            ></DetailCard>
          </section>
          <section>
            <ContributeForm address={this.props.address} />
            <div className={styles.buttonContainer}>
              <CustomButton link={`/campaigns/${this.props.address}/requests`}>
                View Requests
              </CustomButton>
            </div>
          </section>
        </main>
      </>
    );
  }
}

export default CampaignShow;

/* <Grid>
          <Grid.Row>
            <Grid.Column width={10}>{this.renderCards()}</Grid.Column>

            <Grid.Column width={6}>
              <ContributeForm address={this.props.address} />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              <Link href={`/campaigns/${this.props.address}/requests`}>
                <a>
                  <Button primary>View Requests</Button>
                </a>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid> */
