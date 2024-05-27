import React from 'react'
import { useEffect, useRef, useState } from 'react';

import UserContext from './userContext'
import { ethers } from 'ethers';

import PluralitySocialConnect from 'plurality-social-connect';
import { dataMarketplaceContractAbi, dataMarketplaceContractAddress, usdcContractAbi, usdcContractAddress } from '../constants';

const UserContextProvider = ({ children }) => {
    const childRef = useRef(null);

    const [isConnected, setIsConnected] = useState(false)
    const [userData, setUserData] = useState({})
    const [address, setAddress] = React.useState('')
    const [provider, setProvider] = React.useState(null)
    const [signer, setSigner] = React.useState(null)
    const [usdcContract, setUsdcContract] = React.useState(null)
    const [dataMarketplaceContract, setDataMarketplaceContract] = React.useState(null)
    const [allowance, setAllowance] = React.useState(0)
    // const [childRef, setChildRef] = useState({})

    const handleProfileDataReturned = (data) => {
        console.log('👌👌👌')
        const receivedData = JSON.parse(JSON.stringify(data))
        console.log("Get profile data:", receivedData.data);
        const completeData = generateRemainingStatsData(receivedData.data[0])
        console.log("complete data: ", completeData)
        setUserData(completeData)
        setIsConnected(true)
        alert(JSON.stringify(data));
        connectToMetamask()
        console.log('connected to metamask as well')
        // childRef.current.closeSocialConnectPopup();
    };

    const checkCorrectNetwork = async () => {
        await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0xaa36a7' }], // chainId must be in hexadecimal
        })
        window.ethereum.on('chainChanged', (newChainId) => {
            console.log("Network changed to chain ID:", newChainId);
            window.location.reload();
        });
    }
    const connectToMetamask = async () => {
        console.log('conecting to metamask')
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            await provider.send('eth_requestAccounts', [])

            await checkCorrectNetwork()

            const signer = provider.getSigner()
            const address = await signer.getAddress()

            const usdcContract = new ethers.Contract(
                usdcContractAddress,
                usdcContractAbi,
                signer
            )
            const dataMarketplaceContract = new ethers.Contract(
                dataMarketplaceContractAddress,
                dataMarketplaceContractAbi,
                signer
            )
            setProvider(provider)
            setSigner(signer)
            setIsConnected(true)
            setAddress(address)
            setUsdcContract(usdcContract)
            setDataMarketplaceContract(dataMarketplaceContract)
        } catch (error) {
            console.log('the error that occured is: ', error)
        }
    }

    const generateRemainingStatsData = (data) => {
        // data = {
        //     assetType: ['CRYPTO', 'SOCIAL_MEDIA_PLATFORMS', 'CRYPTO__WEB3_SOCIAL', 'NEWS', 'ENTERTAINMENT'],
        //     dataFetchedFrom: "twitter",
        //     profleData: { "name": "krishnaAgr2992", "displayName": "krishna agrawal", "profileUrl": "https://pbs.twimg.com/profile_images/1706371153219170304/LadakYfE_normal.jpg" },
        //     stats: {
        //         followerCount: 34,
        //         blueTick: true,
        //         noOfTweets: 8,
        //         noOfReposts: 3,
        //         reputationScore: 82
        //     }
        // }
        const followerCountCategory = Math.floor(Math.random() * 3)
        console.log('follower category: ', followerCountCategory)
        let followerCount
        switch (followerCountCategory) {
            case 0: followerCount = Math.floor(Math.random() * 100)
                break
            case 1: followerCount = Math.floor(Math.random() * 900) + 100
                break
            case 2: followerCount = Math.floor(Math.random() * 9000) + 1000
                break
        }
        const blueTick = Math.random() > 0.7
        const reputationScore = Math.floor(Math.random() * 100)
        const noOfTweets = Math.floor(Math.random() * 20)
        const noOfReposts = Math.floor(Math.random() * 20)
        return { ...data, stats: { followerCount, blueTick, reputationScore, noOfTweets, noOfReposts } }
    }

    const listData = async () => {
        try {
            console.log('data is listing....')

            const statsData = userData.stats
            const interests = userData.assetData

            const data = { ...statsData, interests }
            const serializedData = JSON.stringify(data)
            console.log('data in listing: ', serializedData)

            // PluralitySocialConnect.readFromContract(dataMarketplaceContractAddress, dataMarketplaceContractAbi, "getFollowerCategoryData", "1")

            await dataMarketplaceContract.listData(
                userData.stats.followerCount,
                serializedData
            )

            alert('data listed successfully')
        } catch (error) {
            console.log('💥💥💥💥', error)
        }
    }

    const mintAndApprove = async () => {
        try {
            console.log("approving tokens to the user")
            const amount = ethers.utils.parseEther('20000')
            await usdcContract.mint(amount)
            await usdcContract.approve(dataMarketplaceContractAddress, amount)
            console.log('usdc tokens minted and the dm approved!!')
        } catch (error) {
            console.log('error: ', error)
        }
    }

    const handleBuyGroupedData = async (category) => {
        console.log('handle buy gd called!!')
        checkApproval()
        console.log('allowance1111', allowance)
        if (allowance < 100) {
            await mintAndApprove()
            console.log('ethers minted and approved')
        }
        buyData(category)
    }

    const buyData = async (category) => {
        try {
            console.log('buy data calledd')
            const txResponse = await dataMarketplaceContract.buyData(category);
            console.log('Transaction hash:', txResponse.hash);
            const data = await dataMarketplaceContract.getFollowerCategoryData(category, { gasLimit: 200000 })
            alert('check the console for data')
            console.log('user data received from contract:', data)
        } catch (error) {
            console.log('error: ', error)
        }
    }

    const checkApproval = async () => {
        console.log('check approval called')
        console.log('address: ', address)
        const all = await usdcContract.allowance(address, dataMarketplaceContractAddress)
        console.log('allowanceeeeee', ethers.utils.formatEther(all))
        setAllowance(ethers.utils.formatEther(all))
    }

    return (
        <UserContext.Provider value={{ userData, isConnected, childRef, handleProfileDataReturned, listData, handleBuyGroupedData, checkApproval, mintAndApprove }}>
            {children}
        </UserContext.Provider>
    )

}

export default UserContextProvider
