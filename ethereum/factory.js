import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

require('dotenv').config();

const factoryInstance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    process.env.DEPLOYED_ADDRESS
);

export default factoryInstance;
