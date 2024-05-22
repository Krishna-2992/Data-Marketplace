// const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers')

// const { assert, expect } = require('chai')

// const hre = require('hardhat')
// const { ethers } = require('hardhat')

// describe("SimpleStorage", function () {

//     async function deploySS() {
//         const SimpleStorage = await ethers.getContractFactory('SimpleStorage')
//         const simpleStorage = await SimpleStorage.deploy()

//         console.log('simpleStorage address', simpleStorage.target)

//         return { simpleStorage }
//     }

//     describe("Deployment", function () {
//         it('should deploy the contract properly', async () => {
//             const { simpleStorage } = await loadFixture(deploySS)
//             console.log(simpleStorage.target)
//             console.log(await simpleStorage.get())
//             expect(await simpleStorage.get()).to.equal(0)
//         })

//     })

// })
