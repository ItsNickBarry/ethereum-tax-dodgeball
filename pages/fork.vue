<template lang="html">
  <div
    class="columns is-gapless"
    :style="{ 'background-image': 'url(red_dust_scratch.png)' }"
  >
    <div class="column">
      <div class="container">
        <div class="content">
          <h1 class="title is-1 has-text-dark">
            Hard Fork &amp; Airdrop
          </h1>

          <p>
            Complete the following steps, in order, to create tax obligations.
          </p>

          <p v-show="disabled">
            No known EthereumTaxDodgeball contract is deployed on this network.
          </p>
        </div>

        <div class="content">
          <h2 class="subtitle is-3">
            Step One: Deploy and Distribute an ERC20 Token
          </h2>
          <form action="javascript:void(0);" @submit="one">
            <fieldset :disabled="disabled">
              <div class="field">
                <label class="label">New Token Name</label>
                <div class="control">
                  <input v-model="hardForkName" type="text">
                </div>
              </div>

              <div class="field">
                <label class="label">New Token Symbol</label>
                <div class="control">
                  <input v-model="hardForkSymbol" type="text">
                </div>
              </div>

              <div class="field">
                <label class="label">Quantity of Tokens to Mint for Each Beneficiary</label>
                <div class="control">
                  <input v-model="supplyPerTaxpayer" type="number" min="1" step="1">
                </div>
              </div>

              <div class="field">
                <label class="label">Addresses of Beneficiaries (Newline Delimited)</label>
                <div class="control">
                  <textarea v-model="taxpayersRaw" class="textarea" />
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
          <form action="javascript:void(0);" @submit="two">
            <fieldset :disabled="disabled">
              <div class="field">
                <label class="label">New Token Name</label>
                <div class="control">
                  <input v-model="hardForkName" type="text">
                </div>
              </div>

              <div class="field">
                <label class="label">New Token Symbol</label>
                <div class="control">
                  <input v-model="hardForkSymbol" type="text">
                </div>
              </div>

              <div class="field">
                <label class="label">Source Token Contract Address</label>
                <div class="control">
                  <input v-model="sourceToken" placeholder="Output of Step One">
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
          <form action="javascript:void(0);" @submit="three">
            <fieldset :disabled="disabled">
              <div class="field">
                <label class="label">Hard Fork Contract Address</label>
                <div class="control">
                  <input v-model="hardForkToken" placeholder="Output of Step Two">
                </div>
              </div>

              <div class="field">
                <label class="label">Ether Value</label>
                <div class="control">
                  <input v-model="volume" type="number" min="0.01">
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
          <form action="javascript:void(0);" @submit="four">
            <fieldset :disabled="disabled">
              <div class="field">
                <label class="label">Hard Fork Contract Address</label>
                <div class="control">
                  <input v-model="hardForkToken" placeholder="Output of Step Two">
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
          <form action="javascript:void(0);" @submit="five">
            <fieldset :disabled="disabled">
              <div class="field">
                <label class="label">Hard Fork Contract Address</label>
                <div class="control">
                  <input v-model="hardForkToken" placeholder="Output of Step Two">
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
      sourceName: null,
      sourceSymbol: null,
      taxpayersRaw: '',
      supplyPerTaxpayer: 10000,

      sourceToken: null,
      hardForkName: null,
      hardForkSymbol: null,

      hardForkToken: null,
      volume: 1,
    };
  },

  computed: {
    taxpayers: function () {
      return this.taxpayersRaw.split('\n');
    },

    disabled: function () {
      return !this.$parent.contractAddress;
    },
  },

  methods: {
    one: function () {
      // TODO: ...
    },
    two: function () {
      // TODO: ...
    },
    three: function () {
      // TODO: ...
    },
    four: function () {
      // TODO: ...
    },
    five: function () {
      // TODO: ...
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
