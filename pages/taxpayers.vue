<template lang="html">
  <div class="columns is-gapless taxpayers">
    <div class="column">
      <div class="container">
        <div class="content">
          <h1 class="title is-1 has-text-dark">
            Dominion &amp; Control
          </h1>

          <p>The Internal Revenue Service of the United States government has released guidance for U.S. taxpayers who gain <i>dominion &amp; control</i> of virtual currencies (tokens) via an <i>airdrop</i> following a <i>hard fork</i> of a preexisting token.  That guidance has been published online and may be reviewed <a href="https://www.irs.gov/pub/irs-drop/rr-19-24.pdf">here</a>.</p>

          <p>The use of the EthereumTaxDodgeball system may have tax implication for U.S. taxpayers.</p>

          <p>Taxpayers may use this page to accept offers made to purchase their hard-forked-and-airdropped tokens.  They may also elect to opt out participation in the EthereumTaxDodgeball system.</p>

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
            Redeem Tokens
          </h2>

          <p>Taxpayers who have gained <i>dominion &amp; control</i> of tokens through an airdrop following a hard fork through the EthereumTaxDodgeball system may be able to exchange their tokens for ether.</p>

          <p>
            This action requires two blockchain transactions:
            <ol>
              <li>Authorization of the EthereumTaxDodgeball contract to manage the taxpayer's airdropped tokens</li>
              <li>Acceptance of an existing offer to purchase the taxpayer's airdropped tokens</li>
            </ol>
          </p>

          <form action="javascript:void(0);" @submit="takeLiquidity">
            <fieldset :disabled="disabled">
              <div class="field">
                <label class="label">Hard Fork Contract Address</label>
                <div class="control">
                  <input v-model="hardForkAddress" type="text" required>
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
            Opt Out
          </h2>

          <p>Taxpayers who maintain a healthy fear of their government may elect to opt out of participation.  One must simply pay the opt-out fee in order to be excluded from all future token gifts made through the EthereumTaxDodgeball contract.</p>

          <p>The fee at this time is {{ optOutFeeDisplay }} ether.</p>

          <p v-show="isOptedOut">
            The current address has already opted out of the contract deployed on the current network.
          </p>

          <form action="javascript:void(0);" @submit="optOut">
            <fieldset :disabled="disabled || isOptedOut">
              <div class="field">
                <label class="label">Opt-Out Fee (ether)</label>
                <div class="control">
                  <input v-model="optOutFeeDisplay" type="number" disabled required>
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
import { RippleLoader } from 'vue-spinners-css';

const HARD_FORK_ABI = require('../static/abi/ERC20HardFork.json');

export const data = {
  layout: 'page',
};

export default {
  components: { RippleLoader },

  data: function () {
    return {
      hardForkAddress: null,
      optOutFee: 0,
      isOptedOut: false,

      loading: false,
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

    hardForkContract: function () {
      return !!this.hardForkAddress && this.$parent.web3 && new this.$parent.web3.eth.Contract(HARD_FORK_ABI, this.hardForkAddress);
    },

    optOutFeeDisplay: function () {
      return Number(this.optOutFee) / 1e18;
    },
  },

  watch: {
    contract: function () {
      this.setOptOutFee();
      this.setIsOptedOut();
    },
  },

  methods: {
    takeLiquidity: async function () {
      this.loading = true;

      try {
        let balance = await this.hardForkContract.methods.balanceOf(this.currentAccount).call();
        debugger
        await this.hardForkContract.methods.increaseAllowance(this.contract.options.address, balance).send({ from: this.currentAccount });
        await this.contract.methods.takeLiquidity(this.hardForkAddress).send({ from: this.currentAccount });
      } finally {
        this.loading = false;
      }
    },

    optOut: async function () {
      this.loading = true;

      try {
        await this.contract.methods.optOut().send({ from: this.currentAccount, value: this.optOutFee });
        this.setIsOptedOut();
      } finally {
        this.loading = false;
      }
    },

    setOptOutFee: async function () {
      this.optOutFee = await this.contract.methods.getOptOutFee().call();
    },

    setIsOptedOut: async function () {
      this.isOptedOut = await this.contract.methods.isOptedOut(this.currentAccount).call();
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
