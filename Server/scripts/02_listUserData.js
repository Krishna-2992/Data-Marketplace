const { ethers } = require('hardhat')

async function main() {


    console.log('usdc address is', usdcToken.target)
    console.log('dm address is : ', dataMarketplace.target)
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});