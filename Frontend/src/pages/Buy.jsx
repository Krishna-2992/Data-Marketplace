import buyData from '../assets/buyData.png'
import newbie from '../assets/newbie.png'
import decent from '../assets/decent.png'
import influencer from '../assets/influencer.png'

import mint from '../assets/mint.png'
import approve from '../assets/approve.png'
import buy from '../assets/buy.png'

import { useContext, useRef } from 'react'
import UserContext from '../context/userContext'
import PluralitySocialConnect from 'plurality-social-connect';

export default function Buy() {

    const data = {
        userName: 'krishnaagr2992',
        displayName: 'Krishna Agrawal',
        profilePic: 'https://avatars.githubusercontent.com/u/68681751?v=4',
        followerCount: 35,
        interests: ['Data Science', "Crypto", "news", "entertainment", "music"],
        noOfTweets: 8,
        noOfReposts: 3,
        reputationScore: 82
    }

    const {
        userData,
        mintAndApprove,
        isConnected,
        childRef,
        handleProfileDataReturned,
        listData,
        handleBuyGroupedData,
        checkApproval
    } = useContext(UserContext)

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
        <div className='bg-[#181818] text-white'>
            <div className='flex justify-around items-center mx-40'>
                <div className='flex flex-col w-[40%]'>
                    <div className='my-4 plainText text-xl'>Get the data by</div>
                    <div className='text-4xl font-bold'>Buying group data</div>
                    <div className='my-4 plainText text-xl'>of quality data sellers </div>
                    <button className='bg-orange-600 hover:bg-orange-700 text-white text-xl font-bold mt-4 py-2 px-4 rounded-full mr-4 shadow-md' onClick={() => window.scrollTo({ top: document.getElementById('listings').offsetTop, behavior: 'smooth' })}>Check Listings</button>
                </div>
                <img src={buyData} alt="" className='w-[50%]' />
            </div>

            <div className='mx-40 bg-[#242424] rounded-3xl mt-20 p-8'>
                <div className='text-2xl font-bold text-center underline'>Sample Data</div>
                <div className='flex justify-around items-center my-8'>
                    <div>
                        <div>Followers: <span className="font-bold">{data.followerCount}</span></div>
                        <div>Interests: </div>
                        <div >
                            {data.interests.map((interest, index) => (
                                <div key={index} className='text-xs ml-4'>{interest}</div>
                            ))}
                        </div>
                        <div>No. of tweets: <span className="font-bold">{data.noOfTweets}</span></div>
                        <div>No. of reposts: <span className="font-bold">{data.noOfReposts}</span></div>
                        <div>Reputation score: <span className="font-bold">{data.reputationScore}</span></div>
                    </div>
                    <div>
                        <div>Followers: <span className="font-bold">{data.followerCount}</span></div>
                        <div>Interests: </div>
                        <div >
                            {data.interests.map((interest, index) => (
                                <div key={index} className='text-xs ml-4'>{interest}</div>
                            ))}
                        </div>
                        <div>No. of tweets: <span className="font-bold">{data.noOfTweets}</span></div>
                        <div>No. of reposts: <span className="font-bold">{data.noOfReposts}</span></div>
                        <div>Reputation score: <span className="font-bold">{data.reputationScore}</span></div>
                    </div>
                    <div>
                        <div>Followers: <span className="font-bold">{data.followerCount}</span></div>
                        <div>Interests: </div>
                        <div >
                            {data.interests.map((interest, index) => (
                                <div key={index} className='text-xs ml-4'>{interest}</div>
                            ))}
                        </div>
                        <div>No. of tweets: <span className="font-bold">{data.noOfTweets}</span></div>
                        <div>No. of reposts: <span className="font-bold">{data.noOfReposts}</span></div>
                        <div>Reputation score: <span className="font-bold">{data.reputationScore}</span></div>
                    </div>
                    <div>
                        <div>Followers: <span className="font-bold">{data.followerCount}</span></div>
                        <div>Interests: </div>
                        <div >
                            {data.interests.map((interest, index) => (
                                <div key={index} className='text-xs ml-4'>{interest}</div>
                            ))}
                        </div>
                        <div>No. of tweets: <span className="font-bold">{data.noOfTweets}</span></div>
                        <div>No. of reposts: <span className="font-bold">{data.noOfReposts}</span></div>
                        <div>Reputation score: <span className="font-bold">{data.reputationScore}</span></div>
                    </div>
                    <div>
                        ...and many more
                    </div>
                </div>
            </div>

            <div className='mx-40' id="listings">
                <div className='text-4xl font-bold mt-32 underline text-center'>Explore Listings: </div>
                <div className='flex justify-around'>
                    <div className='flex flex-col items-center gap-2 border border-orange-600 rounded-3xl m-8 px-8 py-8 w-1/3 hover:border-white'>
                        <img src={newbie} alt="" />
                        <div>1-99 followers</div>
                        <div>Number of listings: 10</div>
                        <div>Rate: 0.01 USDC/listing</div>
                        {
                            isConnected ? (
                                <button className='border border-orange-600 text-orange-700 font-bold py-2 px-4 rounded-full hover:border-orange-500 hover:text-orange-500' onClick={() => handleBuyGroupedData(0)}>Buy Grouped data</button>
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
                                    ref={childRef}
                                />
                            )
                        }
                        <div className='text-xs text-yellow-500 text-center'>First you will be redirected to mint and approve the tokens to our Marketplace</div>
                    </div>
                    <div className='flex flex-col items-center gap-2 border border-orange-600 rounded-3xl m-8 px-8 py-8 w-1/3 hover:border-white'>
                        <img src={decent} alt="" />
                        <div>100-999 followers</div>
                        <div>Number of listings: 23</div>
                        <div>Rate: 0.1 USDC/listing</div>
                        {
                            isConnected ? (
                                <button className='border border-orange-600 text-orange-700 font-bold py-2 px-4 rounded-full hover:border-orange-500 hover:text-orange-500' onClick={() => handleBuyGroupedData(1)}>Buy Grouped data</button>
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
                                    ref={childRef}
                                />
                            )
                        }
                        <div className='text-xs text-yellow-500 text-center'>First you will be redirected to mint and approve the tokens to our Marketplace</div>
                    </div>
                    <div className='flex flex-col items-center gap-2 border border-orange-600 rounded-3xl m-8 px-8 py-8 w-1/3 hover:border-white'>
                        <img src={influencer} alt="" />
                        <div>1000+ followers</div>
                        <div>Number of listings: 6</div>
                        <div>Rate: 1 USDC/listing</div>
                        {
                            isConnected ? (
                                <button className='border border-orange-600 text-orange-700 font-bold py-2 px-4 rounded-full hover:border-orange-500 hover:text-orange-500' onClick={() => handleBuyGroupedData(2)}>Buy Grouped data</button>
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
                                    ref={childRef}
                                />
                            )
                        }
                        <div className='text-xs text-yellow-500 text-center'>First you will be redirected to mint and approve the tokens to our Marketplace</div>
                    </div>
                </div>
            </div>

            <div className="mx-40 mt-28">
                <div className="text-4xl font-bold text-center underline">Steps for Buying the data: </div>
                <div className="flex justify-center items-center">
                    <img src={mint} alt="" className='p-8 h-72 mr-8' />
                    <div className='flex flex-col w-2/3'>
                        <div className='my-4 plainText text-xl'>step 1:</div>
                        <div className='text-4xl font-bold'>Mint USDC tokens</div>
                        <div className='my-4 plainText text-xl'>required to pay for the data you want to buy</div>
                    </div>
                </div>
                <div className="flex justify-center items-center">
                    <div className='flex flex-col'>
                        <div className='my-4 plainText text-xl'>step 2:</div>
                        <div className='text-4xl font-bold'>Approve the tokens</div>
                        <div className='my-4 plainText text-xl'>to our decentralized marketplace contract</div>
                    </div>
                    <img src={approve} alt="" className='p-8 h-72 ml-8' />
                </div>
                <div className="flex justify-center items-center">
                    <img src={buy} alt="" className='p-8 h-72' />
                    <div className='flex flex-col w-2/3'>
                        <div className='my-4 plainText text-xl'>step 3:</div>
                        <div className='text-4xl font-bold'>Buy the grouped data</div>
                        <div className='my-4 plainText text-xl'>to access all the user data under that specific category</div>
                    </div>
                </div>
            </div>

            <div className="mx-40 py-28 text-center">
                <div className="text-4xl font-bold text-center underline">Mint & Approve  </div>
                <div className='mt-4 '>First you need to mint and approve the tokens to our Marketplace</div>
                <div className='text-sm plainText text-yellow-500'>(We have our own USDC ERC20 token contract)</div>
                <button className='bg-orange-600 hover:bg-orange-700 text-white text-xl font-bold mt-4 py-2 px-4 rounded-full mr-4 shadow-md' onClick={mintAndApprove}>Mint & Approve 100 USDC</button>
            </div>
        </div>
    )
}