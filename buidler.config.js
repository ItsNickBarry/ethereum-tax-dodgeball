usePlugin('@nomiclabs/buidler-truffle5');
usePlugin('buidler-gas-reporter');

// This is a sample Buidler task. To learn how to create your own go to
// https://buidler.dev/guides/create-task.html
task('accounts', 'Prints the list of accounts', async () => {
  const accounts = await web3.eth.getAccounts();

  for (const account of accounts) {
    console.log(account);
  }
});

module.exports = {
  defaultNetwork: 'ganache',
  networks: {
    ganache: {
      url: 'http://127.0.0.1:8545',
    },
    generic: {
      url: process.env.URL || '',
      accounts: {
        mnemonic: process.env.MNEMONIC || '',
      },
    },
  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 200,
    },
  },
  gasReporter: {
    currency: 'USD',
    gasPrice: 3,
    enabled: !!process.env.REPORT_GAS,
  },
};
