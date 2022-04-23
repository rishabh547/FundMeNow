import React, { useState } from "react";
import { Form, Button, Input, Message } from "semantic-ui-react";
import Layout from "../../components/Layout";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";
import { useRouter } from "next/router";

const CampaignNew = () => {
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState("");

  const [minimumContribution, setMinimumContribution] = useState("");
  const [campaignName, setCampaignName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const [loading, setLoading] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();

    setErrorMessage("");
    setLoading(true);

    try {
      // const accounts = await web3.eth.getAccounts();
      web3.eth.requestAccounts().then(async (res) => {
        const accounts = res;

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
            console.log("Transaction hash: ", hash);
          });
      });

      router.push("/");
    } catch (err) {
      setErrorMessage(err.message);
    }
    setLoading(false);
  };

  return (
    <Layout>
      <h3>Create a Campaign</h3>

      <Form onSubmit={onSubmit} error={!!errorMessage}>
        <Form.Field>
          <label>Campaign Name</label>
          <Input
            label="Enter Campaign Name"
            labelPosition="left"
            value={campaignName}
            onChange={(event) => setCampaignName(event.target.value)}
          />
        </Form.Field>

        <Form.Field>
          <label>Campaign Category</label>
          <Input
            label="Enter Campaign Category"
            labelPosition="left"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          />
        </Form.Field>

        <Form.Field>
          <label>Campaign Description</label>
          <Input
            label="Enter Campaign Description"
            labelPosition="left"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </Form.Field>

        <Form.Field>
          <label>Minimum Contribution</label>
          <Input
            label="wei"
            labelPosition="right"
            value={minimumContribution}
            onChange={(event) => setMinimumContribution(event.target.value)}
          />
        </Form.Field>

        <Message error header="Oops!" content={errorMessage} />
        <Button loading={loading} primary>
          Create!
        </Button>
      </Form>
    </Layout>
  );
};

export default CampaignNew;
