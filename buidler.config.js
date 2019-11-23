usePlugin('@nomiclabs/buidler-truffle5');
usePlugin('@nomiclabs/buidler-ganache');

module.exports = {
  defaultNetwork: 'ganache',
  networks: {
    ganache: {
      mnemonic: 'test',
      url: 'http://127.0.0.1:8545',
    },
  },
};
