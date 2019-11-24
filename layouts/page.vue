<template lang="html">
  <section id="app" class="hero is-fullheight">
    <slot name="default" />

    <footer class="footer hero-foot stars">
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
              <li>
                <a class="nav-icon has-text-light" href="/"><Bank title="Home" :size="40" /></a>
                <a class="nav-icon has-text-light" href="/about.html"><Information title="About" :size="40" /></a>
                <a class="nav-icon has-text-light" href="https://github.com/ItsNickBarry/ethereum-tax-dodgeball"><GithubBox title="Source Code" :size="40" /></a>
              </li>
              <br>
              <li>
                <div class="level has-text-warning">
                  <span>Current Network:</span>
                  <span class="monospace">
                    &nbsp;{{ currentNetworkName }}
                  </span>
                </div>
              </li>
              <li>
                <div class="level has-text-warning">
                  <span>Current Account:</span>
                  <span class="monospace">
                    &nbsp;{{ currentAccountName }}
                  </span>
                </div>
              </li>
              <li>
                <div class="level has-text-warning">
                  <span>Contract Address:</span>
                  <span class="monospace">
                    &nbsp;{{ contractAddressName }}
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  </section>
</template>

<script>
import Web3 from 'web3';

import Bank from 'vue-material-design-icons/Bank.vue';
import Information from 'vue-material-design-icons/Information.vue';
import GithubBox from 'vue-material-design-icons/GithubBox.vue';

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
  '1':  null,
  '2':  null,
  '3':  null,
  '4':  null,
  '5':  null,
  '42': null,
};

let devAddress;
try {
  devAddress = require('../static/dev_address.json').address;
} catch (e) {
  devAddress = null;
}

const ABI = require('../static/abi/EthereumTaxDodgeball.json');

export default {
  components: { Bank, Information, GithubBox },

  data: function () {
    return {
      currentNetwork: null,
      currentAccount: null,
      devAddress: null,

      web3: null,
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
      return this.currentNetwork in ADDRESSES ? ADDRESSES[this.currentNetwork] : devAddress;
    },

    contractAddressName: function () {
      return this.contractAddress || 'Not Deployed';
    },

    contract: function () {
      return !!this.contractAddress && this.web3 && new this.web3.eth.Contract(ABI, this.contractAddress);
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

    this.web3 = new Web3(global.ethereum);
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
</style>

<style lang="scss">
@import "~bulma/sass/utilities/_all";

$footer-padding: 3rem 1.25rem 3rem;

@import "~bulma";

@font-face {
  font-family: 'Lusitana';
  src: url(../static/Lusitana-Regular.ttf);
}

@font-face {
  font-family: 'Inconsolata';
  src: url(../static/Inconsolata-Regular.ttf);
}

html {
  overflow-y: auto;
}

#app {
  font-family: 'Lusitana', serif;
}

.monospace {
  font-family: 'Inconsolata', monospace;
}

.nav-icon {
  margin-right: 35px;
}

.blockchain-administrators {
  background-image: url(../static/red_dust_scratch.png);
  background-repeat: repeat;
}

.taxpayers {
  background-image: url(../static/blue_dust_scratch.png);
  background-repeat: repeat;
}

.about {
  background-image: url(../static/green_dust_scratch.png);
  background-repeat: repeat;
}

.stars {
  background-image: url(../static/starring.png);
  background-repeat: repeat;
}
</style>
