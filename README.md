# pav-client-sdk


This will soon be all the code we'll ever need to access the PlaceAVote backend api server.



###Install using:

`npm install git+https://a7ee7e677992613cade67c796347ad55e3a0ab64:x-oauth-basic@github.com/PlaceAVote/pav-client-sdk.git#master --save`

###Use it like so:


    
`PavClientSdk({options}).<anApiName>.<aMethodName>({params});`
    

**Example:**



    import PavClientSdk from 'pavclient';    
    
    
    //Requesting from an endpoint that needs no authorization
    PavClientSdk({isDev:true}).userApi.validateToken({
      token: "A_TOKEN_STRING",
    });
    
    //OR
    //Requesting from an endpoint that NEEDS authorization    
    PavClientSdk({sessionToken:"A_TOKEN_STRING", isDev:false}).billApi.likeComment({isAlreadyLiked:isLiked, billId:"A_BILL_ID", commentId:"A_COMMENT_ID"});


##Available Apis:

In place of the `<anApiName>` you can call one of the apis below:


| A/A| ApiName | 
|--------------|
|1|userApi|
|2|billApi|
|3|searchApi|
|4|voteApi|

    
    
##Available options to pass on the PavClientSdk singleton:


You pass one or more of the above options within an the first parameter of the singleton:

| A/A| Parameters |Type| Explanation |
|--------------|||
|1|`isDev`|Boolean - Optional (Default true)|Indicates wether we should call the `devApi` or the `api`|
|1|`sessionToken`|Boolean|The token that will be used on the authorization headers of whichever method we call. This is a must for methods that require a token|


##Api



####UserApi

In place of the `<aMethodName>` (when using the `userApi`) you can call one of the methods below:

| method | parameters (body) | Description | Returns|
|---------------|-------------------------------------------------|--------------------------------------------------------------|-----|
| **login** | {`username`:string, `password`: string} |  This function logs the user in.| {`data`: Object, `error`: Object} |
| **loginFacebook** | {`fbUserId`:string, `fbAccessToken`: string} |  This function logs a user in using the facebook method.| {`data`: Object, `error`: Object} |
| **signup** | {`username`:string, `password`: string, `first_name`: string, `last_name`: string, `dob`: (millisecond Timestamp) string, `zipcode`: string,`gender`: string, `topics`: Array (of strings) } |  This function signs a new user up using the email method.| {`data`: Object, `error`: Object} |
| **signupFacebook** | {`email`:string, `fbUserId`: string, `fbToken`: string, `fbImgUrl`: string, `firstName`: string, `lastName`: string,`birthday`: (millisecond Timestamp) string, , `zipCode`:string, `topics`: Array (of strings), `gender`:string } |  This function signs a new user up using the facebook method.| {`data`: Object, `error`: Object} |
| **forgotPassword** | {`email`:string} |  This call initiates as forgot password process. An email will be sent to the email provided so that the user gets the link with a token we need to verify he has access to that email address and reset his password.| {`data`: Object, `error`: Object} |
| **validate** | {`email`:string} |  This function lets us know if a user already exists.| {`data`: Object, `error`: Object} |
| **validateToken** | {`token`:string} |  This function lets us if the token we already have is valid or not.| {`data`: Object, `error`: Object} |
| **newIssueResponse** | {`issueId`:string, `response`:string} |  This function posts a new reaction to a user issue, either positive, neutral or negaitve..| {`data`: Object, `error`: Object} |
| **deleteIssueResponse** | {`issueId`:string} |  This function deletes a reaction from a user issue.| {`data`: Object, `error`: Object} |
| **feed** | {`fromTimestamp`: (**optional**) string } |  Retrieves the users feed data| {`data`: Object, `error`: Object} |
| **profile** | {`userId`: (**optional**) string - If we pass a **userId** then we will retrieve that users data, if not we will retrieve **/me** users data. } |  Retrieves the current users (or another users) profile data| {`data`: Object, `error`: Object} |
| **timeline** | {`userId`: (**optional**) string - If we pass a **userId** then we will retrieve that users data, if not we will retrieve **/me** users data. } |  Retrieves the current users (or another users) timeline data| {`data`: Object, `error`: Object} |
| **followUser** | {`userId`: string } |  Follows the user with the provided userId| {`data`: Object, `error`: Object} |
| **unfollowUser** | {`userId`: string } |  Unfollows the user with the provided userId| {`data`: Object, `error`: Object} |
| **createNewIssue** | {`comment`: string, `billId`: (**optional**) string - We pass a bill id if we want to attach this issue to a bill,  `articleUrl`: (**optional**) string -  We pass an articleUrl if we want to attachi this issue to an article. } |  Creates a new issue that will show up on newsfeed data.| {`data`: Object, `error`: Object} |


####BillApi

In place of the `<aMethodName>` (when using the `billApi`) you can call one of the methods below:

| method | parameters (body) | Description | Returns|
|---------------|-------------------------------------------------|--------------------------------------------------------------|-----|
| **getTrendingBills** | - |  Retrieves the current trending bills| {`data`: Object, `error`: Object} |
| **getBillById** | {`billId`: string } |  Retrieves the bill data for the specified `billId` | {`data`: Object, `error`: Object} |
| **getBillCommentsById** | {`billId`: string } |  Retrieves the comments for the specified `billId` | {`data`: Object, `error`: Object} |
| **getBillTopCommentsById** | {`billId`: string } |  Retrieves the TOP comments for the specified `billId` | {`data`: Object, `error`: Object} |
| **commentOnBill** | {`billId`: string, `body`: string (the comment text) } |  Posts a comment under a bill with the `billId` specified. | {`data`: Object, `error`: Object} |
| **commentOnComment** | {`billId`: string, `commentId`: string, `body`: string (the comment text) } |  Posts a comment under a comment that has the specified `commentId` and that is found under the bill with id= `billId`. | {`data`: Object, `error`: Object} |
| **likeComment** | {`billId`: string, `isAlreadyLiked`: bool (if the comment is already liked we will delete it, otherwise we will place a new like), `commentId`: string (the comment text) } |  Likes a comment if unliked, or revokes the like if already liked. | {`data`: Object, `error`: Object} |
| **dislikeComment** | {`billId`: string, `isAlreadyDisliked`: bool (if the comment is already disliked we will delete it, otherwise we will place a new dislike), `commentId`: string (the comment text) } |  Dislikes a comment if not disliked yet, or revokes the dislike if already disliked. | {`data`: Object, `error`: Object} |


####SearchApi

In place of the `<aMethodName>` (when using the `searchApi`) you can call one of the methods below:

| method | parameters (body) | Description | Returns|
|---------------|-------------------------------------------------|--------------------------------------------------------------|-----|
| **searchBillsByTag** | {`tag`: string - This should be one of the known pav topics, in a comma seperated list within a STRING value e.g. "Education,Drugs" |  Retrieves the bills that belong to the specific tag| {`data`: Object, `error`: Object} |
| **searchBillsByTerm** | {`term`: string - This should be a string value of a search term  e.g. "Gun prohibition" |  Retrieves the bills that match the specific search term| {`data`: Object, `error`: Object} |



####VoteApi

In place of the `<aMethodName>` (when using the `voteApi`) you can call one of the methods below:

| method | parameters (body) | Description | Returns|
|---------------|-------------------------------------------------|--------------------------------------------------------------|-----|
| **voteOnBill** | {`vote`: bool - This represents wether the user is voting for or against a bill (**true** is for, **false** is against), `billId`: string - The bill we will be voting on |  Allows the user to cast a vote on a bill| {`data`: Object, `error`: Object} |


