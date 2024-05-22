// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract DataMarketplace {
    ////////////////////////////////
    ///////// Variables ////////////
    ////////////////////////////////

    IERC20 internal USDCtoken;

    // there must be an array of all the sellers
    address[] public sellers;

    // there must be a struct of the data for storing the data of each seller
    struct Data {
        // must contain address, list of interests, followers count, no. of tweets, no. of reposts, reputation score
        address senderAddress;
        string intersets;
        uint256 followersCount;
        uint256 tweetsCount;
        uint256 repostsCount;
        uint256 reputationScore;
    }

    // there must be a mapping of the data of each seller
    mapping(address => Data) public dataOf;

    // make the array in order to achieve the categorization on the basis of followers(1-100, 100-1000, 1000+)
    address[] public oneTo100Followers;
    address[] public hundredTo1000Followers;
    address[] public moreThan1000Followers;

    ////////////////////////////////
    ///////// Functions ////////////
    ////////////////////////////////

    constructor(address _USDCtoken) {
        USDCtoken = IERC20(_USDCtoken);
    }

    /**
     * There must be a function which the seller may invoke in order to list their data
     * this must make a new data of the seller and map it to the seller properly
     * We also need to categorize data on the basis of the followerCount
     */

    function listData(
        string memory _interests,
        uint256 _followersCount,
        uint256 _tweetsCount,
        uint256 _repostsCount,
        uint256 _reputationScore
    ) public {
        // make a new data of the seller
        // map it to the seller
        dataOf[msg.sender] = Data(
            msg.sender,
            _interests,
            _followersCount,
            _tweetsCount,
            _repostsCount,
            _reputationScore
        );
        // Categorization based on followers
        if (_followersCount >= 1 && _followersCount < 100) {
            oneTo100Followers.push(msg.sender);
        } else if (_followersCount >= 100 && _followersCount < 1000) {
            hundredTo1000Followers.push(msg.sender);
        } else if (_followersCount >= 1000) {
            moreThan1000Followers.push(msg.sender);
        }
    }

    // /**
    //  * Define a function to purchase the user data
    //  * @param _followerCategory
    //  * this function must be able to pull the required amount of usdc from the buyer and then return the data back
    //  * if the usdc require fails then this function reverts
    //  * on successful purchase this function must return the data of specified category
    //  * category: 0: 1-100, 1: 100-1000, 2: 1000+
    //  */

    /**
     * Define a function to get the data of the user
     */

    function buyData(uint256 _followerCategory) public {
        if (_followerCategory == 0) {
            // from 0-100
            // usdc charged would depend on the number of sellers and the category of the followers
            // calculate the number of sellers in this range * 10^16
            uint256 dataPrice = oneTo100Followers.length * 10 ** 16;
            uint256 commission = (dataPrice * 5) / 100;
            uint256 totalPrice = dataPrice + commission;
            // transfer this much usdc from buyer's account to this account
            USDCtoken.transferFrom(msg.sender, address(this), totalPrice);
            // transfer usdc from this account to all the buyers account
            for (uint i = 0; i < oneTo100Followers.length; i++) {
                USDCtoken.transfer(oneTo100Followers[i], 10 ** 16);
            }
        }
    }

    ///////////////////////////////////////
    ///////// Getters /////////////////////
    ///////////////////////////////////////
    function getNumberOfFollowers(
        uint256 _followerCategory
    ) public view returns (uint256) {
        if (_followerCategory == 0) {
            return oneTo100Followers.length;
        } else if (_followerCategory == 1) {
            return hundredTo1000Followers.length;
        } else if (_followerCategory == 2) {
            return moreThan1000Followers.length;
        }
        return 0;
    }

    function getDataOf(address _seller) public view returns (Data memory) {
        return dataOf[_seller];
    }
}
