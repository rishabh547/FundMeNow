import React, { Component } from "react";
import { Table, Button } from "semantic-ui-react";
import web3 from "../ethereum/web3";
import Campaign from "../ethereum/campaign";
import { useToasts } from 'react-toast-notifications';
import nprogress from "nprogress";

const RequestRow = (props) => {
  const { addToast } = useToasts();

  const onApprove = async () => {
    const campaign = Campaign(props.address);
    nprogress.start();

    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });

    try {
      await campaign.methods.approveRequest(props.id).send({
        from: accounts[0],
      });
      addToast("Request approved", { appearance: 'success', autoDismiss: true });
      nprogress.done();
      // reload the same tab
      window.location.reload();
    }
    catch (err) {
      addToast("Error: " + err.error.message, { appearance: "error", autoDismiss: true });
      nprogress.done();
      // alert(err.error.message);
    }
  };

  const onFinalize = async () => {
    const campaign = Campaign(props.address);
    nprogress.start();
    const accounts = await web3.eth.getAccounts();
    await campaign.methods.finalizeRequest(props.id).send({
      from: accounts[0],
    });
    addToast("Request finalized", { appearance: 'success', autoDismiss: true });
    nprogress.done();
  };

  var {
    id,
    value,
    description,
    complete,
    approvalCount,
    recipient,
    approversCount,
  } = props;


  const readyToFinalize = approvalCount > approversCount / 2;

  return (
    <tr className="">
      <td className="py-6"><p className="flex justify-center">{id}</p></td>
      <td className=""><p className="flex justify-center">{description}</p></td>
      {/* <Cell>{web3.utils.fromWei(this.state.value.toString(), "ether")}</Cell> */}
      <td><p className="flex justify-center">{value} wei</p></td>
      <td><p className="flex justify-center">{recipient}</p></td>
      <td><p className="flex justify-center">{approvalCount}/{approversCount}</p>

      </td>
      <td>
        {complete ? null : (
          <div className="flex justify-center">
            <button className="bg-green-500 rounded-lg p-2 px-4 hover:bg-green-700 hover:shadow-lg hover:shadow-white flex justify-center" onClick={onApprove}>
              Approve
            </button>
          </div>

        )}
      </td>
      <td>
        {!complete && readyToFinalize ? (
          <div className="flex justify-center ml-2">
            <button className="bg-gray-900 hover:bg-black hover:shadow-lg hover:shadow-cyan-300 text-cyan-300 rounded-lg p-2 px-4" onClick={onFinalize}>
              Finalize
            </button>
          </div>
        ) : (
          <div className="flex justify-center">
            <button className="bg-gray-400 p-2 px-4 cursor-not-allowed rounded-lg">Finalize</button>
          </div>
        )}
      </td>
    </tr>
  );

}

export default RequestRow;
