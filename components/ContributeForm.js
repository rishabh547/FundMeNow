import React, { useState } from 'react';
import { Form, Input, Message, Button } from 'semantic-ui-react';
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';
import { useRouter } from 'next/router';

const ContributeForm = (props) => {
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState('');

  const onSubmit = async event => {
    event.preventDefault();

    const campaign = Campaign(props.address);

    setLoading(true);
    setErrorMessage('');

    try {

      web3.eth.requestAccounts()
        .then(async res => {
          const accounts = res;

          await campaign.methods.contribute().send({
            from: accounts[0],
            value: web3.utils.toWei(value, 'ether')
          })
            .on('transactionHash', function (hash) {
              console.log("Transaction hash: ", hash);
            })
        })

      router.replace('/campaigns/[address]', `/campaigns/${props.address}`);
    } catch (err) {
      setErrorMessage(err.message);
    }
    setLoading(false);
    setValue('');
  };

  return (
    <Form onSubmit={onSubmit} error={!!errorMessage}>
      <Form.Field>
        <label>Amount to Contribute</label>
        <Input
          value={value}
          onChange={event =>
            setValue(event.target.value)
          }
          label="ether"
          labelPosition="right"
        />
      </Form.Field>

      <Message error header="Oops!" content={errorMessage} />
      <Button primary loading={loading}>
        Contribute!
      </Button>
    </Form>
  );
}

export default ContributeForm;
