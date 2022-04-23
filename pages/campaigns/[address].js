import React, { Component } from "react";
import { Card, Grid, Button } from "semantic-ui-react";
import Layout from "../../components/Layout";
import Campaign from "../../ethereum/campaign";
import web3 from "../../ethereum/web3";
import ContributeForm from "../../components/ContributeForm";
import Link from "next/link";

class CampaignShow extends Component {
  static async getInitialProps(props) {
    // passing the contract instance address of deployed contract instance by factory to get the instance object of that campaign locally
    const campaign = Campaign(props.query.address);

    const summary = await campaign.methods.getSummary().call();
    console.log(summary);

    return {
      address: props.query.address,
      minimumContribution: summary[0].toString(),
      balance: summary[1].toString(),
      requestsCount: summary[2].toString(),
      approversCount: summary[3].toString(),
      manager: summary[4],
    };
  }

  renderCards() {
    const {
      balance,
      manager,
      minimumContribution,
      requestsCount,
      approversCount,
    } = this.props;

    const items = [
      {
        header: manager,
        meta: "Address of Manager",
        description:
          "The manager created this campaign and can create requests to withdraw money",
        style: { overflowWrap: "break-word" },
      },
      {
        header: parseInt(minimumContribution, 16),
        meta: "Minimum Contribution (wei)",
        description:
          "You must contribute at least this much wei to become an approver",
      },
      {
        header: parseInt(requestsCount, 16),
        meta: "Number of Requests",
        description:
          "A request tries to withdraw money from the contract. Requests must be approved by approvers",
      },
      {
        header: parseInt(approversCount, 16),
        meta: "Number of Approvers",
        description:
          "Number of people who have already donated to this campaign",
      },
      {
        // header: web3.utils.fromWei(balance, 'ether'),
        header: parseInt(balance, 16),
        meta: "Campaign Balance (wei)",
        // meta: 'Campaign Balance (ether)',
        description:
          "The balance is how much money this campaign has left to spend.",
      },
    ];

    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <h3>Campaign Show</h3>
        <Grid>
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
        </Grid>
      </Layout>
    );
  }
}

export default CampaignShow;
