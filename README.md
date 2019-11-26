# Ethereum Tax Dodgeball

Tag friends or strangers with tax liability with or without their knowledge.

Only U.S. taxpayers can be tagged, but anyone in the world can tag a U.S. taxpayer.

See the IRS guidance on this process [here](https://www.irs.gov/pub/irs-drop/rr-19-24.pdf).


## Usage

A [dapp](https://itsnickbarry.github.io/ethereum-tax-dodgeball) is available to interface with the smart contract.

## Opt-out

A taxpayer with a healthy fear of the law may choose to opt out of participation.  Simply call the `optOut` function and include in the transaction a sum of ether greater than or equal to the opt-out fee (`getOptOutFee`).

## Development

Development and testing require that a local blockchain be run in a separate terminal window:

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
