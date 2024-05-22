const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("DataMarketplaceModule", (m) => {

    const dataMarketplace = m.contract("DataMarketplace", ['0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512']);
    console.log("dm::: ", dataMarketplace)

    return { dataMarketplace };
});
