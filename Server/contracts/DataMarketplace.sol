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

    // there must be a mapping of the data of each seller
    mapping(address => string) public dataOf;

    // make the array in order to achieve the categorization on the basis of followers(1-100, 100-1000, 1000+)
    address[] public oneTo100Followers;
    address[] public hundredTo1000Followers;
    address[] public moreThan1000Followers;

    // here we are creating a mapping which will be set to the 10
    // here instead of just storing weather a buyer is eligible or not, we are storing the timestamp upto
    // which he would be eligible to access the data(i.e. 10 minutes from the payment)
    mapping(address => uint256) public buyer0AccessibleTill;
    mapping(address => uint256) public buyer1AccessibleTill;
    mapping(address => uint256) public buyer2AccessibleTill;

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

    function listData(uint256 _followersCount, string memory userData) public {
        // make a new data of the seller
        // map it to the seller
        dataOf[msg.sender] = userData;
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
        // here we are supposed to copy a complete mapping of the buyers and respond based on it
        address[] memory sellerData;
        if (_followerCategory == 0) {
            sellerData = oneTo100Followers;
        } else if (_followerCategory == 1) {
            sellerData = hundredTo1000Followers;
        } else if (_followerCategory == 2) {
            sellerData = moreThan1000Followers;
        }

        // from 0-100
        // usdc charged would depend on the number of sellers and the category of the followers
        uint256 followerCategoryRate = getFollowerCategoryRate(
            _followerCategory
        );
        uint256 dataPrice = sellerData.length * followerCategoryRate;
        uint256 commission = (dataPrice * 5) / 100;
        uint256 totalPrice = dataPrice + commission;

        // transfer this much usdc from buyer's account to this account
        USDCtoken.transferFrom(msg.sender, address(this), totalPrice);

        // transfer usdc from this account to all the buyers account
        for (uint i = 0; i < sellerData.length; i++) {
            USDCtoken.transfer(sellerData[i], 10 ** 16);
        }
        // Now this buyer will be eligible to access the data for next 15 minutes
        if (_followerCategory == 0) {
            buyer0AccessibleTill[msg.sender] = block.timestamp + 900;
        } else if (_followerCategory == 1) {
            buyer1AccessibleTill[msg.sender] = block.timestamp + 900;
        } else if (_followerCategory == 2) {
            buyer2AccessibleTill[msg.sender] = block.timestamp + 900;
        }
    }

    function getString() public pure returns (string memory) {
        return "a random string!!!/";
    }

    function getStringArray() public pure returns (string[] memory) {
        string[] memory array = new string[](3);
        array[0] = "krishna";
        array[1] = "agrawal";
        array[2] = "shreyash";
        return array;
    }

    function getFollowerCategoryData(
        uint256 _followerCategory
    ) public view returns (string[] memory) {
        address[] memory sellerData;
        if (_followerCategory == 0) {
            require(
                buyer0AccessibleTill[msg.sender] > block.timestamp,
                "Data access denied!!"
            );
            sellerData = oneTo100Followers;
        } else if (_followerCategory == 1) {
            require(
                buyer1AccessibleTill[msg.sender] > block.timestamp,
                "Data access denied!!"
            );
            sellerData = hundredTo1000Followers;
        } else if (_followerCategory == 2) {
            require(
                buyer2AccessibleTill[msg.sender] > block.timestamp,
                "Data access denied!!"
            );
            sellerData = moreThan1000Followers;
        }
        uint256 arrayLength = sellerData.length;
        string[] memory array = new string[](arrayLength);
        for (uint i = 0; i < arrayLength; i++) {
            array[i] = dataOf[sellerData[i]];
        }
        return array;
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

    function getDataOf(address _seller) public view returns (string memory) {
        return dataOf[_seller];
    }

    function getFollowerCategoryRate(
        uint _category
    ) public pure returns (uint256) {
        if (_category == 0) {
            return 10 ** 16;
        } else if (_category == 1) {
            return 10 ** 17;
        } else if (_category == 2) {
            return 10 ** 18;
        }
        return 0;
    }
}
