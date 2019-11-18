module.exports = {
  defaultNetwork: "develop",

  networks: {
    develop: {
      gas: 6000000,
      url: "127.0.0.1:8545",
    },
  },

  solc: {
    version: "0.5.9",
    optimizer: {
      enabled: false,
    },
  },

  paths: {
    sources: "./contracts",
  },
};
