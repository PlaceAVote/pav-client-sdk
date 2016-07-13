/**
 * # profile.js
 *
 * The profile class is responsible for all the user authentication calls.
 * 
 *
 */
'use strict';
/**
 * ## Async support
 *
 */


import * as PavUtils from '../PavUtils';



const {
  ENDPOINTS
}  = require('../../config').PAV_BACKEND;




/**
 * ### getNotifications
 * Retrieves the current users notifications
 *
 * @param lastKnownTimestamp - (Optional) Last known item
 *
 * @returns an object with the signature
     {
      data: Object (the data we got from the server)
      error: An array of errors if there were any
    }

  @throws Error if something really evil takes place, like issuing a wrong request
 *
 */
export async function getNotifications(data) {
	let dt = data || {};

	let fromStr = dt.lastKnownTimestamp!=null? "?from="+dt.lastKnownTimestamp: ""
	let response = await PavUtils._fetch(   
		PavUtils.getBaseUrl()+ENDPOINTS.USER.GET_NOTIFICATIONS+fromStr,	//then form the url to contain that userId
		'GET', 	//method
		null, 	//body (data) - not needed in this call 
		{accept: [200,201], reject:[400,401,404]}, 	//responseCodes (the ones we accept and the ones we reject)
		null, //additional items to add within the header
		true);	//declare that the token IS nessecary for this call, so if there isn't one we will throw an error.
	return response;
}




/**
 * ### markNotificationsRead
 * Marks one or all notifications read
 *
 * @param data
 *
 *  {
 * 	notificationId: "1460304950157", 	//Optional - if you want to mark a specific notification read. (If not provided, all notifications will be marked as read)
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
export async function markNotificationsRead(data) {
	let response = null;
	if(!!data && !!data.notificationId){	//if the data object contains a fromTimestamp 
		response = await PavUtils._fetch(   
		PavUtils.getBaseUrl()+PavUtils.sPrintf(ENDPOINTS.USER.MARK_NOTIFICATIONS_READ_ONE,data.notificationId),	//then form the url to contain that notificationId
		'POST', null, {accept: [200,201], reject:[400,401,404]}, null, true);
	}else{
		response = await PavUtils._fetch(   
		PavUtils.getBaseUrl()+ENDPOINTS.USER.MARK_NOTIFICATIONS_READ_ALL,
		'POST', null, {accept: [200,201], reject:[400,401,404]}, null, true);
	}
	return response;
}



