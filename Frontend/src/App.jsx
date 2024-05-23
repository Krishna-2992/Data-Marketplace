import PluralitySocialConnect from 'plurality-social-connect';
import { useEffect, useRef, useState } from 'react';
import { ethers } from 'ethers';
import { usdcContractAddress, dataMarketplaceContractAddress, usdcContractAbi, dataMarketplaceContractAbi } from './constants';

const App = () => {
  const childRef = useRef(null);
  const abi = '[{"inputs":[],"name":"retrieve","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"num","type":"uint256"}],"name":"store","outputs":[],"stateMutability":"nonpayable","type":"function"}]';

  const [userData, setUserData] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState(null);
  const [usdcContract, setUsdcContract] = useState(null);
  const [dataMarketplaceContract, setDataMarketplaceContract] = useState(null);


  // Handle the data returned from the widget
  const handleDataReturned = (data) => {
    const receivedData = JSON.parse(JSON.stringify(data))
    // console.log("dapp receives:", receivedData);
    setUserData(receivedData.data[0])
    childRef.current.closeSocialConnectPopup();
    // Handle the received data in the external webpage
    // ... (perform actions with the received data)  
  };

  useEffect(() => {
    getData();
  }, [isConnected])


  const connectToMetamask = async () => {
    console.log('conecting to metamask')
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      await provider.send('eth_requestAccounts', [])

      const signer = provider.getSigner()
      const address = await signer.getAddress()

      console.log('connected account: ', address)

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

  const listData = async () => {
    try {
      console.log('data is listing....')
      console.log('dataMarketplaceContract', dataMarketplaceContract)
      // const data = {
      //   senderAddress: "0x9FBb455A94dF0FD1451ff21541E0fA69C94382C1",
      //   interests: "coding, blockchain",
      //   followersCount: 150,
      //   tweetsCount: 200,
      //   repostsCount: 50,
      //   reputationScore: 85
      // };
      // const serializedData = JSON.stringify(data);
      // console.log('serialized version of data is: ', serializedData)
      await dataMarketplaceContract.listData(
        "health_statistics, fitness",
        61,
        10,
        5,
        301
      )
      // await dataMarketplaceContract.listData(
      //   "financial_reports, stock_prices",
      //   2000,
      //   12,
      //   6,
      //   450
      // )
      // await dataMarketplaceContract.listData(
      //   "social_media_trends, influencers",
      //   180,
      //   8,
      //   4,
      //   350
      // )
      // await dataMarketplaceContract.listData(
      //   "weather_data, climate_patterns",
      //   1300,
      //   9,
      //   5,
      //   280
      // )
      // await dataMarketplaceContract.listData(
      //   "ecommerce_sales, market_analysis",
      //   2200,
      //   15,
      //   7,
      //   500
      // )
      // await dataMarketplaceContract.listData(
      //   "real_estate_listings, property_values",
      //   170,
      //   11,
      //   6,
      //   390
      // )
      // await dataMarketplaceContract.listData(
      //   "automotive_industry, car_sales",
      //   140,
      //   7,
      //   3,
      //   320
      // )
      // await dataMarketplaceContract.listData(
      //   "tech_innovations, startup_data",
      //   10,
      //   10,
      //   5,
      //   360
      // )
      // await dataMarketplaceContract.listData(
      //   "travel_destinations, tourist_data",
      //   70,
      //   13,
      //   6,
      //   420
      // )
      // await dataMarketplaceContract.listData(
      //   "gaming_statistics, player_data",
      //   210,
      //   14,
      //   7,
      //   480
      // )

      console.log('data listed successfully')
    } catch (error) {
      console.log('💥💥💥💥', error)
    }
  }

  const getListingsCount = async () => {
    try {
      console.log("getlistingcount called")
      const data0 = await dataMarketplaceContract.getNumberOfFollowers(0)
      const data1 = await dataMarketplaceContract.getNumberOfFollowers(1)
      const data2 = await dataMarketplaceContract.getNumberOfFollowers(2)
      console.log("number of listings in category 0: ", data0)
      console.log("number of listings in category 1: ", data1)
      console.log("number of listings in category 2: ", data2)
    } catch (error) {
      console.log('💥💥💥💥', error)
    }
  }

  const getData = () => {
    console.log('user data', userData)
  }

  const getSellersList = async () => {
    console.log('sellers list invoked')
    const sellers = await dataMarketplaceContract.oneTo100Followers(1)
    console.log('sellers: ', sellers)
  }

  const approve = async () => {
    console.log("approving tokens to the user")
    const amount = await ethers.utils.parseEther('20000')
    await usdcContract.mint(amount)
    await usdcContract.approve(dataMarketplaceContractAddress, amount)
    console.log('usdc tokens minted and the dm approved!!')
  }

  const checkBalance = async () => {
    const sellerAddress = '0x9FBb455A94dF0FD1451ff21541E0fA69C94382C1'
    const balance = await usdcContract.balanceOf(dataMarketplaceContractAddress)
    console.log('seller balance = ', ethers.utils.formatEther(balance))
  }
  const checkApproval = async () => {
    const buyerAddress = "0x2DAe7be736dc64a6816B2ba09bcC8Dd7A143D623"
    const allowance = await usdcContract.allowance(buyerAddress, dataMarketplaceContractAddress)
    console.log('allowance by buyer to dm: ', ethers.utils.formatEther(allowance))
  }

  const buyData = async () => {
    console.log("buying data")
    const data = await dataMarketplaceContract.buyData(0)
    console.log('data bought: ', data)
  }


  return (
    <div>
      <div>
        <h1 className='text-red-300'>Social Connect Integration</h1>
        <PluralitySocialConnect
          options={{ apps: 'facebook,twitter' }}
          onDataReturned={handleDataReturned}
          // all customization params are optional
          // customization={{ height: '200px', width: '500px', initialBackgroundColor: '#E8A123', initialTextColor: '#FFFFFF', flipBackgroundColor: '#12AE83', flipTextColor: '#FFFFFF'}}
          ref={childRef}
        />
      </div>
      <div className='flex flex-col justify-center w-full'>
        <button onClick={connectToMetamask}>01_Connect wallet</button>
        <button onClick={listData}>02_Submit user data to the blockchain</button>
        <button onClick={getListingsCount}>03_get the number of listings</button>
        <button onClick={getSellersList}>04_get 00-100 sellers address</button>
        <button onClick={approve}>05_approve usdc tokens</button>
        <button onClick={checkBalance}>check seller balance</button>
        <button onClick={checkApproval}>check buyer dm allowance</button>
        <button onClick={buyData}>06_buy data</button>
      </div>
      {/* <div>
        <h2>Web3 Functions</h2>
        <button onClick={() => PluralitySocialConnect.getAllAccounts()}>Get All Accounts</button>
        <br />
        <button onClick={() => PluralitySocialConnect.getConnectedAccount()}>Get Connected Account</button>
        <br />
        <button onClick={() => PluralitySocialConnect.getMessageSignature("Example `personal_sign` message.")}>Sign Message</button>
        <br />
        <button onClick={() => PluralitySocialConnect.verifyMessageSignature("Example `personal_sign` message.", "0x07b40368006723c01de407156ee0311a5b6b94d698145ae2ed0b903cfae61de23a2b5b0c8501cdda83c7e07a3fd26812ba38bebd91abbd96d5e7d5acd510505d1b")}>Verify Message</button>
        <br />
        <button onClick={() => PluralitySocialConnect.getBalance()}>Get Balance</button>
        <br />
        <button onClick={() => PluralitySocialConnect.sendTransaction("0xe613B4cd69Fe20E8bd0F0D79a264210886bA1AA2", "0.01")}>Send Transaction</button>
        <br />
        <button onClick={() => PluralitySocialConnect.getBlockNumber()}>Get Block Number</button>
        <br />
        <button onClick={() => PluralitySocialConnect.getTransactionCount("0xe613B4cd69Fe20E8bd0F0D79a264210886bA1AA2")}>Get Transaction count</button>
        <br />
        <button onClick={() => PluralitySocialConnect.readFromContract("0x8E26aa0b6c7A396C92237C6a87cCD6271F67f937", abi, "retrieve")}>Read Contract</button>
        <br />
        <button onClick={() => PluralitySocialConnect.writeToContract("0x8E26aa0b6c7A396C92237C6a87cCD6271F67f937", abi, "store", "5")}>Write Contract</button>
        <br />
        <button onClick={connectToMetamask}>Connect wallet</button>

      </div> */}

    </div>
  );
};
export default App;