async function main() {
  const EthereumTaxDodgeball = artifacts.require('EthereumTaxDodgeball');

  const instance = await EthereumTaxDodgeball.new(`1${ '0'.repeat(18) }`);
  console.log(`EthereumTaxDodgeball deployed to ${ instance.address }`);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
