const fs = require('fs');

async function main() {
  const EthereumTaxDodgeball = artifacts.require('EthereumTaxDodgeball');

  const instance = await EthereumTaxDodgeball.new(`1${ '0'.repeat(18) }`);
  console.log(`EthereumTaxDodgeball deployed to ${ instance.address }`);

  let json = JSON.stringify({ address: instance.address });

  fs.writeFileSync(`${ __dirname }/../static/dev_address.json`, json, { flag: 'w' }, function (error, data) {
    console.log(error || 'contract address written to static/ directory');
  });
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
