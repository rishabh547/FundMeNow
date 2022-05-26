# FundMeNow
### An Ethereum Blockchain based Crowdfunding Platform.

## Demo Video

## To Run the application locally

1. git clone https://github.com/rishabh547/FundMeNow
2. cd into root project folder **FundMeNow**
3. Add a `.env` file in the same folder with the following data:

```python
ACCOUNT_MNEMONIC = " "
RINKEBY_ENDPOINT = <rinkeby_endpoint url>
DEPLOYED_ADDRESS = <deployment_address>
MORALIS_URL = <moralis_url>
MORALIS_SPEEDY_NODE_KEY = <moralis_node_key>
```
4. Install all dependencies using command : npm i 
5. Then do npm run dev
6. You can now see the project runnning at http://127.0.0.1:8000


## Prerequisites to create Campaign and Contribute
1. Install **Metamask** as Google Chrome Extension and Create an account.

## Problem Statement (Issues with Current System and how blockchain solves them)

* **Traditional crowdsourcing** is based on a central system where requesters post tasks on a central server or platform, however this centralized model currently faces various challenges such as prohibitive cost,single point of failure and vulnerability to malicious attacks. 
* **Security** : As the funds become larger, they need to be heavily secure, although stringent measures such as symmetric encryption are in place to make e-payment safe and secure,it is still vulnerable to hacking. Blockchain — which has never been compromised yet — can provide that level of security.
* **Transparency to end users**  : We have seen, and continue to see a lot of crowdfunding scams happening around. There is no way to see where the funds are being used. We wanted to make the entire flow of funds transparent at every stage, so that there is no possibility of the money being misused.
* **Global contribution** : With some of the platforms being country specific, it becomes hard for people from other countries to contribute to various campaigns. Using blockchain anyone in the world can contribute to the campaign. Transactions are quick and convenient.


## Our Solution
- A **Crowdfunding dApp**(decentralized application) which allows Young Entrepreneurs/Businesses to raise funding in order to Build a Prototype of their Work
Control over Cash Outflow with the help of Smart Contracts
- An **Ethereum based crowdfunding** application that solves the trust problem between a manager and contributors. 
- The smart contract protects the integrity of contributors and stops the manager from directly spending the funds.

## Tech Stack

**Backend**:
- Javascript (ES6+)
- Node JS
- Solidity
- Hardhat
- Remix IDE

**Frontend**:
- Web3 JS / Ether JS
- Next JS
- Metamask
- React JS

## Testing Smart Contract Functionalities with Mocha
- **Mocha** is a feature-rich JavaScript test framework running on Node.js and in the browser, making asynchronous testing simple and fun. 
- **Mocha** tests run serially, allowing for flexible and accurate reporting, while mapping uncaught exceptions to the correct test cases.

### Contributors:
- [Bhavin Patel]()
- [Burhanuddin Rangwala]()
- [Rishabh Kothari]()
