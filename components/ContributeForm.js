import React, { useState } from "react";
import { Form, Input, Message, Button } from "semantic-ui-react";
import Campaign from "../ethereum/campaign";
import web3 from "../ethereum/web3";
import { useRouter } from "next/router";
import { useToasts } from "react-toast-notifications";
import nprogress from "nprogress";

const ContributeForm = (props) => {
  const router = useRouter();
  const { addToast } = useToasts();

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    nprogress.start();

    // validate the input
    if (!value) {
      addToast("Please enter a valid amount", {
        appearance: "error",
        autoDismiss: true,
      });
      nprogress.done();
      // setErrorMessage("Please enter a valid amount");
      return;
    }

    const campaign = Campaign(props.address);

    setLoading(true);
    setErrorMessage("");

    try {
      web3.eth.requestAccounts().then(async (res) => {
        const accounts = res;

        await campaign.methods
          .contribute()
          .send({
            from: accounts[0],
            value: web3.utils.toWei(value, "ether"),
          })
          .on("transactionHash", function (hash) {
            addToast(`Transaction is being mined... Transaction Hash - ${hash}`, {
              appearance: "info",
              autoDismiss: true,
            });
            nprogress.done();
            router.replace("/campaigns/[address]", `/campaigns/${props.address}`);
          });
      });

    } catch (err) {
      addToast("Error: " + err.message, { appearance: "error", autoDismiss: true });
      setErrorMessage(err.message);
    }
    setLoading(false);
    setValue("");
  };

  return (
    <Form onSubmit={onSubmit} error={!!errorMessage}>
      <div className="bg-black p-6 bg-opacity-30 rounded-lg backdrop-blur-xl backdrop-filter my-8">
        <p className="mx-4">Contribution Amount : </p>
        <input
          type="text"
          className="bg-gray-300 m-4 p-4 rounded-lg text-black shadow-inner shadow-cyan-500 outline-none"
          placeholder="Contribution in ether"
          value={value}
          onChange={(event) => setValue(event.target.value)}
        /> ether
        {errorMessage && <Message error header="Oops!" content={errorMessage} />}
        <div className="flex m-4 p-4 bg-black rounded-lg justify-center w-40 hover:text-white hover:shadow-cyan-500 hover:shadow-lg">
          <button className="animate-pulse transition-800">Contribute</button>
        </div>
      </div>

    </Form>
  )
};

export default ContributeForm;
