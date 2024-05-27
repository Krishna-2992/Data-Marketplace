import { useContext, useRef } from 'react'
import PluralitySocialConnect from 'plurality-social-connect';
import UserContext from '../context/userContext'

import wallet from '../assets/wallet.png'
import upload from '../assets/upload.png'
import payment from '../assets/payment.png'
import Footer from '../components/Footer';

import { usdcContractAddress, dataMarketplaceContractAddress, usdcContractAbi, dataMarketplaceContractAbi } from '../constants';

export default function List() {
    const ref = useRef(null);

    const {
        data,
        userData,
        isConnected,
        childRef,
        setChildRef,
        handleProfileDataReturned,
        listData
    } = useContext(UserContext)

    const profileData = userData.profileData ? JSON.parse(userData.profileData) : ''
    setChildRef(ref)

    // console.log("profile data : ", profileData)

    // Web3 function handles
    const handleGetAllAccounts = (data) => {
        const receivedData = JSON.parse(JSON.stringify(data))
        console.log("Get all accounts:", receivedData);
        alert(JSON.stringify(data));
    };
    const handleGetConnectedAccount = (data) => {
        const receivedData = JSON.parse(JSON.stringify(data))
        console.log("Get connected account:", receivedData);
        alert(JSON.stringify(data));
    };
    const handleMessageSignature = (data) => {
        const receivedData = JSON.parse(JSON.stringify(data))
        console.log("Get message signature:", receivedData);
        alert(JSON.stringify(data));
    };
    const handleVerifyMessageSignature = (data) => {
        const receivedData = JSON.parse(JSON.stringify(data))
        console.log("Verify message signature:", receivedData);
        alert(JSON.stringify(data));
    };
    const handleGetBalance = (data) => {
        const receivedData = JSON.parse(JSON.stringify(data))
        console.log("Get balance:", receivedData);
        alert(JSON.stringify(data));
    };
    const handleSendTransaction = (data) => {
        const receivedData = JSON.parse(JSON.stringify(data))
        console.log("Send transaction:", receivedData);
        alert(JSON.stringify(data));
    };
    const handleGetBlockNumber = (data) => {
        const receivedData = JSON.parse(JSON.stringify(data))
        console.log("Get block number:", receivedData);
        alert(JSON.stringify(data));
    };
    const handleGetTransactionCount = (data) => {
        const receivedData = JSON.parse(JSON.stringify(data))
        console.log("Get transaction count:", receivedData);
        alert(JSON.stringify(data));
    };
    const handleReadFromContract = (data) => {
        const receivedData = JSON.parse(JSON.stringify(data))
        console.log("Read from contract:", receivedData);
        alert(JSON.stringify(data));
    };
    const handleWriteToContract = (data) => {
        const receivedData = JSON.parse(JSON.stringify(data))
        console.log("Write to contract:", receivedData);
        alert(JSON.stringify(data));
    };
    const handleErrorMessage = (data) => {
        const receivedData = JSON.parse(JSON.stringify(data))
        console.log("Get error message:", receivedData);
        alert(JSON.stringify(data));
    };

    return (
        <div className="bg-[#181818] text-white ">
            <div className="flex justify-around items-center mx-40">
                <div className='flex flex-col w-[40%]'>
                    <div className='my-4 plainText text-xl'>Get paid by</div>
                    <div className='text-4xl font-bold'>Listing your data</div>
                    <div className='my-4 plainText text-xl'>when someone purchase it</div>
                    {
                        isConnected ? (
                            <button className='bg-orange-600 hover:bg-orange-700 text-white text-xl font-bold mt-4 py-2 px-4 rounded-full mr-4 shadow-md' onClick={listData}>List your data now</button>
                        ) : (
                            <PluralitySocialConnect
                                options={{ apps: 'facebook,twitter' }}
                                onProfileDataReturned={handleProfileDataReturned}
                                onGetAllAccounts={handleGetAllAccounts}
                                onGetConnectedAccount={handleGetConnectedAccount}
                                onGetMessageSignature={handleMessageSignature}
                                onVerifyMessageSignature={handleVerifyMessageSignature}
                                onGetBalance={handleGetBalance}
                                onSendTransaction={handleSendTransaction}
                                onGetBlockNumber={handleGetBlockNumber}
                                onGetTransactionCount={handleGetTransactionCount}
                                onReadFromContract={handleReadFromContract}
                                onWriteToContract={handleWriteToContract}
                                onErrorMessage={handleErrorMessage}
                                //customization={{ height: '200px', width: '500px', initialBackgroundColor: '#E8A123', initialTextColor: '#FFFFFF', flipBackgroundColor: '#12AE83', flipTextColor: '#FFFFFF'}}
                                ref={ref}
                            />
                        )
                    }
                </div>
                <div className="border border-orange-600 rounded-3xl m-8 px-8 py-8  gap-8 w-[60%]">
                    {!isConnected && (
                        <div className='text-center text-orange-600 text-sm font-bold'>please connect the wallet first</div>
                    )}
                    <div className='flex'>
                        <div className="flex flex-col items-center w-1/2">
                            <div className="text-xl font-bold mt-4 underline">Personal details:</div>
                            <div className="text-sm plainText text-red-600 mb-2">(Not to be uploaded)</div>
                            <img src={profileData.profileUrl} alt="" className="w-32 h-32 rounded-full" />
                            <div className="mt-2">Username: <span className="font-bold">{profileData.name}</span></div>
                            <div className="mt-2">Display name: <span className="font-bold">{profileData.displayName}</span></div>
                        </div>
                        <div className="w-1/2">
                            <div className="text-xl font-bold mt-4 underline">User details:</div>
                            <div className="text-sm plainText text-green-600 mb-2">(To be uploaded)</div>
                            <div>Followers: <span className="font-bold">{userData.stats?.followerCount}</span></div>
                            <div className="flex flex-wrap items-center">
                                <div className="mr-4">Interests: </div>
                                {userData.assetData?.map((interest, index) => (
                                    <div key={index} className="text-sm bg-orange-500 rounded-full px-2 mx-2 my-1">{interest}</div>
                                ))}
                            </div>
                            <div>No. of tweets: <span className="font-bold">{userData.stats?.noOfTweets}</span></div>
                            <div>No. of reposts: <span className="font-bold">{userData.stats?.noOfReposts}</span></div>
                            <div>Reputation score: <span className="font-bold">{userData.stats?.reputationScore}</span></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mx-40 mt-28">
                <div className="text-4xl font-bold text-center underline">Steps for listing your data: </div>
                <div className="flex justify-center items-center">
                    <img src={wallet} alt="" className='p-8 h-72 mr-8' />
                    <div className='flex flex-col w-2/3'>
                        <div className='my-4 plainText text-xl'>step 1:</div>
                        <div className='text-4xl font-bold'>Connect to Plurality Network</div>
                        <div className='my-4 plainText text-xl'>to get access to all your profile data from Plurality decentralized wallet</div>
                    </div>
                </div>
                <div className="flex justify-center items-center">
                    <div className='flex flex-col'>
                        <div className='my-4 plainText text-xl'>step 2:</div>
                        <div className='text-4xl font-bold'>List your data</div>
                        <div className='my-4 plainText text-xl'>to our decentralized marketplace contract</div>
                    </div>
                    <img src={upload} alt="" className='p-8 h-72 ml-8' />
                </div>
                <div className="flex justify-center items-center">
                    <img src={payment} alt="" className='p-8 h-72' />
                    <div className='flex flex-col w-2/3'>
                        <div className='my-4 plainText text-xl'>step 3:</div>
                        <div className='text-4xl font-bold'>Get paid</div>
                        <div className='my-4 plainText text-xl'>whenever we find a suitable buyer for the data you listed</div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>

    )
}