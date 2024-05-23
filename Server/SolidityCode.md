# Solidity code for Data marketplace

## Contract DataMarketplace

### Variables
1. Array of sellers
2. Struct of Data
3. mapping from seller to his data
4. 





### Functions
1. **To list the user data**: This function will be invoked by the user who wants to sell his/her data. 
    1. params: the follower count, interests, tweet count, reposts count, reputation
    2. it will add the user address to the sellers list
    3. it will set the mapping of data to be the data of this user
    4. it will push this user's address to the list of followers wherever it falls

2. **To buy the bulk data**
    1. First the buyer will approve the contract address for the required number of usdc tokens 
    2. Once the contract will get approved for that amount of tokens, the contract will automatically invoke this function on the buyer's behalf and the function will get executed. 
    3. this function will pull all the tokens from the user's account and distribute them to all the sellers who fall under that category
    4. then it will get all the data in an array and will return that.

3. Constructor to withdraw the money collected in the contract by the owner

