import React, { useState } from "react";
import { Form, Button, Message, Input } from "semantic-ui-react";
import Campaign from "../../../../ethereum/campaign";
import web3 from "../../../../ethereum/web3";
import Link from "next/link";
import { useRouter } from "next/router";
import Navbar from "../../../../components/Navbar";
import styles from "../../../../styles/RequestForm.module.css";
import Layout from "../../../../components/Layout";

const RequestNew = ({ address }) => {
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [recipient, setRecipient] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();

    const campaign = Campaign(address);

    setLoading(true);
    setErrorMessage("");

    try {
      web3.eth.requestAccounts().then(async (res) => {
        const accounts = res;

        await campaign.methods
          .createRequest(
            description,
            web3.utils.toWei(value, "ether"),
            recipient
          )
          .send({ from: accounts[0] });

        router.push(`/campaigns/${address}/requests`);
      });
    } catch (err) {
      setErrorMessage(err.message);
    }
    setLoading(false);
  };

  return (
    <>
      <Navbar></Navbar>
      <div className={styles.wrapper_form}>
        <div className={styles.title}>
          <h1 className={styles.heading}>New Request</h1>
        </div>
        {/* <span className={styles.circle} />
        <span className={styles.circle} />
        <span className={styles.circle} />
        <span className={styles.circle} />
        <span className={styles.circle} />
        <span className={styles.circle} />
        <span className={styles.circle} />
        <span className={styles.circle} />
        <span className={styles.circle} />
        <span className={styles.circle} /> */}
        <form onSubmit={onSubmit}>
          <div className={styles.card_glass}>
            {/* <div className={styles.card_glass_header}>
              <div className={styles.glass_header_text}>New Campaign</div>
            </div> */}
            <div className={styles.glass_container}>
              <div className={styles.form_glass_group}>
                <input
                  type="text"
                  className={styles.form_glass_control}
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  placeholder="Request Description"
                />
              </div>
              <div className={styles.form_glass_group}>
                <input
                  type="text"
                  className={styles.form_glass_control}
                  value={value}
                  onChange={(event) => setValue(event.target.value)}
                  placeholder="Request Amount"
                />
              </div>
              <div className={styles.form_glass_group}>
                <input
                  type="text"
                  className={styles.form_glass_control}
                  value={recipient}
                  onChange={(event) => setRecipient(event.target.value)}
                  placeholder="Recipient"
                />
              </div>
              {errorMessage && (
                <Message error header="Oops!" content={errorMessage} />
              )}
              <div className={styles.buttonContainer}>
                <button className={styles.btn}>Create Request</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

RequestNew.getInitialProps = ({ query }) => {
  const { address } = query;

  return { address };
};

export default RequestNew;

/* <Layout>
<Link href={`/campaigns/${address}/requests`}>
  <a>Back</a>
</Link>
<h3>Create a Request</h3>
<Form onSubmit={onSubmit} error={!!errorMessage}>
  <Form.Field>
    <label>Description</label>
    <Input
      value={description}
      onChange={(event) => setDescription(event.target.value)}
    />
  </Form.Field>

  <Form.Field>
    <label>Value in Ether</label>
    <Input
      value={value}
      onChange={(event) => setValue(event.target.value)}
    />
  </Form.Field>

  <Form.Field>
    <label>Recipient</label>
    <Input
      value={recipient}
      onChange={(event) => setRecipient(event.target.value)}
    />
  </Form.Field>

  <Message error header="Oops!" content={errorMessage} />
  <Button primary loading={loading}>
    Create!
  </Button>
</Form>
</Layout> */
