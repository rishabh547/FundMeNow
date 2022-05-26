import React, { useState } from "react";
import { Form, Button, Message, Input } from "semantic-ui-react";
import Campaign from "../../../../ethereum/campaign";
import web3 from "../../../../ethereum/web3";
import Link from "next/link";
import { useRouter } from "next/router";
import Navbar from "../../../../components/NavbarNew";
import { useToasts } from "react-toast-notifications";
import nprogress from "nprogress";

const RequestNew = ({ address }) => {
  const router = useRouter();
  const { addToast } = useToasts();

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [recipient, setRecipient] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    nprogress.start();

    // validate the input
    if (!recipient || !description || !value) {
      setErrorMessage("Please enter all fields");
      nprogress.done();
      return;
    }
    if (!web3.utils.isAddress(recipient)) {
      setErrorMessage("Please enter a valid address");
      nprogress.done();
      return;
    }
    if (value <= 0) {
      setErrorMessage("Please enter a valid amount");
      nprogress.done();
      return;
    }

    const campaign = Campaign(address);

    setLoading(true);
    setErrorMessage("");

    try {
      web3.eth.requestAccounts().then(async (res) => {
        const accounts = res;

        // check if the user is the contracts manager
        const campaignDetails = await campaign.methods.getSummary().call();
        const manager = campaignDetails[7].toString();
        if (accounts[0] !== manager) {
          addToast("You are not the manager of this campaign", {
            appearance: "error",
            autoDismiss: true,
          });
          setErrorMessage("You are not the manager of this campaign, Only managers can create a request");
          setLoading(false);
          nprogress.done();
          return;
        }

        await campaign.methods
          .createRequest(
            description,
            web3.utils.toWei(value, "ether"),
            recipient
          )
          .send({ from: accounts[0] });

        addToast("Request created successfully", {
          appearance: "success",
          autoDismiss: true,
        });
        nprogress.done();
        router.push(`/campaigns/${address}/requests`);
      });
    } catch (err) {
      setErrorMessage(err.message);
    }
    setLoading(false);
  };

  return (
    <>
      <div className="bg-gradient-to-br from-black via-gray-900 to-cyan-500 w-full h-screen text-white">
        <Navbar></Navbar>

        <main className="flex justify-center align-middle">
          <section className="bg-black bg-opacity-50 backdrop-blur-lg backdrop-filter rounded-xl p-12 px-32 overflow-y-auto mx-20 my-8">
            <div className="flex justify-end">
              <Link href={`/campaigns/${address}/requests`} className="">
                <h1 className="text-md mt-6 mb-3 mx-0 w-28 text-gray-300 hover:text-white  cursor-pointer"> <b className="text-cyan-500">←</b> All requests</h1>
              </Link>
            </div>

            <div className="container">

              <div className="">
                <h1 className="text-4xl p-2 mb-8"><b className="text-cyan-500">New</b> Request</h1>
              </div>

              <form onSubmit={onSubmit}>
                <div className="w-70">
                  <div className="">

                    <div className="">
                      <p>Request Description: </p>
                      <input
                        type="text"
                        className="p-3 px-28 m-4 mt-2 rounded-lg text-gray-900"
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        placeholder="Request Description"
                      />
                    </div>

                    <div className="">
                      <p>Request Amount (ether): </p>
                      <input
                        type="text"
                        className="p-3 text-gray-900 px-28 m-4  mt-2 rounded-lg "
                        value={value}
                        onChange={(event) => setValue(event.target.value)}
                        placeholder="Request Amount in ether"
                      />
                    </div>
                    <div className="">
                      <p>Recipient Wallet Address: </p>
                      <input
                        type="text"
                        className="p-3 text-gray-900 px-28 m-4 mt-2 rounded-lg"
                        value={recipient}
                        onChange={(event) => setRecipient(event.target.value)}
                        placeholder="Recipient"
                      />
                    </div>

                    {errorMessage && (
                      <Message error header="Oops!" content={errorMessage} />
                    )}
                    <div className="bg-black rounded-lg text-gray-400 hover:text-white m-4 p-4 mb-0 flex justify-center align-middle hover:shadow-lg hover:shadow-cyan-500">
                      <button className="">Create Request</button>
                    </div>
                  </div>
                </div>

              </form>
            </div>

          </section>
        </main>
      </div >
    </>
  );
};

RequestNew.getInitialProps = ({ query }) => {
  const { address } = query;

  return { address };
};

export default RequestNew;
