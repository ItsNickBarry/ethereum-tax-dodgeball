<template lang="html">
  <section class="hero is-fullheight">
    <slot name="default" />

    <footer class="footer hero-foot" :style="{ 'background-image': 'url(starring.png)' }">
      <div class="level">
        <div class="level-left">
          <div class="container">
            <h1 class="title is-2 has-text-warning">
              Ethereum Tax Dodgeball
            </h1>
            <h2 class="subtitle is-4 has-text-warning">
              by <a class="has-text-light" href="https://github.com/ItsNickBarry">Nick Barry</a>
            </h2>
          </div>
        </div>

        <div class="level-right">
          <div class="level-item">
            <ul>
              <li><a class="has-text-light" href="/">Home</a></li>
              <li><a class="has-text-light" href="/about.html">About</a></li>
              <li><a class="has-text-light" href="https://github.com/ItsNickBarry/ethereum-tax-dodgeball">Source Code</a></li>
              <br>
              <li><span class="has-text-warning">Current Network: {{ currentNetworkName }}</span></li>
              <li><span class="has-text-warning">Current Account: {{ currentAccountName }}</span></li>
              <li><span class="has-text-warning">Contract Address: {{ contractAddress }}</span></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  </section>
</template>

<script>
const NETWORKS = {
  '1': 'Ethereum Main Network',
  '2': 'Morden Test Network',
  '3': 'Ropsten Test Network',
  '4': 'Rinkeby Test Network',
  '5': 'Görli Test Network',
  '42': 'Kovan Test Network',
};

const ADDRESSES = {
  // TODO: store deployed contract addresses by network id
  '1':  'Not Deployed',
  '2':  'Not Deployed',
  '3':  'Not Deployed',
  '4':  'Not Deployed',
  '5':  'Not Deployed',
  '42': 'Not Deployed',
};

let devAddress;
try {
  devAddress = require('../static/dev_address.json').address;
} catch (e) {
  devAddress = null;
}

export default {
  data: function () {
    return {
      currentNetwork: null,
      currentAccount: null,
      devAddress: null,
    };
  },

  computed: {
    currentNetworkName: function () {
      return NETWORKS[this.currentNetwork] || `Private Network (${ this.currentNetwork })` || 'Not Connected';
    },

    currentAccountName: function () {
      return this.currentAccount || 'Not Connected';
    },

    contractAddress: function () {
      return ADDRESSES[this.currentNetwork] || devAddress || 'Not Deployed';
    },
  },

  mounted: function () {
    if (typeof global.ethereum === 'undefined') {
      alert('An Ethereum client such as Metamask is required to use this site.');
      return;
    }

    this.updateAccount();
    global.ethereum.on('accountsChanged', this.updateAccount);
    this.updateNetwork();
    global.ethereum.on('networkChanged', this.updateNetwork);

    global.ethereum.enable();
  },

  methods: {
    updateAccount: function (accounts) {
      this.currentAccount = accounts && accounts[0] || global.ethereum.selectedAddress;
    },

    updateNetwork: function (network) {
      this.currentNetwork = network || global.ethereum.networkVersion;
    },
  },
};
</script>

<style lang="css" scoped>
footer {
  background-repeat: repeat;
}
</style>

<style lang="scss">
@import "~bulma/sass/utilities/_all";

$footer-padding: 3rem 1.25rem 3rem;

@import "~bulma";

@font-face {
  font-family: 'Lusitana';
  src: url(../static/Lusitana-Regular.ttf);
}

* {
  font-family: 'Lusitana', serif;
}

html {
  overflow-y: auto;
}
</style>
