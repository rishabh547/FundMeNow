// Refer Screenshot on 26 th January for ethereum folder
const path = require("path");
const solc = require("solc");
const fs = require("fs-extra");

const buildPath = path.resolve(__dirname, "build");
const contractFileName = "Campaign.sol";

// Delete the current build folder.
fs.removeSync(buildPath);

const campaignPath = path.resolve(__dirname, "contracts", contractFileName);
const source = fs.readFileSync(campaignPath, "utf8");

/***
 * The recommended way to interface with the Solidity compiler, especially for more
 * complex and automated setups is the so-called JSON-input-output interface.
 *
 * See https://docs.soliditylang.org/en/v0.8.6/using-the-compiler.html#compiler-input-and-output-json-description
 * for more details.
 */
const input = {
  language: "Solidity",
  sources: {},
  settings: {
    metadata: {
      useLiteralContent: true,
    },
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};

input.sources[contractFileName] = {
  content: source,
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));
const contracts = output.contracts[contractFileName];

// Create the build folder.
fs.ensureDirSync(buildPath);

// Extract and write the JSON representations of the contracts to the build folder.
for (let contract in contracts) {
  if (contracts.hasOwnProperty(contract)) {
    fs.outputJsonSync(path.resolve(buildPath, `${contract}.json`), contracts[contract]);
  }
}


//Below is Outdated Code
// const path = require('path');
// const solc = require('solc');
// const fs = require('fs-extra');

// //Now get build folder directory
// const buildPath = path.resolve(__dirname,'build');
// //Deleting the build folder
// fs.removeSync(buildPath);

// const campaignPath = path.resolve(__dirname,'contracts','Campaign.sol');

// //Read Source Code from above File 
// const source = fs.readFileSync(campaignPath,'utf-8');
// const output = solc.compile(source,1).contracts;

// //Now after compile write output to build dir
// fs.ensureDirSync(buildPath);

// //Now loop through output to get contract and write to a diff file:Campaign , campaign factory
// for(let contract in output ){
//     fs.outputJSONSync(
//         path.resolve(buildPath,contract + '.json'),
//         output[contract]
//         );
// };
