import React, { Component } from "react";
import { Button, Table } from "semantic-ui-react";
import Link from "next/link";
import Campaign from "../../../../ethereum/campaign";
import RequestRow from "../../../../components/RequestRow";
import Navbar from "../../../../components/NavbarNew";

class RequestIndex extends Component {
  static async getInitialProps(props) {
    const { address } = props.query;
    const campaign = Campaign(address);
    const requestCount = await campaign.methods.getRequestsCount().call();
    const approversCount = await campaign.methods.approversCount().call();

    const requests = await Promise.all(
      Array(parseInt(requestCount))
        .fill()
        .map((element, index) => {
          return campaign.methods.requests(index).call();
        })
    );

    const modifiedRequests = requests.map((request, index) => {
      return {
        id: index,
        description: request.description,
        value: request.value,
        recipient: request.recipient,
        complete: request.complete,
        approvalCount: request.approvalCount,
      };
    });

    return { address, modifiedRequests, requestCount, approversCount };
  }

  render() {
    const { Header, Row, HeaderCell, Body } = Table;

    return (
      <div className="bg-gradient-to-br from-black via-gray-900 to-cyan-500 w-full h-screen text-white">
        <Navbar></Navbar>
        <div className="flex flex-col align-middle justify-center">
          <div className="">
            <h1 className="">Requests</h1>
          </div>
          <div className="">
            <Link
              href={`/campaigns/${this.props.address}/requests/new`} className="bg-white text-black rounded-lg p-4"
            >
              Add Request
            </Link>
          </div>
          <Table className='bg-white text-black rounded-lg m-8'>
            <Header>
              <Row>
                <HeaderCell>ID</HeaderCell>
                <HeaderCell>Description</HeaderCell>
                <HeaderCell>Amount</HeaderCell>
                <HeaderCell>Recipient</HeaderCell>
                <HeaderCell>Approval Count</HeaderCell>
                <HeaderCell>Approve</HeaderCell>
                <HeaderCell>Finalize</HeaderCell>
              </Row>
            </Header>
            <Body>
              {this.props.modifiedRequests.map((request) => {
                return (
                  <>
                    <RequestRow
                      key={request.id.toString()}
                      id={request.id.toString()}
                      // request={JSON.stringify(request)}
                      description={request.description}
                      value={request.value}
                      recipient={request.recipient}
                      approvalCount={request.approvalCount}
                      complete={request.complete}
                      approversCount={this.props.approversCount.toString()}
                      address={this.props.address.toString()}
                    />
                  </>
                );
              })}
            </Body>
          </Table>
          <div>Found {this.props.requestCount.toString()} requests.</div>
        </div>
      </div>
    );
  }
}

export default RequestIndex;
