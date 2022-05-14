import React, { Component } from "react";
import { Table, Button } from "semantic-ui-react";
import web3 from "../ethereum/web3";
import Campaign from "../ethereum/campaign";

class RequestRow extends Component {

  onApprove = async () => {
    const campaign = Campaign(this.props.address);

    const accounts = await web3.eth.getAccounts();
    await campaign.methods.approveRequest(this.props.id).send({
      from: accounts[0],
    });
  };

  onFinalize = async () => {
    const campaign = Campaign(this.props.address);

    const accounts = await web3.eth.getAccounts();
    await campaign.methods.finalizeRequest(this.props.id).send({
      from: accounts[0],
    });
  };

  constructor(props) {
    super(props);

    this.state = {
      id: '',
      value: 0,
      description: '',
      complete: false,
      approvalCount: 0,
      recipient: '',
      approversCount: ''
    }
  }

  render() {
    const { Row, Cell } = Table;

    var {
      id,
      value,
      description,
      complete,
      approvalCount,
      recipient,
      approversCount,
    } = this.props;

    this.setState({
      id: id,
      value: value,
      description: description,
      complete: complete,
      approvalCount: approvalCount.toString(),
      recipient: recipient,
    });

    const readyToFinalize = this.state.approvalCount > approversCount / 2;

    return (
      <Row
        disabled={this.state.complete}
        positive={readyToFinalize && !this.state.complete}
      >
        <Cell>{id}</Cell>
        <Cell>{this.state.description}</Cell>
        {/* <Cell>{web3.utils.fromWei(this.state.value.toString(), "ether")}</Cell> */}
        <Cell>{this.state.value} wei</Cell>
        <Cell>{this.state.recipient}</Cell>
        <Cell>
          {this.state.approvalCount}/{approversCount}
        </Cell>
        <Cell>
          {this.state.complete ? null : (
            <Button color="green" basic onClick={this.onApprove}>
              Approve
            </Button>
          )}
        </Cell>
        <Cell>
          {this.state.complete ? null : (
            <Button color="teal" basic onClick={this.onFinalize}>
              Finalize
            </Button>
          )}
        </Cell>
      </Row>
    );
  }
}

export default RequestRow;
