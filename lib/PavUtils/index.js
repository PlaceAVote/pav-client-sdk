
import assert from 'assert';
import sprintf from './sprintf'


const {
  API_BASE_URL,
  DEV_API_BASE_URL
}  = require('../../config').PAV_BACKEND;




export function setToken(token){
  this.sessionToken = token;
}
export function revokeToken(){
  this.sessionToken = null;
}

export function setEnvironmentIsDev(isDevEnvironment){
  this.isDev = isDevEnvironment;
}

export function getBaseUrl(){
  return this.isDev?DEV_API_BASE_URL:API_BASE_URL;
}

/*
  This function asserts our data (checks to see if they are null or undefined, otherwise dispatches the appropriate error msg)
  @param dataArray An array that contains the data we will be asserting, and a errorSpec to output the correct error message.
  @param callerMethodName The name for the specific process that calls the function (will be used for better error messages)
*/
export function checkThatDataExistsAndNotNull(dataArray, callerMethodName){
  if(!!dataArray && dataArray.length>0){
    for (var i=0;i<dataArray.length;i++){ //iterate through each one of the objects, and assert them
      let {data, errorSpec} = dataArray[i];
      assert((data!=null), "PavClient."+callerMethodName+" credentials should "+errorSpec+".");
    }  
  }
}



/*
* A custom and much faster version of the javascript sPrintf
* @param {String} formatter A format string.
 * @param {...String} var_args Values that will be formatted by %s and %j.
 * @return {String} The formatted output.
*/
export function sPrintf(formatter, var_args){
  return sprintf(formatter, var_args);
}


/*

This is our custom fetch function. It prepares the properties before it passes
it to the real fetch function, and parses the result before it returns it.
@param url the url we'll be using to request
@param method the method, 'POST', 'GET', 'PUT' you name it.
@param data The body we will be attaching to our request
@param responseCodes (An object that contains 2 arrays, one named accept which contains the accept codes, one named reject, which contains the reject codes)
@param additionalHeaderItems Object whos keys and values we want to add within our headers object {key:value}
*/
export async function  _fetch(url, method, data, responseCodes, additionalHeaderItems = null, tokenNessecaryForThisCall = false){
  console.log(method+"Http Request to: "+url);
  var response;
  try {
    response = await fetch(
      url,
      this.prepareFetchProperties(method, data, (data&&data.token)?data.token:null, additionalHeaderItems, tokenNessecaryForThisCall)
    );
  } catch(error) {
    // Do something on fetch error
    console.error("PavClient :: "+url+" fetch error: "+error.message);
  }

  if(!!responseCodes){  //About to parse response now.
    return await this.parseResponseDependingOnItsStatusCode(response, responseCodes.accept, responseCodes.reject);  
  }else{  //No response codes, we assume the default ones
    return await this.parseResponseDependingOnItsStatusCode(response);
  }

}



export function prepareFetchProperties(method, body, token, additionalHeaderItems, tokenNessecaryForThisCall){
  var reqOpts = {
    method: method,
    headers:{},
    body:null
  };

  var tok = token || this.sessionToken;
  if (!!tok && tokenNessecaryForThisCall==true) { //if the token is nessecary and we HAVE a token
    // console.log("@@@ Found token: "+tok);
    reqOpts.headers['Authorization'] = 'PAV_AUTH_TOKEN ' + tok;
  }else if(!tok && tokenNessecaryForThisCall==true){  //if the token is nessecary and we have NO token
    throw new Error("Token nessecary but not found. We cannot call this endpoint if you don't pass a token through the PAVBackend constructor.")
  }

  if(!!additionalHeaderItems){
    // console.log(JSON.stringify(reqOpts.headers)+ "BEFORE");
    Object.assign(reqOpts.headers, additionalHeaderItems);
  }

  if (method === 'POST' || method === 'PUT' || method ==='DELETE') {
    reqOpts.headers['Accept'] = 'application/json';
    reqOpts.headers['Content-Type'] = 'application/json';
  }

  if (!!body) {
    reqOpts.body = JSON.stringify(body);
  }
  // console.log("Request options: "+JSON.stringify(reqOpts));
  return reqOpts;
}




/*
Checks the status code of the response,
returns an object that containts the properties `data` and `error`.
  if its one of the acceptStatusCodes it turns the response in a json and places it in the `data` property
  if its one of the rejectStatusCodes it places the response in the `error` property
  otherwise if the status code is something totally different we assume an error occured and throw it.
*/
export async function parseResponseDependingOnItsStatusCode(response, acceptStatusCodes = [200,201], rejectStatusCodes = [400,401]){

  let statusCode = response.status;
  var res = {
    statusCode: statusCode,
    data: null,
    error: null,
    multipleErrors: false
  }
  // console.log("parseResponseDependingOnItsStatusCode:: response: "+JSON.stringify(response));
  // console.log("Checking amongst the accept codes");
  for (var i=0;i<acceptStatusCodes.length;i++){
    if(statusCode==acceptStatusCodes[i]){  //if the status is one of the accept response statuses
      try{
        res.data = await response.json()
      }catch(e){
        console.log("No response data - or malformed json in response.");//+e.message);
        res.data = {};
      }
      return res;
    }
  }
  // console.log("Checking amongst the reject codes");
  for (var o=0;o<rejectStatusCodes.length;o++){
    if(statusCode==rejectStatusCodes[o]){  //if the status is one of the reject response statuses
      var errorRes = null;
      // console.log("headers "+JSON.stringify(response.headers))
      let responseType = response.headers.get("content-type");
      if(responseType!=null){
        responseType = responseType.toLowerCase()  
      }else{
        responseType = "";
      }
      
      console.log("RESPONSE type: "+responseType);
      if(responseType.indexOf("application/json") >= 0){
        try{
          let json = await response.json();
          if(!!json.errors){
            res.multipleErrors = true;
            errorRes = json.errors;
          }else{
            res.multipleErrors = false;
            errorRes = json.error;
          }  
        }catch(e){
          res.multipleErrors = false;
          errorRes = "The server replied with an undefined error";  
        }
      }else{
        res.multipleErrors = false;
        errorRes = await response.text();
      }
      // console.log("Fail response: "+errorRes)
      res.error=errorRes;
      return res;
    }
  }
  console.log("Unknown response code: "+statusCode);
  throw("Status code in response: "+statusCode+" could not be found within our defined accept "+acceptStatusCodes+" or reject "+rejectStatusCodes+" status codes, resulting in response: "+response);  // since the status code was neither an accept status code, or a reject status code, we assume that there was an unexpected error and throw it
}
