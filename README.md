# Ethereum Tax Dodgeball

Tag friends or strangers with tax liability with or without their knowledge.

Only U.S. taxpayers can be tagged, but anyone in the world can tag a U.S. taxpayer.

See the IRS guidance on this process [here](https://www.irs.gov/pub/irs-drop/rr-19-24.pdf).


## Usage

A [dapp](https://itsnickbarry.github.io/ethereum-tax-dodgeball) is available to interface with the smart contract.

Contracts have been deployed by a non U.S. person at the following addresses:

| network | address |
|-|-|
| Ethereum Mainnet | [0xe15dcc5Bce1AF8909e0250325221fb13b683660e](https://etherscan.io/address/0xe15dcc5bce1af8909e0250325221fb13b683660e) |
| Ropsten Testnet | [0xFc1248A6Aff0d4d5400061367D441323eBEE3cB5](https://ropsten.etherscan.io/address/0xfc1248a6aff0d4d5400061367d441323ebee3cb5) |

## Opt-out

A taxpayer with a healthy fear of the law may choose to opt out of participation.  Simply call the `optOut` function and include in the transaction a sum of ether greater than or equal to the opt-out fee.

## Development

Development and testing with the default network require that a local blockchain be run in a separate terminal window:

```bash
yarn run ganache
```

Alternatively, some buidler commands will work if an in-process network is specified instead:

```bash
yarn test --network buidlerevm
```

### Contracts

To compile and test contracts:

```bash
yarn test
```

To include a gas usage report:

```bash
REPORT_GAS=true yarn test
```

One of the tests tends to fail, perhaps due to a race condition.  It's good enough for government work.

### Interface

The static site is built with [Saber](https://saber.land/).

To deploy contracts and serve static site in development mode:

```bash
yarn run dev
```

To build and deploy static site to gh-pages:

```bash
yarn run deploy
```

### Contract Deployment

To deploy contracts to an arbitrary network, set the `URL` and `MNEMONIC` environment variables and run the `deploy` script with `generic` network configuration via buidler:

```bash
URL="http://localhost:8545" \
MNEMONIC="melody exact hedgehog pulse parade edge school eight invite doll luggage injury" \
npx buidler run scripts/deploy.js --network generic
```

___

```bash
⭐    ⭐    ⭐    ⭐    ⭐    ⭐
   ⭐    ⭐    ⭐    ⭐    ⭐   
⭐    ⭐    ⭐    ⭐    ⭐    ⭐
   ⭐    ⭐    ⭐    ⭐    ⭐   
⭐    ⭐    ⭐    ⭐    ⭐    ⭐
   ⭐    ⭐    ⭐    ⭐    ⭐   
⭐    ⭐    ⭐    ⭐    ⭐    ⭐
   ⭐    ⭐    ⭐    ⭐    ⭐   
⭐    ⭐    ⭐    ⭐    ⭐    ⭐
```
