const fs = require('fs-extra');
const path = require('path');

const DIRECTORY = '../static/abi/';

async function main() {
  fs.emptyDirSync(path.resolve(__dirname, DIRECTORY));
  fs.openSync(path.resolve(__dirname, `${ DIRECTORY }/.keep`), 'w');

  let contracts = [
    'EthereumTaxDodgeball',
    'ERC20HardFork',
  ];

  contracts.forEach(function (contract) {
    let abi = JSON.stringify(require(`../artifacts/${ contract }.json`).abi);

    fs.writeFileSync(`${ __dirname }/${ DIRECTORY }/${ contract }.json`, abi, { flag: 'w' }, function (error, data) {
      console.log(error || `${ contract } contract abi written to static/abi/ directory`);
    });
  });
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
