//Basic Libraries Setup

const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const provider = ganache.provider();
const web3 = new Web3(provider);

const compiledFactory = require("../ethereum/build/CampaignFactory.json");
const compiledCampaign = require("../ethereum/build/Campaign.json");

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  /***
   * NOTE: In the Udemy course code for this test file, the instructor sets
   * gas to a value of 1000000 (1 million). That does not work here. My tests
   * result in a 'VM Exception while processing transaction: out of gas'
   * being generated when using that value.
   *
   * However, when I set gas to 1500000 (1.5 million) the tests passed.
   */
  factory = await new web3.eth.Contract(compiledFactory.abi)
    .deploy({ data: "0x" + compiledFactory.evm.bytecode.object })
    .send({ from: accounts[0], gas: "1500000" });

  await factory.methods.createCampaign("100").send({
    from: accounts[0],
    gas: "1500000"
  });
// abi : Application binary interface
  [campaignAddress] = await factory.methods.getDeployedCampaigns().call();
  campaign = await new web3.eth.Contract(compiledCampaign.abi, campaignAddress);
});

describe("Campaigns", () => {
  it("deploys a factory and a campaign", () => {
    assert.ok(factory.options.address);
    assert.ok(campaign.options.address);
  });
  it("marks caller as the campaign manager", async () => {
    const manager = await campaign.methods.manager().call();
    assert.strictEqual(manager, accounts[0]);
  });

  it("allows people to contribute money and marks them as approvers", async () => {
    await campaign.methods.contribute().send({
      value: "200",
      from: accounts[1]
    });

    const isContributor = await campaign.methods.approvers(accounts[1]).call();
    assert(isContributor);
  });
  it("requires a minimum contribution", async () => {
    try {
      await campaign.methods.contribute().send({
        value: "5",
        from: accounts[1]
      });
      assert(false);
    } catch (error) {
      assert(error);
    }
  });

  //Allow manager to create a Spending Request(Test Case)
  it("allows a manager to make a payment request", async () => {
    await campaign.methods.createRequest("Buy batteries", "100", accounts[1]).send({
      from: accounts[0],
      gas: "1500000"
    });

    const request = await campaign.methods.requests(0).call();
    assert("Buy batteries", request.description);
  });
});

// Processing Requests
it("processing requests",async () => {
    await campaign.methods.contribute().send({
        //Establishing account[0] as a contributor first
        from: accounts[0],
        value: web3.utils.toWei('10','ether')
    })

});

//Till above we have finished up with 6 test cases


//  // Create a spend request for 5 ether to go to accounts[2].i.e Say Vendor here
//  await campaign.methods
//  .createRequest("A cool spend request", web3.utils.toWei("5", "ether"), accounts[2])
//  .send({
//    from: accounts[0],
//    gas: "1500000"
//  });

//  // Approve the spend request. (accounts[1] is the vendor here)
//  await campaign.methods.approveRequest(0).send({
//   from: accounts[1],
//   gas: "1500000"
// });

// // Finalize the request.
// await campaign.methods.finalizeRequest(0).send({
//   from: accounts[0],
//   gas: "1500000"
// });

// //Check balance of accounts[2] to see if vendor got the money
// let balance = await web3.eth.getBalance(accounts[2]);
// balance = web3.utils.fromWei(balance, "ether");
// balance = parseFloat(balance);

// //Check balance for debugging
// assert(balance>105);

//Outdated code
// const assert = require('assert');
// const ganache = require('ganache-cli');
// const Web3 = require('web3');
// const web3 = new Web3(ganache.provider());

// const compiledFactory = require('../ethereum/build/CampaignFactory.json');
// const compiledCampaign = require('../ethereum/build/Campaign.json');

// let accounts;
// let factory;
// let campaignAddress;
// let campaign;

// beforeEach(async() => {
//     accounts = await web3.eth.getAccounts();
//     //Use Factory to create instance of a Campaign
//     factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
//     .deploy({data: compiledFactory.bytecode})
//     .send({from: accounts[0],gas:'1000000'});

//     await factory.methods.createCampaign('100').send({
//         from : accounts[0],
//         gas:'1000000'
//     });
//     //campaignAddress = address[0] //First Campaign address 
//     [campaignAddress]= await factory.methods.getDeployedCampaigns().call();

//     //NOW Create a JS Representation  of our local blockchain and use already deployed campaign address
//     campaign = await factory.methods.Contract(
//         JSON.parse(compiledCampaign.interface),
//         campaignAddress
//     );
// });

// //Test to check deployment of campaign and Address
// describe('Campaigns',() => {
//     it('deploys a factory and a campaign',() => {
//         assert.ok(factory.options.address);
//         assert.ok(campaign.options.address);

//     });
// });
