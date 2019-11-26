const fs = require('fs');

async function main() {
  const EthereumTaxDodgeball = artifacts.require('EthereumTaxDodgeball');

  const instance = await EthereumTaxDodgeball.at(process.env.ADDRESS);

  let optOutFee = process.env.NEW_OPT_OUT_FEE;

  await instance.setOptOutFee(optOutFee);

  console.log(`set new opt-out fee ${ optOutFee }`);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
