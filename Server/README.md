# Data Marketplace
## Created for Hack'n Hive Hackathon
### Target sponsor: Plurality network

Project targets to create a platform where users can come and list their data(anonymously) and it can be purchased in bulk by research organizations or any potential buyer. 

The data is shown to the buyer in a descriptive manner 

### Main points to include in project: 
1. Data overview and categorization
    (based on follower count, interests, reputation)
2. Data Presentation to Buyers(Search Filters, Sample datasets, Data packages)
3. **Data Package**: Offer predefined data packages that buyers can purchase. Each package can be described with:
    1. The number of users included.
    2. Average and range of follower counts.
    3. Common interests and tags.
    4. Average reputation score.
    5. Eg: "Influencer Package: 100 users with 1,000-10,000 followers, interests in technology and gaming, average reputation score of 4.5."
4. Data Privacy and Anonymization
5. Payment system(tokenization)



## How the flow goes:
1. User will come to the platform and connect the account using plurality login. 
2. User will list it's data to our platform via an interactive UI
3. This will trigger the smart contract: 
    1. User will have to create the seller account
    2. User's data will be stored in the contract✅
    3. Grouping of this data will be done on the basis of follower count and reputation score✅
    4. The price of the data will be automatically decicded by the smart contract and the seller have to just accept it(b'coz the grouping of the data is taking place) (let's keep a fixed pricing for each category of data)(0.01 usdc for 1-100, 0.05 for 100-1000 and 0.1 for 1000+ per account)
    5. > it might be posible in future to make the individual price for individual data in case the data will be sufficient in itself, eg. the search history, interactions, etc.
    
4. Buyer will see the list of **packages** to purchase for different prices via UI.
    1. They can purchase the data by paying the specified amount of tokens(USDC)

5. The received usdc will be updated on the seller's accounts and 5% part of the tokens would be reserved as the platform charge. 

6. The sellers can claim their tokens anytime they require that. 



## Solidity Code: 
1. Contract DataMarketplace
2. 