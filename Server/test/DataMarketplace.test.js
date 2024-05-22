const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers')

const { assert, expect } = require("chai")

const { ethers } = require("hardhat")

async function deployUsdc() {
    const USDC = await ethers.getContractFactory('USDCToken')
    const usdcToken = await USDC.deploy()
    console.log('usdc token deployed at:', usdcToken.target)
    return { usdcToken }
}

async function deployDataMarketplace() {
    const [deployer, user1, user2] = await ethers.getSigners()
    const { usdcToken } = await loadFixture(deployUsdc)

    const DataMarketplace = await ethers.getContractFactory('DataMarketplace')
    const dataMarketplace = await DataMarketplace.deploy(usdcToken.target)
    console.log("address of DM is: ", dataMarketplace.target)
    return { dataMarketplace, deployer, user1, user2 }
}

describe("Data Marketplace", function () {

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

        async function listUserData() {
            const { dataMarketplace, user1 } = await loadFixture(deployDataMarketplace)
            await dataMarketplace.connect(user1).listData(
                "Crypto, news, entertainment",
                112,
                7,
                3,
                428
            )
            console.log('listing done')
            return { dataMarketplace, user1 }
        }


        it('should increase the follower of specified range properly', async () => {
            const { dataMarketplace } = await loadFixture(listUserData)
            const listingCount0 = await dataMarketplace.getNumberOfFollowers(0)
            const listingCount1 = await dataMarketplace.getNumberOfFollowers(1)
            const listingCount2 = await dataMarketplace.getNumberOfFollowers(2)
            expect(listingCount0).to.equal(0)
            expect(listingCount1).to.equal(1)
            expect(listingCount2).to.equal(0)
        })
        it("should return the proper user data based on the user address", async () => {
            const { dataMarketplace, user1 } = await loadFixture(listUserData)
            const userData = await dataMarketplace.getDataOf(user1.address)
            console.log('user data: ', userData)
            console.log('user data: ', userData[1])
        })
    })

})