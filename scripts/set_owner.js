const fs = require('fs');

async function main() {
  const EthereumTaxDodgeball = artifacts.require('EthereumTaxDodgeball');

  const instance = await EthereumTaxDodgeball.at(process.env.ADDRESS);

  let owner = process.env.NEW_OWNER;

  await instance.setOwner(owner);

  console.log(`set new owner ${ owner }`);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
