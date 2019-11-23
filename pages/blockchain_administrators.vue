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

          <p v-show="disabled">
            No known EthereumTaxDodgeball contract is deployed on this network.
          </p>
        </div>

        <div class="content">
          <h2 class="subtitle is-3">
            Step One: Deploy and Distribute an ERC20 Token
          </h2>

          <p>A prospective blockchain administrator may use the EthereumTaxDodgeball system for the purpose of deploying an ERC20 token contract.  This contract should be initialized with a list of two or more beneficiary U.S. taxpayer addresses.</p>

          <form action="javascript:void(0);" @submit="deployToken">
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

          <p>An ERC20 token contract created through the EthereumTaxDodgeball system contains a provision which allows it to be paused and hard forked.  When a hard fork takes place, a new contract is created which maintains references to the holders of the preexisting token and their respective balances.</p>

          <form action="javascript:void(0);" @submit="hardFork">
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
                  <input v-model="sourceToken" type="text" placeholder="Output of Step One">
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

          <form action="javascript:void(0);" @submit="addLiquidity">
            <fieldset :disabled="disabled">
              <div class="field">
                <label class="label">Hard Fork Contract Address</label>
                <div class="control">
                  <input v-model="hardForkToken" type="text" placeholder="Output of Step Two">
                </div>
              </div>

              <div class="field">
                <label class="label">Value (ether)</label>
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

          <p>Token contracts which are created through a hard fork event via the EthereumTaxDodgeball system contain a provision to airdrop new tokens to holders of pre-hard-fork upstream tokens.</p>

          <form action="javascript:void(0);" @submit="airdrop">
            <fieldset :disabled="disabled">
              <div class="field">
                <label class="label">Hard Fork Contract Address</label>
                <div class="control">
                  <input v-model="hardForkToken" type="text" placeholder="Output of Step Two">
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

          <form action="javascript:void(0);" @submit="removeLiquidity">
            <fieldset :disabled="disabled">
              <div class="field">
                <label class="label">Hard Fork Contract Address</label>
                <div class="control">
                  <input v-model="hardForkToken" type="text" placeholder="Output of Step Two">
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
    deployToken: function () {
      // TODO: ...
    },
    hardFork: function () {
      // TODO: ...
    },
    addLiquidity: function () {
      // TODO: ...
    },
    airdrop: function () {
      // TODO: ...
    },
    removeLiquidity: function () {
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
