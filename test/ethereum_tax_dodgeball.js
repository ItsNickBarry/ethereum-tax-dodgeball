const truffleAssert = require('truffle-assertions');

const ForkDelta = artifacts.require('ForkDelta');
const EthereumTaxDodgeball = artifacts.require('EthereumTaxDodgeball');
const ERC20HardFork = artifacts.require('ERC20HardFork');

const ZERO_ADDRESS = '0'.repeat(40);
const ONE_ETHER = `1${ '0'.repeat(18) }`;

contract('EthereumTaxDodgeball', function (accounts) {
  const DEPLOYER = accounts[0];
  const TAGGER = accounts[1];
  const TAXPAYER = accounts[2];

  let instance;
  let forkDeltaInstance;

  beforeEach(async function () {
    forkDeltaInstance = await ForkDelta.new(DEPLOYER, DEPLOYER, 0, 0, ZERO_ADDRESS);
    instance = await EthereumTaxDodgeball.new(forkDeltaInstance.address, ONE_ETHER, { from: DEPLOYER });
  });

  describe('#hardFork', function () {
    it('deploys new ERC20 token', async function () {
      let tx = await instance.hardFork('IRSCoin', 'IRS', { from: TAGGER });
      let hardForkToken = await ERC20HardFork.at(tx.logs[0].args.token);
      assert(await hardForkToken.totalSupply());
    });

    it('emits HardFork event', async function () {
      let tx = await instance.hardFork('IRSCoin', 'IRS', { from: TAGGER });

      await truffleAssert.eventEmitted(tx, 'HardFork', function (e) {
        return !!e.token;
      });
    });
  });

  describe('#airdrop', function () {
    let hardForkToken;

    beforeEach(async function () {
      let tx = await instance.hardFork('IRSCoin', 'IRS', { from: TAGGER });
      hardForkToken = await ERC20HardFork.at(tx.logs[0].args.token);
    });

    it('affords taxpayer dominion and control of hard-forked tokens', async function () {
      await instance.airdrop(hardForkToken.address, TAXPAYER, { from: TAGGER });
      await truffleAssert.passes(hardForkToken.transfer(DEPLOYER, 1, { from: TAXPAYER }));
    });

    it('emits Airdrop event', async function () {
      let tx = await instance.airdrop(hardForkToken.address, TAXPAYER, { from: TAGGER });

      await truffleAssert.eventEmitted(tx, 'Airdrop', function (e) {
        return e.taxpayer === TAXPAYER;
      });
    });

    describe('reverts if', function () {
      it('taxpayer has opted out', async function () {
        await instance.optOut({ from: TAXPAYER, value: ONE_ETHER });
        await truffleAssert.reverts(instance.airdrop(hardForkToken.address, TAXPAYER, { from: TAGGER }));
      });
    });
  });

  describe('#addLiquidity', function () {
    let hardForkToken;

    beforeEach(async function () {
      let tx = await instance.hardFork('IRSCoin', 'IRS', { from: TAGGER });
      hardForkToken = await ERC20HardFork.at(tx.logs[0].args.token);
    });

    it('emits LiquidityAdded event', async function () {
      let tx = await instance.addLiquidity(hardForkToken.address, { from: TAGGER, value: ONE_ETHER });

      await truffleAssert.eventEmitted(tx, 'LiquidityAdded', function (e) {
        return !!e.token && !!e.costBasis;
      });
    });
  });

  describe('#removeLiquidity', function () {
    let hardForkToken;
    let liquidityValue = ONE_ETHER;

    beforeEach(async function () {
      let tx = await instance.hardFork('IRSCoin', 'IRS', { from: TAGGER });
      hardForkToken = await ERC20HardFork.at(tx.logs[0].args.token);
      await instance.addLiquidity(hardForkToken.address, { from: TAGGER, value: liquidityValue });
    });

    describe('()', function () {
      it('withdraws available ether', async function () {
        await web3.currentProvider.send({
          jsonrpc: "2.0",
          method: "evm_increaseTime",
          params: [2 * 60 * 10000],
        }, () => {});

        let initialBalance = parseInt(await web3.eth.getBalance(TAGGER));

        let tx = await instance.removeLiquidity({ from: TAGGER });
        let gasCost = tx.receipt.gasUsed * await web3.eth.getGasPrice();

        let finalBalance = parseInt(await web3.eth.getBalance(TAGGER));
        let deltaBalance = parseInt(liquidityValue) - gasCost;

        assert(finalBalance === initialBalance + deltaBalance, `expected ${ initialBalance + deltaBalance }, got ${ finalBalance }`);
      });
    });

    describe('(address)', function () {
      it('withdraws available token', async function () {
        // let tx = await instance.addLiquidity(hardForkToken.address, { from: TAGGER, value: ONE_ETHER });
        //
        // await instance.airdrop(hardForkToken.address, TAXPAYER, { from: TAGGER });
        //
        // await hardForkToken.approve(forkDeltaInstance.address, 1, { from: TAXPAYER });
        // await forkDeltaInstance.depositToken(hardForkToken.address, 1, { from: TAXPAYER });
        //
        // await forkDeltaInstance.trade(
        //   ZERO_ADDRESS, ONE_ETHER, hardForkToken.address, 1, new Date().getTime() + 10000, 1);
        // console.log('BALALALALAL');
        // console.log(await forkDeltaInstance.balanceOf(ZERO_ADDRESS, TAXPAYER));
        // console.log(await forkDeltaInstance.balanceOf(hardForkToken.address, TAXPAYER));
        // await truffleAssert.passes(forkDeltaInstance.withdraw(ONE_ETHER, { from: TAXPAYER }));
      });
    });
  });

  describe('#optOut', function () {
    it('transfers opt-out fee to contract owner', async function () {
        // TODO:
    });

    describe('reverts if', function () {
      it('taxpayer fails to pay opt-out fee', async function () {
        await truffleAssert.reverts(instance.optOut({ value: 1 }));
      });

      it('taxpayer has already opted out', async function () {
        await instance.optOut({ from: TAXPAYER, value: ONE_ETHER });
        await truffleAssert.reverts(instance.optOut({ from: TAXPAYER, value: ONE_ETHER }));
      });
    });
  });

  describe('#isOptedOut', function () {
    beforeEach(async function () {
      await instance.optOut({ from: TAXPAYER, value: ONE_ETHER });
    });

    it('returns whether taxpayer has opted out of receiving airdrops', async function () {
      assert(await instance.isOptedOut(TAXPAYER));
      assert(!await instance.isOptedOut(TAGGER));
    });
  });

  describe('#setOptOutFee', function () {
    it('sets opt-out fee', async function () {
      await instance.setOptOutFee(1, { from: DEPLOYER });
      await truffleAssert.passes(instance.optOut({ from: TAXPAYER, value: 1 }));
    });

    describe('reverts if', function () {
      it('sender is not contract owner', async function () {
        await truffleAssert.reverts(instance.setOptOutFee(1, { from: TAGGER }));
      });
    });
  });
});
