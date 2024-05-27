import React from 'react'
import { useEffect, useRef, useState } from 'react';

import UserContext from './userContext'

import PluralitySocialConnect from 'plurality-social-connect';
import { dataMarketplaceContractAbi, dataMarketplaceContractAddress } from '../constants';

const UserContextProvider = ({ children }) => {
    // const childRef = useRef(null);

    const [isConnected, setIsConnected] = useState(false)
    const [userData, setUserData] = useState({})
    const [childRef, setChildRef] = useState({})

    const handleProfileDataReturned = (data) => {
        console.log('👌👌👌')
        const receivedData = JSON.parse(JSON.stringify(data))
        console.log("Get profile data:", receivedData.data);
        const completeData = generateRemainingStatsData(receivedData.data[0])
        console.log("complete data: ", completeData)
        setUserData(completeData)
        setIsConnected(true)
        alert(JSON.stringify(data));
        console.log("childRef.current ", childRef.current)
        console.log("childRef.current ", childRef)
        // childRef.current.closeSocialConnectPopup();
    };

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

            // await dataMarketplaceContract.listData(
            //     followersCount,
            //     serializedData
            // )

            const result = await PluralitySocialConnect.readFromContract(dataMarketplaceContractAddress, dataMarketplaceContractAbi, "getNumberOfFollowers", "0")
            console.log('number of followers in 0 category is: ', result)

            console.log('data listed successfully')
        } catch (error) {
            console.log('💥💥💥💥', error)
        }
    }

    const tempFunction = () => {
        console.log("tempfunction working")
    }

    return (
        <UserContext.Provider value={{ userData, isConnected, childRef, setChildRef, handleProfileDataReturned, tempFunction, listData }}>
            {children}
        </UserContext.Provider>
    )

}

export default UserContextProvider
