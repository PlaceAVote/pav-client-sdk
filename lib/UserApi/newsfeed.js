/**
 * # newsfeed.js
 *
 * The News Feed  class is responsible for all the user authentication calls.
 * 
 *
 */
'use strict';
/**
 * ## Async support
 *
 */
require('regenerator/runtime');

import * as PavUtils from '../PavUtils';



const {
  ENDPOINTS
}  = require('../../config').PAV_BACKEND;



/**
 * ### feed
 * Retrieves the users feed data
 *
 * @param data
 *
 *  {
 * 	fromTimestamp: "1460304950157", 	//Optional - if you want to get the feed from that timestamp and ONwards (Last Known Timestamp)
 *	}
 *
 * @returns an object with the signature
     {
      data: Object (the data we got from the server)
      error: An array of errors if there were any
    }

  @throws Error if something really evil takes place, like issuing a wrong request
 *
 */
export async function feed(data) {
	let response = null;
	if(!!data && !!data.fromTimestamp){	//if the data object contains a fromTimestamp 
		response = await PavUtils._fetch(   
		PavUtils.getBaseUrl()+ENDPOINTS.USER.FEED+"?from="+data.fromTimestamp,	//then form the url to contain that fromTimestamp
		'GET', null, {accept: [200,201], reject:[400,401,404]}, null, true);
	}else{
		response = await PavUtils._fetch(   
		PavUtils.getBaseUrl()+ENDPOINTS.USER.FEED,
		'GET', null, {accept: [200,201], reject:[400,401,404]}, null, true);
	}
	return response;
}





