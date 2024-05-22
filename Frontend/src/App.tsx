import PluralitySocialConnect from 'plurality-social-connect';
import { useRef, useState } from 'react';
import { ethers } from 'ethers';

const App = () => {
  const childRef: any = useRef(null);
  const abi = '[{"inputs":[],"name":"retrieve","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"num","type":"uint256"}],"name":"store","outputs":[],"stateMutability":"nonpayable","type":"function"}]';
  const [userData, setUserData] = useState(null);

  // Handle the data returned from the widget
  const handleDataReturned = (data: any) => {
    const receivedData = JSON.parse(JSON.stringify(data))
    console.log("dapp receives:", receivedData);
    setUserData(receivedData.data[0])
    childRef.current.closeSocialConnectPopup();
    // Handle the received data in the external webpage
    // ... (perform actions with the received data)  
  };

  const connectWallet = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    console.log('signer', signer)
  }

  const getData = () => {
    console.log('user data', userData)
  }
  getData()

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
      <div>
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

      </div>

    </div>
  );
};
export default App;