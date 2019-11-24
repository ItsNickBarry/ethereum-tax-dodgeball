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

          <form action="javascript:void(0);" @submit="takeLiquidity">
            <fieldset :disabled="disabled">
              <div class="field">
                <label class="label">Hard Fork Contract Address</label>
                <div class="control">
                  <input v-model="hardForkToken" type="text">
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

          <p>Taxpayers with a healthy fear of their government may elect to opt out of participation.  One must simply pay the opt-out fee in order to be excluded from all future token gifts made through the EthereumTaxDodgeball contract.</p>

          <p>The fee at this time is {{ optOutFee }} ether.</p>

          <form action="javascript:void(0);" @submit="optOut">
            <fieldset :disabled="disabled">
              <div class="field">
                <label class="label">Opt-Out Fee (ether)</label>
                <div class="control">
                  <input v-model="optOutFee" type="number" disabled="true">
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
      </div>
    </div>
  </div>
</template>

<script>
export const data = {
  layout: 'page',
};

export default {
  data: function () {
    return {
      optOutFee: 0,
    };
  },

  computed: {
    disabled: function () {
      return !this.$parent.contractAddress;
    },
  },

  mounted: function () {
    // TODO: fetch opt-out fee
  },

  methods: {
    takeLiquidity: function () {
      // TODO:
    },

    optOut: function () {
      // TODO:
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
