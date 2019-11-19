# Ethereum Tax Dodgeball

Tag friends or strangers with tax liability with or without their knowledge.

Only U.S. taxpayers may be tagged, but anyone in the world can tag a U.S. taxpayer.

See the IRS guidance on this process [here](https://www.irs.gov/pub/irs-drop/rr-19-24.pdf).

## Usage

The tagger must call the following functions in order:
1. `deployToken`
1. `hardFork`
1. `addLiquidity`
1. `airdrop`
1. `removeLiquidity`

If the taxpayer is able to call `takeLiquidity` after `addLiquidity` is called and `removeLiquidity` is called, the taxpayer will be granted the tagger's ether.  The tagger may then be able to report a capital loss for tax purposes.

## Development

To compile and test:

```bash
npm test
```

One of the tests tends to fail, perhaps due to a race condition.  It's good enough for government work.
