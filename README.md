# Ethereum Tax Dodgeball

Tag friends or strangers with tax liability with or without their knowledge.

Only U.S. taxpayers can be tagged, but anyone in the world can tag a U.S. taxpayer.

See the IRS guidance on this process [here](https://www.irs.gov/pub/irs-drop/rr-19-24.pdf).

## Usage

The tagger must call the following functions in order:

| order | function | description |
|-|-|-|
| 1 | `deployToken` | A tagger deploys an ERC20 token contract, minting tokens for several taxpayers in the process.  These tokens have no market value. |
| 2 | `hardFork` | The token is hard forked and paused. |
| 3 | `addLiquidity` | The tagger makes an offer to buy the hard forked tokens by depositing a sum of ether, setting the fair market value. |
| 4 | `airdrop` | An airdrop is manually executed by the tagger for a specified list of taxpayers (should be the same taxpayers granted tokens in the first step).  These tokens already have a market value dependent on the amount of ether deposited by the tagger. |
| 5 | `removeLiquidity` | The tagger rescinds the previously made offer. |

If the taxpayer is able to call `takeLiquidity` after `addLiquidity` is called and `removeLiquidity` is called, the taxpayer will be granted the tagger's ether.  For this function to work, the taxpayer must first call ERC20 `increaseAllowance` to enable the contract to manage the taxpayer's tokens.

## Opt-out

A taxpayer with a healthy fear of the law may choose to opt out of participation.  Simply call the `optOut` function and include in the transaction a sum of ether greater than or equal to the opt-out fee (`getOptOutFee`).

## Development

To compile and test:

```bash
npm test
```

One of the tests tends to fail, perhaps due to a race condition.  It's good enough for government work.
