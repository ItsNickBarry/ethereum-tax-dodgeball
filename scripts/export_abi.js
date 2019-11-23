const fs = require('fs');

async function main() {
  let abi = JSON.stringify(require('../artifacts/EthereumTaxDodgeball.json').abi);

  fs.writeFileSync(`${ __dirname }/../static/abi/EthereumTaxDodgeball.json`, abi, { flag: 'w' }, function (error, data) {
    console.log(error || 'contract abi written to static/abi/ directory');
  });
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
