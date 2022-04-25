import React, { useState } from "react";
import { Form, Button, Input, Message } from "semantic-ui-react";
import Layout from "../../components/Layout";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";
import styles from "../../styles/CampaignForm.module.css";
import campaign from "../../ethereum/campaign";

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

        // validate the input

        if (campaignName.trim().length === 0) {
          setErrorMessage("Campaign Name cannot be empty");
          setLoading(false);
          return;
        }

        if (description.trim().length === 0) {
          setErrorMessage("Description cannot be empty");
          setLoading(false);
          return;
        }

        if (category.trim().length === 0) {
          setErrorMessage("Category cannot be empty");
          setLoading(false);
          return;
        }

        if (minimumContribution <= 0) {
          setErrorMessage("Minimum Contribution must be greater than 0");
          setLoading(false);
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
            console.log("Transaction hash: ", hash);
          });
      });

      // router.push("/");
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
          <h1 className={styles.heading}>New Campaign</h1>
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
                  value={campaignName}
                  onChange={(event) => setCampaignName(event.target.value)}
                  placeholder="Campaign Name"
                />
              </div>
              <div className={styles.form_glass_group}>
                <input
                  type="text"
                  className={styles.form_glass_control}
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  placeholder="Campaign Category"
                />
              </div>
              <div className={styles.form_glass_group}>
                <input
                  type="text"
                  className={styles.form_glass_control}
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  placeholder="Campaign Description"
                />
              </div>
              <div className={styles.form_glass_group}>
                <input
                  type="text"
                  className={styles.form_glass_control}
                  value={minimumContribution}
                  onChange={(event) =>
                    setMinimumContribution(event.target.value)
                  }
                  placeholder="Minimum Contribution (wei)"
                />
              </div>
              {errorMessage && (
                <Message error header="Oops!" content={errorMessage} />
              )}
              <div className={styles.buttonContainer}>
                <button className={styles.btn}>Register</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CampaignNew;

/* <a className="btn" href="https://www.instagram.com/arozqq/ target=" _blank"><svg height={20} viewBox="0 0 512 512" width={20} xmlns="http://www.w3.org/2000/svg" style={{paddingTop: '5px'}}>
              <g fill=" none" fillRule="evenodd">
                <path d="M482.56 261.36c0-16.73-1.5-32.83-4.29-48.27H256v91.29h127.01c-5.47 29.5-22.1 54.49-47.09 71.23v59.21h76.27c44.63-41.09 70.37-101.59 70.37-173.46z" fill="#4285f4" />
                <path d="M256 492c63.72 0 117.14-21.13 156.19-57.18l-76.27-59.21c-21.13 14.16-48.17 22.53-79.92 22.53-61.47 0-113.49-41.51-132.05-97.3H45.1v61.15c38.83 77.13 118.64 130.01 210.9 130.01z" fill="#34a853" />
                <path d="M123.95 300.84c-4.72-14.16-7.4-29.29-7.4-44.84s2.68-30.68 7.4-44.84V150.01H45.1C29.12 181.87 20 217.92 20 256c0 38.08 9.12 74.13 25.1 105.99l78.85-61.15z" fill="#fbbc05" />
                <path d="M256 113.86c34.65 0 65.76 11.91 90.22 35.29l67.69-67.69C373.03 43.39 319.61 20 256 20c-92.25 0-172.07 52.89-210.9 130.01l78.85 61.15c18.56-55.78 70.59-97.3 132.05-97.3z" fill="#ea4335" />
                <path d="M20 20h472v472H20V20z" />
              </g>
            </svg></a>

   {/* // <Layout>
    //   <h3>Create a Campaign</h3>

    //   <Form onSubmit={onSubmit} error={!!errorMessage}>
    //     <Form.Field>
    //       <label>Campaign Name</label>
    //       <Input
    //         label="Enter Campaign Name"
    //         labelPosition="left"
    //         value={campaignName}
    //         onChange={(event) => setCampaignName(event.target.value)}
    //       />
    //     </Form.Field>

    //     <Form.Field>
    //       <label>Campaign Category</label>
    //       <Input
    //         label="Enter Campaign Category"
    //         labelPosition="left"
    //         value={category}
    //         onChange={(event) => setCategory(event.target.value)}
    //       />
    //     </Form.Field>

    //     <Form.Field>
    //       <label>Campaign Description</label>
    //       <Input
    //         label="Enter Campaign Description"
    //         labelPosition="left"
    //         value={description}
    //         onChange={(event) => setDescription(event.target.value)}
    //       />
    //     </Form.Field>

    //     <Form.Field>
    //       <label>Minimum Contribution</label>
    //       <Input
    //         label="wei"
    //         labelPosition="right"
    //         value={minimumContribution}
    //         onChange={(event) => setMinimumContribution(event.target.value)}
    //       />
    //     </Form.Field>

    //     <Message error header="Oops!" content={errorMessage} />
    //     <Button loading={loading} primary>
    //       Create!
    //     </Button>
    //   </Form>
    // </Layout> */
