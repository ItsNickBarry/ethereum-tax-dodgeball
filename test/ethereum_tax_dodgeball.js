const truffleAssert = require('truffle-assertions');

const EthereumTaxDodgeball = artifacts.require('EthereumTaxDodgeball');
const ERC20Source = artifacts.require('ERC20Source');
const ERC20HardFork = artifacts.require('ERC20HardFork');

const ZERO_ADDRESS = '0'.repeat(40);
const ONE_ETHER = `1${ '0'.repeat(18) }`;

const SUPPLY = ONE_ETHER;
const LIQUIDITY_VOLUME = ONE_ETHER;

contract('EthereumTaxDodgeball', function (accounts) {
  const DEPLOYER = accounts[0];
  const TAGGER = accounts[1];
  const TAXPAYERS = accounts.slice(2, 5);
  const TAXPAYER = TAXPAYERS[0];

  let instance;

  beforeEach(async function () {
    instance = await EthereumTaxDodgeball.new({ from: DEPLOYER });
  });

  describe('#deployToken', function () {
    it('mints tokens for taxpayers', async function () {

      let tx = await instance.deployToken(SUPPLY, TAXPAYERS, { from: TAGGER });
      let sourceToken = await ERC20Source.at(tx.logs[0].args.token);

      for (let taxpayer of TAXPAYERS) {
        assert.equal(await sourceToken.balanceOf(taxpayer), SUPPLY);
      }
    });

    it('emits a Deployment event', async function () {
      let tx = await instance.deployToken(SUPPLY, TAXPAYERS, { from: TAGGER });

      await truffleAssert.eventEmitted(tx, 'Deployment', function (e) {
        return !!e.token;
      })
    });

    describe('reverts if', function () {
      it('taxpayer has opted out', async function () {
        await instance.optOut({ from: TAXPAYER, value: ONE_ETHER });
        await truffleAssert.reverts(
          instance.deployToken(SUPPLY, TAXPAYERS, { from: TAGGER }),
          'EthereumTaxDodgeball: taxpayer has opted out'
        );
      });
    });
  });

  describe('#hardFork', function () {
    let sourceToken;

    beforeEach(async function () {
      let tx = await instance.deployToken(SUPPLY, TAXPAYERS, { from: TAGGER });
      sourceToken = await ERC20Source.at(tx.logs[0].args.token);
    });

    it('deploys new ERC20 token', async function () {
      let tx = await instance.hardFork('IRSCoin', 'IRS', sourceToken.address, { from: TAGGER });
      let hardForkToken = await ERC20HardFork.at(tx.logs[0].args.token);
      assert(await hardForkToken.totalSupply());
    });

    it('emits HardFork event', async function () {
      let tx = await instance.hardFork('IRSCoin', 'IRS', sourceToken.address, { from: TAGGER });

      await truffleAssert.eventEmitted(tx, 'HardFork', function (e) {
        return !!e.token;
      });
    });

    it('pauses source token', async function () {
      await truffleAssert.passes(sourceToken.transfer(TAGGER, SUPPLY, { from: TAXPAYER }));

      await instance.hardFork('IRSCoin', 'IRS', sourceToken.address, { from: TAGGER });

      await truffleAssert.reverts(
        sourceToken.transfer(TAXPAYER, SUPPLY, { from: TAGGER }),
        'Pausable: paused'
      );
    });
  });

  describe('#addLiquidity', function () {
    let hardForkToken;

    beforeEach(async function () {
      let deployTx = await instance.deployToken(SUPPLY, TAXPAYERS, { from: TAGGER });
      let sourceToken = await ERC20Source.at(deployTx.logs[0].args.token);
      let tx = await instance.hardFork('IRSCoin', 'IRS', sourceToken.address, { from: TAGGER });
      hardForkToken = await ERC20HardFork.at(tx.logs[0].args.token);
    });

    it('emits LiquidityAdded event', async function () {
      let tx = await instance.addLiquidity(hardForkToken.address, LIQUIDITY_VOLUME, { from: TAGGER, value: ONE_ETHER });

      await truffleAssert.eventEmitted(tx, 'LiquidityAdded', function (e) {
        return !!e.token && !!e.costBasis;
      });
    });
  });

  describe('#airdrop', function () {
    let hardForkToken;

    beforeEach(async function () {
      let deployTx = await instance.deployToken(SUPPLY, TAXPAYERS, { from: TAGGER });
      let sourceToken = await ERC20Source.at(deployTx.logs[0].args.token);
      let tx = await instance.hardFork('IRSCoin', 'IRS', sourceToken.address, { from: TAGGER });
      hardForkToken = await ERC20HardFork.at(tx.logs[0].args.token);
      await instance.addLiquidity(hardForkToken.address, LIQUIDITY_VOLUME, { from: TAGGER, value: ONE_ETHER });
    });

    it('affords taxpayer dominion and control of hard-forked tokens', async function () {
      await instance.airdrop(hardForkToken.address, { from: TAGGER });
      await truffleAssert.passes(hardForkToken.transfer(DEPLOYER, 1, { from: TAXPAYER }));
    });

    it('emits Airdrop event', async function () {
      let tx = await instance.airdrop(hardForkToken.address, { from: TAGGER });

      await truffleAssert.eventEmitted(tx, 'Airdrop', function (e) {
        return e.token === hardForkToken.address;
      });
    });

    describe('reverts if', function () {
      it('liquidity is not available', async function () {
        await instance.removeLiquidity(hardForkToken.address, { from: TAGGER });

        await truffleAssert.reverts(
          instance.airdrop(hardForkToken.address, { from: TAGGER }),
          'EthereumTaxDodgeball: hard fork token must have liquidity'
        );
      });

      it('airdrop has already been executed', async function () {
        await instance.airdrop(hardForkToken.address, { from: TAGGER });
        truffleAssert.reverts(
          instance.airdrop(hardForkToken.address, { from: TAGGER }),
          'ERC20HardFork: airdrop may only be executed once'
        );
      });
    });
  });

  describe('#removeLiquidity', function () {
    let hardForkToken;

    beforeEach(async function () {
      let deployTx = await instance.deployToken(SUPPLY, TAXPAYERS, { from: TAGGER });
      let sourceToken = await ERC20Source.at(deployTx.logs[0].args.token);
      let tx = await instance.hardFork('IRSCoin', 'IRS', sourceToken.address, { from: TAGGER });
      hardForkToken = await ERC20HardFork.at(tx.logs[0].args.token);
      await instance.addLiquidity(hardForkToken.address, LIQUIDITY_VOLUME, { from: TAGGER, value: ONE_ETHER });
      await instance.airdrop(hardForkToken.address, { from: TAGGER });
    });

    it('withdraws available ether', async function () {
      let initialBalance = parseInt(await web3.eth.getBalance(TAGGER));

      let tx = await instance.removeLiquidity(hardForkToken.address, { from: TAGGER });
      let gasCost = tx.receipt.gasUsed * await web3.eth.getGasPrice();

      let finalBalance = parseInt(await web3.eth.getBalance(TAGGER));
      let deltaBalance = parseInt(ONE_ETHER) - gasCost;

      assert.equal(finalBalance, initialBalance + deltaBalance);
    });

    describe('reverts if', function () {
      it('liquidity has been taken', async function () {
        await hardForkToken.increaseAllowance(instance.address, await hardForkToken.balanceOf(TAXPAYER), { from: TAXPAYER });
        await instance.takeLiquidity(hardForkToken.address, { from: TAXPAYER });

        await truffleAssert.reverts(
          instance.removeLiquidity(hardForkToken.address, { from: TAGGER })
        );
      });
    });
  });

  describe('#takeLiquidity', function () {
    let hardForkToken;

    beforeEach(async function () {
      let deployTx = await instance.deployToken(SUPPLY, TAXPAYERS, { from: TAGGER });
      let sourceToken = await ERC20Source.at(deployTx.logs[0].args.token);
      let tx = await instance.hardFork('IRSCoin', 'IRS', sourceToken.address, { from: TAGGER });
      hardForkToken = await ERC20HardFork.at(tx.logs[0].args.token);
      await instance.addLiquidity(hardForkToken.address, LIQUIDITY_VOLUME, { from: TAGGER, value: ONE_ETHER });
      await instance.airdrop(hardForkToken.address, { from: TAGGER });
      await hardForkToken.increaseAllowance(instance.address, await hardForkToken.balanceOf(TAXPAYER), { from: TAXPAYER });
    });

    it('transfers ether to taxpayer', async function () {
      let initialBalance = parseInt(await web3.eth.getBalance(TAXPAYER));

      let tx = await instance.takeLiquidity(hardForkToken.address, { from: TAXPAYER });
      let gasCost = tx.receipt.gasUsed * await web3.eth.getGasPrice();

      let finalBalance = parseInt(await web3.eth.getBalance(TAXPAYER));
      let deltaBalance = parseInt(ONE_ETHER) - gasCost;

      assert.equal(finalBalance, initialBalance + deltaBalance);
    });

    it('transfers tokens to tagger', async function () {
      let initialBalance = await hardForkToken.balanceOf(TAGGER);
      await instance.takeLiquidity(hardForkToken.address, { from: TAXPAYER });
      let finalBalance = await hardForkToken.balanceOf(TAGGER);
      assert.equal(finalBalance.sub(initialBalance).toString(), SUPPLY);
    });

    describe('reverts if', function () {
      it('offer is already taken', async function () {
        await instance.takeLiquidity(hardForkToken.address, { from: TAXPAYER });
      });

      it('liquidity has been removed by tagger', async function () {
        await instance.removeLiquidity(hardForkToken.address, { from: TAGGER });

        await truffleAssert.reverts(
          instance.takeLiquidity(hardForkToken.address, { from: TAXPAYER }),
          'EthereumTaxDodgeball: offer must exist'
        );
      });

      it('taxpayer has not granted sufficient token allowance to contract', async function () {
        await hardForkToken.decreaseAllowance(instance.address, await hardForkToken.allowance(TAXPAYER, instance.address), { from: TAXPAYER });

        await truffleAssert.reverts(
          instance.takeLiquidity(hardForkToken.address, { from: TAXPAYER }),
          'EthereumTaxDodgeball: taxpayer must grant sufficient token allowance to contract'
        );
      });
    });
  });

  describe('#optOut', function () {
    it('transfers opt-out fee to contract owner', async function () {
        let initialBalance = parseInt(await web3.eth.getBalance(DEPLOYER));

        await instance.optOut({ from: TAXPAYER, value: ONE_ETHER });

        let finalBalance = parseInt(await web3.eth.getBalance(DEPLOYER));
        let deltaBalance = parseInt(ONE_ETHER);

        assert.equal(finalBalance, initialBalance + deltaBalance);
    });

    describe('reverts if', function () {
      it('taxpayer fails to pay opt-out fee', async function () {
        await truffleAssert.reverts(
          instance.optOut({ from: TAXPAYER, value: 1 }),
          'EthereumTaxDodgeball: taxpayer must pay opt-out fee'
        );
      });

      it('taxpayer has already opted out', async function () {
        await instance.optOut({ from: TAXPAYER, value: ONE_ETHER });
        await truffleAssert.reverts(
          instance.optOut({ from: TAXPAYER, value: ONE_ETHER }),
          'EthereumTaxDodgeball: taxpayer has already opted out'
        );
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

  describe('#getOptOutFee', function () {
    it('gets opt-out fee', async function () {
      assert.equal(await instance.getOptOutFee(), ONE_ETHER);
    });
  });

  describe('#setOptOutFee', function () {
    it('sets opt-out fee', async function () {
      await instance.setOptOutFee(1, { from: DEPLOYER });
      assert.equal(await instance.getOptOutFee(), 1);
      await truffleAssert.passes(instance.optOut({ from: TAXPAYER, value: 1 }));
    });

    describe('reverts if', function () {
      it('sender is not contract owner', async function () {
        await truffleAssert.reverts(
          instance.setOptOutFee(1, { from: TAGGER }),
          'EthereumTaxDodgeball: sender must be owner'
        );
      });
    });
  });
});
