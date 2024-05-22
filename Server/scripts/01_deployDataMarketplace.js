const { ethers } = require('hardhat')

async function main() {
    const USDCToken = await ethers.getContractFactory('USDCToken')
    const usdcToken = await USDCToken.deploy()

    const DataMarketplace = await ethers.getContractFactory("DataMarketplace")
    const dataMarketplace = await DataMarketplace.deploy(usdcToken.target)

    console.log('usdc address is', usdcToken.target)
    console.log('dm address is : ', dataMarketplace.target)
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});