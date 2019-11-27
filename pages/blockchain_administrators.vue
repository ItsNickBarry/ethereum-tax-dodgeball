<template lang="html">
  <div class="columns is-gapless blockchain-administrators">
    <div class="column">
      <div class="container">
        <div class="content">
          <h1 class="title is-1 has-text-dark">
            Hard Fork &amp; Airdrop
          </h1>

          <p>The Internal Revenue Service of the United States government has released guidance for U.S. taxpayers who gain <i>dominion &amp; control</i> of virtual currencies (tokens) via an <i>airdrop</i> following a <i>hard fork</i> of a preexisting token.  That guidance has been published online and may be reviewed <a href="https://www.irs.gov/pub/irs-drop/rr-19-24.pdf">here</a>.</p>

          <p>The use of the EthereumTaxDodgeball system may have tax implication for U.S. taxpayers.</p>

          <p>The following actions are intended to be run in order.</p>

          <article v-show="disabled" class="message is-warning">
            <div class="message-header">
              Warning: Contract Not Found
            </div>
            <div class="message-body">
              <p>The EthereumTaxDodgeball contract is not known to have been deployed on the current network.</p>

              <p>Please connect to the Ethereum Main Network or the Ropsten Test Network.</p>
            </div>
          </article>
        </div>

        <div class="content">
          <h2 class="subtitle is-3">
            Step One: Deploy and Distribute an ERC20 Token
          </h2>

          <p>A prospective blockchain administrator may use the EthereumTaxDodgeball system for the purpose of deploying an ERC20 token contract.  This contract should be initialized with a list of two or more beneficiary U.S. taxpayer addresses.</p>

          <article v-show="errors.deployToken" class="message is-danger">
            <div class="message-header">
              Ethereum Transaction Error
              <button class="delete" aria-label="delete" @click="setError('deployToken')" />
            </div>
            <div class="message-body">
              {{ errors.deployToken }}
            </div>
          </article>

          <form action="javascript:void(0);" @submit="deployToken">
            <fieldset :disabled="disabled">
              <div class="field">
                <label class="label">New Token Name</label>
                <div class="control">
                  <input v-model="sourceName" type="text" required>
                </div>
              </div>

              <div class="field">
                <label class="label">New Token Symbol</label>
                <div class="control">
                  <input v-model="sourceSymbol" type="text" required>
                </div>
              </div>

              <div class="field">
                <label class="label">Quantity of Tokens to Mint for Each Beneficiary</label>
                <div class="control">
                  <input v-model="supplyPerTaxpayer" type="number" min="1" step="1" required>
                </div>
              </div>

              <div class="field">
                <label class="label">Addresses of Beneficiaries (Newline Delimited)</label>
                <div class="control">
                  <textarea v-model="taxpayersRaw" class="textarea" required />
                </div>
              </div>

              <div class="control">
                <button class="button is-info">
                  Proceed
                </button>
              </div>
            </fieldset>
          </form>
        </div>

        <div class="content">
          <h2 class="subtitle is-3">
            Step Two: Hard Fork
          </h2>

          <p>An ERC20 token contract created through the EthereumTaxDodgeball system contains a provision which allows it to be paused and hard forked.  When a hard fork takes place, a new contract is created which maintains references to the holders of the preexisting token and their respective balances.</p>

          <article v-show="errors.hardFork" class="message is-danger">
            <div class="message-header">
              Ethereum Transaction Error
              <button class="delete" aria-label="delete" @click="setError('hardFork')" />
            </div>
            <div class="message-body">
              {{ errors.hardFork }}
            </div>
          </article>

          <form action="javascript:void(0);" @submit="hardFork">
            <fieldset :disabled="disabled">
              <div class="field">
                <label class="label">New Token Name</label>
                <div class="control">
                  <input v-model="hardForkName" type="text" required>
                </div>
              </div>

              <div class="field">
                <label class="label">New Token Symbol</label>
                <div class="control">
                  <input v-model="hardForkSymbol" type="text" required>
                </div>
              </div>

              <div class="field">
                <label class="label">Source Token Contract Address</label>
                <div class="control">
                  <input v-model="sourceToken" type="text" placeholder="Output of Step One" required>
                </div>
              </div>

              <div class="control">
                <button class="button is-info">
                  Proceed
                </button>
              </div>
            </fieldset>
          </form>
        </div>

        <div class="content">
          <h2 class="subtitle is-3">
            Step Three: Add Liquidity for New Token
          </h2>

          <p>One may, for whatever reason, exercise <i>dominion &amp; control</i> over one's ether by offering to buy a sum of newly hard-forked tokens.  This may affect the <i>fair market value</i> of said tokens.</p>

          <p>A taxpayer who has gained, and is aware of having gained, <i>dominion &amp; control</i> of said tokens following an airdrop may accept said offer until it is rescinded.</p>

          <article v-show="errors.addLiquidity" class="message is-danger">
            <div class="message-header">
              Ethereum Transaction Error
              <button class="delete" aria-label="delete" @click="setError('addLiquidity')" />
            </div>
            <div class="message-body">
              {{ errors.addLiquidity }}
            </div>
          </article>

          <form action="javascript:void(0);" @submit="addLiquidity">
            <fieldset :disabled="disabled">
              <div class="field">
                <label class="label">Hard Fork Contract Address</label>
                <div class="control">
                  <input v-model="hardForkToken" type="text" placeholder="Output of Step Two" required>
                </div>
              </div>

              <div class="field">
                <label class="label">Volume</label>
                <div class="control">
                  <input v-model="supplyPerTaxpayer" type="number" min="1" step="1" required>
                </div>
              </div>

              <div class="field">
                <label class="label">Value (ether)</label>
                <div class="control">
                  <input v-model="volumeEther" type="number" min="0.01" step="0.01" required>
                </div>
              </div>

              <div class="control">
                <button class="button is-info">
                  Proceed
                </button>
              </div>
            </fieldset>
          </form>
        </div>

        <div class="content">
          <h2 class="subtitle is-3">
            Step Four: Airdrop
          </h2>

          <p>Token contracts which are created through a hard fork event via the EthereumTaxDodgeball system contain a provision to airdrop new tokens to holders of pre-hard-fork upstream tokens.  An airdrop effectively grants <i>dominion &amp; control</i> of tokens to taxpayers.</p>

          <article v-show="errors.airdrop" class="message is-danger">
            <div class="message-header">
              Ethereum Transaction Error
              <button class="delete" aria-label="delete" @click="setError('airdrop')" />
            </div>
            <div class="message-body">
              {{ errors.airdrop }}
            </div>
          </article>

          <form action="javascript:void(0);" @submit="airdrop">
            <fieldset :disabled="disabled">
              <div class="field">
                <label class="label">Hard Fork Contract Address</label>
                <div class="control">
                  <input v-model="hardForkToken" type="text" placeholder="Output of Step Two" required>
                </div>
              </div>

              <div class="control">
                <button class="button is-info">
                  Proceed
                </button>
              </div>
            </fieldset>
          </form>
        </div>

        <div class="content">
          <h2 class="subtitle is-3">
            Step Five: Remove Liquidity (optional)
          </h2>

          <p>One who has made an offer to buy a sum of newly hard-forked tokens may, for whatever reason, provided the offer has not yet been taken, rescind said offer.  This action may affect the <i>fair market value</i> of said tokens.</p>

          <article v-show="errors.removeLiquidity" class="message is-danger">
            <div class="message-header">
              Ethereum Transaction Error
              <button class="delete" aria-label="delete" @click="setError('removeLiquidity')" />
            </div>
            <div class="message-body">
              {{ errors.removeLiquidity }}
            </div>
          </article>

          <form action="javascript:void(0);" @submit="removeLiquidity">
            <fieldset :disabled="disabled">
              <div class="field">
                <label class="label">Hard Fork Contract Address</label>
                <div class="control">
                  <input v-model="hardForkToken" type="text" placeholder="Output of Step Two" required>
                </div>
              </div>

              <div class="control">
                <button class="button is-info">
                  Proceed
                </button>
              </div>
            </fieldset>
          </form>
        </div>

        <div
          class="modal"
          :class="{ 'is-active': loading }"
        >
          <div class="modal-background" />
          <div class="modal-content">
            <RippleLoader :size="360" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { RippleLoader } from 'vue-spinners-css';

export const data = {
  layout: 'page',
};

export default {
  components: { RippleLoader },

  data: function () {
    return {
      sourceName: null,
      sourceSymbol: null,
      taxpayersRaw: '',
      supplyPerTaxpayer: 10000,

      sourceToken: null,
      hardForkName: null,
      hardForkSymbol: null,

      hardForkToken: null,
      volumeEther: 1,

      loading: false,

      errors: {
        deployToken: null,
        hardFork: null,
        addLiquidity: null,
        airdrop: null,
        removeLiquidity: null,
      },
    };
  },

  computed: {
    disabled: function () {
      return !this.$parent.contractAddress;
    },

    currentAccount: function () {
      return this.$parent.currentAccount;
    },

    contract: function () {
      return this.$parent.contract;
    },

    taxpayers: function () {
      return this.taxpayersRaw.split('\n').filter(t => t.length);
    },
  },

  methods: {
    deployToken: async function () {
      this.loading = true;

      try {
        let tx = await this.contract.methods.deployToken(
          this.sourceName, this.sourceSymbol, this.supplyPerTaxpayer, this.taxpayers
        ).send({ from: this.currentAccount });

        this.sourceToken = tx.events.Deployment.returnValues.token;
      } catch (e) {
        this.setError('deployToken', e.message);
      } finally {
        this.loading = false;
      }
    },

    hardFork: async function () {
      this.loading = true;

      try {
        let tx = await this.contract.methods.hardFork(
          this.hardForkName, this.hardForkSymbol, this.sourceToken
        ).send({ from: this.currentAccount });

        this.hardForkToken = tx.events.HardFork.returnValues.token;
      } catch (e) {
        this.setError('hardFork', e.message);
      } finally {
        this.loading = false;
      }
    },

    addLiquidity: async function () {
      this.loading = true;

      try {
        await this.contract.methods.addLiquidity(
          this.hardForkToken, this.supplyPerTaxpayer
        ).send({ from: this.currentAccount, value: String(Number(this.volumeEther) * Number(`1${ '0'.repeat(18) }`)) });
      } catch (e) {
        this.setError('addLiquidity', e.message);
      } finally {
        this.loading = false;
      }
    },

    airdrop: async function () {
      this.loading = true;

      try {
        await this.contract.methods.airdrop(
          this.hardForkToken
        ).send({ from: this.currentAccount });
      } catch (e) {
        this.setError('airdrop', e.message);
      } finally {
        this.loading = false;
      }
    },

    removeLiquidity: async function () {
      this.loading = true;

      try {
        await this.contract.methods.removeLiquidity(
          this.hardForkToken
        ).send({ from: this.currentAccount });
      } catch (e) {
        this.setError('removeLiquidity', e.message);
      } finally {
        this.loading = false;
      }
    },

    setError: function (name, value = null) {
      Vue.set(this.errors, name, value);
    },
  },
};
</script>

<style lang="css" scoped>
.columns {
  flex-grow: 1;
}

.columns.is-gapless {
  margin-bottom: 0px;
}

.column > * {
  padding: 30px;
}
</style>
