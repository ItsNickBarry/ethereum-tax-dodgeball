<template lang="html">
  <div
    class="columns is-gapless"
    :style="{ 'background-image': 'url(blue_dust_scratch.png)' }"
  >
    <div class="column">
      <div class="container">
        <div class="content">
          <h1 class="title is-1 has-text-dark">
            Dominion &amp; Control
          </h1>

          <p>Taxpayers may use this page to accept offers made to purchase their hard-forked-and-airdropped tokens.  They may also elect to opt out of any future token gifts made through the EthereumTaxDodgeball contract.</p>

          <p v-show="disabled">
            No known EthereumTaxDodgeball contract is deployed on this network.
          </p>
        </div>

        <div class="content">
          <h2 class="subtitle is-3">
            Redeem Tokens
          </h2>
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
