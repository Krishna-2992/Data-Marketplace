const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers')

const { assert, expect } = require("chai")

const { ethers } = require("hardhat")

async function deployUsdc() {
    const [deployer, user1, user2] = await ethers.getSigners()
    const USDC = await ethers.getContractFactory('USDCToken')
    const usdcToken = await USDC.deploy()
    console.log('usdc token deployed at:', usdcToken.target)
    return { usdcToken, deployer, user1, user2 }
}

async function deployDataMarketplace() {
    const { usdcToken, deployer, user1, user2 } = await loadFixture(deployUsdc)

    const DataMarketplace = await ethers.getContractFactory('DataMarketplace')
    const dataMarketplace = await DataMarketplace.deploy(usdcToken.target)
    console.log("address of DM is: ", dataMarketplace.target)
    return { dataMarketplace, deployer, user1, user2, usdcToken }
}

describe("Data Marketplace", function () {

    async function listUserData() {
        const { dataMarketplace, deployer, user1, user2, usdcToken } = await loadFixture(deployDataMarketplace)
        await dataMarketplace.connect(user1).listData(
            66,
            `{interests: ["crypto", "news"], followerCount: 66, tweetCount: 7}`
        )
        await dataMarketplace.connect(deployer).listData(
            45,
            `{interests: ["entertainment", "sports"], followerCount: 45, tweetCount: 9}`
        )
        console.log('listing done')
        return { dataMarketplace, user1, user2, usdcToken }
    }

    describe("deployment", () => {
        it("should deploy the usdc properly", async () => {
            const { usdcToken } = await loadFixture(deployUsdc)
            console.log('token address', usdcToken.target)
            expect(0).to.equal(0)
        })
        it("should deploy the data marketplace properly", async () => {
            const { dataMarketplace } = await loadFixture(deployDataMarketplace)
            console.log('dm address', dataMarketplace.target)
            expect(0).to.equal(0)
        })
    })

    describe("listing the data properly", async () => {

        it('should increase the follower of specified range properly', async () => {
            const { dataMarketplace } = await loadFixture(listUserData)
            const listingCount0 = await dataMarketplace.getNumberOfFollowers(0)
            const listingCount1 = await dataMarketplace.getNumberOfFollowers(1)
            const listingCount2 = await dataMarketplace.getNumberOfFollowers(2)
            expect(listingCount0).to.equal(2)
            expect(listingCount1).to.equal(0)
            expect(listingCount2).to.equal(0)
        })
        it("should return the proper user data based on the user address", async () => {
            const { dataMarketplace, user1 } = await loadFixture(listUserData)
            const userData = await dataMarketplace.getDataOf(user1.address)
            console.log('user data: ', userData)
        })
    })

    describe('buying data properly', async () => {
        it('should send the sellers data when payment done', async () => {
            const { dataMarketplace, user1, user2, usdcToken } = await loadFixture(listUserData)
            const amount = ethers.parseUnits('2000', 18)
            // console.log('user 2 address', user2)
            await usdcToken.connect(user2).mint('2000000000000000000')
            await usdcToken.connect(user2).approve(dataMarketplace.target, amount)
            const buyTx = await dataMarketplace.connect(user2).buyData(0)
            await buyTx.wait()
            const data = await dataMarketplace.connect(user2).getFollowerCategoryData(0)
            console.log(data)
        })
        it('should revert if the user has not approved the tokens to dm', async () => {
            const { dataMarketplace, user1, user2, usdcToken } = await loadFixture(listUserData);

            // Mock the approval transaction
            const approveTx = await usdcToken.connect(user2).approve(dataMarketplace.address, 0);
            await approveTx.wait(); // Wait for the transaction to be mined

            // Now try to call the function that should revert
            await expect(dataMarketplace.connect(user2).buyData(0)).to.be.revertedWith("Data access denied!!");

            console.log('Test passed');
        });
    })

})