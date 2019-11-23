# Ethereum Tax Dodgeball

Tag friends or strangers with tax liability with or without their knowledge.

Only U.S. taxpayers can be tagged, but anyone in the world can tag a U.S. taxpayer.

See the IRS guidance on this process [here](https://www.irs.gov/pub/irs-drop/rr-19-24.pdf).

A [dapp](https://itnsickbarry.github.io/ethereum-tax-dodgeball) is available to interface with the smart contract.

## Usage

The tagger must call the following functions in order:

| order | function | description |
|-|-|-|
| **1** | `deployToken` | A tagger deploys an ERC20 token contract, minting tokens for several taxpayers in the process.  These tokens have no market value. |
| **2** | `hardFork` | The token is hard forked and paused. |
| **3** | `addLiquidity` | The tagger makes an offer to buy the hard forked tokens by depositing a sum of ether, setting the fair market value. |
| **4** | `airdrop` | An airdrop is executed, placing newly forked tokens within the *dominion and control* of taxpayers who held tokens prior to the hard fork.  These tokens already have a market value dependent on the amount of ether deposited by the tagger. |
| **5** | `removeLiquidity` | The tagger rescinds the previously made offer. |

If the taxpayer is able to grant the main contract an appropriate allowance (ERC20 `increaseAllowance`) and call `takeLiquidity` between the calls to `addLiquidity` and `removeLiquidity`, the taxpayer will complete the trade and keep the staked ether.

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
