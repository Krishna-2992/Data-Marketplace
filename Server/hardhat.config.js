require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    hardhat: {
      chainId: 31337,
    },
    localhost: {
      url: 'http://127.0.0.1:8545/',
      accounts: ['0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'],
    },
    ganache: {
      url: 'http://127.0.0.1:7545',
      accounts: ['0xfe806b0a3cebf540a992234fb0cd40dc68a572e2facce9f6cd62932e08074784']

    }
  }
};
