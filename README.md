# pav-client-sdk


This will soon be all the code we'll ever need to access the PlaceAVote backend api server.



###Install using:

`npm install git+https://b35b7daa8a099d2d00e0cfcb4168d463a4c29e21:x-oauth-basic@github.com/PlaceAVote/pav-client-sdk.git#master --save`

###Use it like so:

    import PavClientSdk from 'pavclient';
    
    PavClientSdk().userApi().login({username:'aUzaName', password: 'aPassw00rtz'});
    
    
    
##Api



####UserApi

| method | parameters (body) | Description | Returns|
|---------------|-------------------------------------------------|--------------------------------------------------------------|-----|
| **login** | {`username`:string, `password`: string} |  This function logs the user in.| {`data`: Object, `error`: Object} |
| **signup** | {`username`:string, `password`: string, `first_name`: string, `last_name`: string, `dob`: string, `zipcode`: string,`gender`: Object, `topics`: Array (of strings) } |  This function logs the user in.| {`data`: Object, `error`: Object} |