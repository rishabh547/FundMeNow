import web3 from "./web3";
import CampaignFactory from "../artifacts/contracts/Campaign.sol/CampaignFactory.json";

const factoryInstance = new web3.eth.Contract(
  CampaignFactory.abi,
  process.env.DEPLOYED_ADDRESS
);

export default factoryInstance;
