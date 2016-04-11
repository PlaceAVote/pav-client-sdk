
import assert from 'assert';




export function setToken(token){
  this.sessionToken = token;
}
export function revokeToken(){
  this.sessionToken = null;
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
      assert(data, "PavClient."+callerMethodName+" credentials should "+errorSpec+".");
    }  
  }
}



/*

This is our custom fetch function. It prepares the properties before it passes
it to the real fetch function, and parses the result before it returns it.
@param url the url we'll be using to request
@method the method, 'POST', 'GET', 'PUT' you name it.
@data The body we will be attaching to our request
@responseCodes (An object that contains 2 arrays, one named accept which contains the accept codes, one named reject, which contains the reject codes)
*/
export async function  _fetch(url, method, data, responseCodes){
  console.log("Http Request to: "+url);
  try {
    var response = await fetch(
      url,
      this.prepareFetchProperties(method, data)
    );
    console.log("About to parse now.")
    if(!!responseCodes){
      return await this.parseResponseDependingOnItsStatusCode(response, responseCodes.accept, responseCodes.reject);  
    }else{
      return await this.parseResponseDependingOnItsStatusCode(response);
    }
  } catch(error) {
    // Do something on fetch error
    console.error("PavClient :: login fetch error: "+error.message);
  }

}



export function prepareFetchProperties(method, body, token){
  var reqOpts = {
    method: method,
    headers:{},
    body:null
  };
  var tok = token || this.sessionToken;
  if (!!tok) {
    console.log("Found token: "+tok);
    reqOpts.headers['Authorization'] = 'Bearer ' + tok;
  }

  if (method === 'POST' || method === 'PUT') {
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
  for (var i=0;i<acceptStatusCodes.length;i++){
    if(statusCode==acceptStatusCodes[i]){  //if the status is one of the accept response statuses
      res.data = await response.json()
      return res;
    }
  }
  for (var o=0;o<rejectStatusCodes.length;o++){
    if(statusCode==rejectStatusCodes[o]){  //if the status is one of the reject response statuses
      var errorRes = null;
      let responseType = response.headers.get("content-type").toLowerCase();
      console.log("RESPONSE type: "+responseType);
      if(responseType.indexOf("application/json") >= 0){
        let json = await response.json();

        if(!!json.errors){
          res.multipleErrors = true;
          errorRes = json.errors;
        }else{
          res.multipleErrors = false;
          errorRes = json.error;
        }
      }else{
        res.multipleErrors = false;
        errorRes = await response.text();
      }
      console.log("Fail response: "+errorRes)
      res.error=errorRes;
      return res;
    }
  }
  console.log("Unknown response code: "+statusCode);
  throw("Status code in response: "+statusCode+" could not be found within our defined accept "+acceptStatusCodes+" or reject "+rejectStatusCodes+" status codes, resulting in response: "+response);  // since the status code was neither an accept status code, or a reject status code, we assume that there was an unexpected error and throw it
}
