import React, { useState } from "react";
import { Form, Button, Input, Message } from "semantic-ui-react";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";
import { useRouter } from "next/router";
import Navbar from "../../components/NavbarNew";
import campaign from "../../ethereum/campaign";
import Link from 'next/link';
import { useToasts } from "react-toast-notifications";
import nprogress from "nprogress";

const CampaignNew = () => {
  const router = useRouter();
  const { addToast } = useToasts();

  const [errorMessage, setErrorMessage] = useState("");

  const [minimumContribution, setMinimumContribution] = useState("");
  const [campaignName, setCampaignName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const [loading, setLoading] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    nprogress.start();
    setErrorMessage("");
    setLoading(true);

    try {
      // const accounts = await web3.eth.getAccounts();
      web3.eth.requestAccounts().then(async (res) => {
        const accounts = res;

        // validate the input
        if (campaignName.trim().length === 0) {
          addToast("Campaign name cannot be empty", {
            appearance: "error",
            autoDismiss: true,
          });
          // setErrorMessage("Campaign Name cannot be empty");
          setLoading(false);
          nprogress.done();
          return;
        }

        if (description.trim().length === 0) {
          // setErrorMessage("Description cannot be empty");
          addToast("Description cannot be empty", {
            appearance: "error",
            autoDismiss: true,
          });
          setLoading(false);
          nprogress.done();
          return;
        }

        if (category.trim().length === 0) {
          // setErrorMessage("Category cannot be empty");
          addToast("Category cannot be empty", {
            appearance: "error",
            autoDismiss: true,
          });
          setLoading(false);
          nprogress.done();
          return;
        }

        if (minimumContribution <= 0) {
          // setErrorMessage("Minimum Contribution must be greater than 0");
          addToast("Minimum Contribution must be greater than 0", {
            appearance: "error",
            autoDismiss: true,
          });
          setLoading(false);
          nprogress.done();
          return;
        }

        await factory.methods
          .createCampaign(
            campaignName,
            category,
            description,
            minimumContribution
          )
          .send({
            from: accounts[0],
          })
          .on("transactionHash", function (hash) {
            addToast(`Transaction is being mined... Transaction Hash - ${hash}`, {
              appearance: "info",
              autoDismiss: true,
            });
            nprogress.done();
            router.push("/campaigns");
          });
      });

      // router.push("/");
    } catch (err) {
      setErrorMessage(err.message);
      addToast("Error: " + err.message, { appearance: "error", autoDismiss: true });
    }
    setLoading(false);
  };

  return (
    <div className="bg-gradient-to-br from-black via-gray-900 to-cyan-500 w-full h-screen text-white">
      <Navbar></Navbar>

      <main className="flex justify-center align-middle">
        <section className="bg-black bg-opacity-50 backdrop-blur-lg backdrop-filter rounded-xl p-12 px-32 overflow-y-auto mx-20 my-8">

          <div className="container">

            <div className="">
              <h1 className="text-4xl p-2 mb-8"><b className="text-cyan-500">New</b> Campaign</h1>
            </div>

            <form onSubmit={onSubmit}>
              <div className="w-70">
                <div className="">

                  <div className="">
                    <p>Campaign Name: </p>
                    <input
                      type="text"
                      className="p-3 px-28 m-4 mt-2 rounded-lg text-gray-900"
                      value={campaignName}
                      onChange={(event) => setCampaignName(event.target.value)}
                      placeholder="Enter Campaign Name"
                    />
                  </div>

                  <div className="">
                    <p>Campaign Category: </p>
                    <input
                      type="text"
                      className="p-3 text-gray-900 px-28 m-4  mt-2 rounded-lg "
                      value={category}
                      onChange={(event) => setCategory(event.target.value)}
                      placeholder="Select Campaign Category"
                    />
                  </div>
                  <div className="">
                    <p>Campaign Description: </p>
                    <textarea
                      type="text"
                      className="p-3 text-gray-900 px-28 m-4 ml-6 mt-2 rounded-lg"
                      value={description}
                      onChange={(event) => setDescription(event.target.value)}
                      placeholder="Enter Campaign Description"
                    />
                  </div>
                  <div className="">
                    <p>Minimum Contribution (wei): </p>
                    <input
                      type="text"
                      className="p-3 text-gray-900 px-28 m-4 mb-2 mt-2 rounded-lg"
                      value={minimumContribution}
                      onChange={(event) =>
                        setMinimumContribution(event.target.value)
                      }
                      placeholder="Contribution In Wei"
                    />
                  </div>
                  {errorMessage && (
                    <Message error header="Oops!" content={errorMessage} />
                  )}

                  <div className="bg-black rounded-lg text-gray-400 hover:text-white m-4 p-4 mb-0 flex justify-center align-middle hover:shadow-lg hover:shadow-cyan-500">
                    <button className="">Register</button>
                  </div>
                </div>
              </div>

            </form>
          </div>

        </section>
      </main>
    </div >
  );
};

export default CampaignNew;


