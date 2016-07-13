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
 * ### profile
 * Retrieves the current users (or another users) profile data
 *
 * @param data
 *
 *  {
 * 	userId: "THE_USER_ID_WHOM_DATA_WE_WANNA_FETCH"		//Optional - If undefined, we will fetch the data of the current token user /me
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
export async function profile(data) {
	let response = null;
	if(data && data.userId){	//if the data object contains a userId 
		response = await PavUtils._fetch(   
		PavUtils.getBaseUrl()+PavUtils.sPrintf(ENDPOINTS.USER.PROFILE,data.userId),	//then form the url to contain that userId
		'GET', 	//method
		null, 	//body (data) - not needed in this call 
		{accept: [200,201], reject:[400,401,404]}, 	//responseCodes (the ones we accept and the ones we reject)
		{user_id: data.userId}, //additional items to add within the header
		true);	//declare that the token IS nessecary for this call, so if there isn't one we will throw an error.
	}else{						//if we got NO userId	
		response = await PavUtils._fetch(   
		PavUtils.getBaseUrl()+PavUtils.sPrintf(ENDPOINTS.USER.PROFILE,'me'),	//then form the url to contain the 'me' keyword
		'GET',	//method
		null, 	//body (data) - not needed in this call 
		{accept: [200,201], reject:[400,401,404]},	//responseCodes (the ones we accept and the ones we reject)
		null,	//additional items to add within the header
		true);	//declare that the token IS nessecary for this call, so if there isn't one we will throw an error.
	}
	return response;
}


/**
 * ### timeline
 * Retrieves the current users (or another users) recent activity (timeline) data
 *
 * @param data
 *
 *  {
 * 	userId: "THE_USER_ID_WHOM_DATA_WE_WANNA_FETCH"		//Optional - If undefined, we will fetch the data of the current token user /me
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
export async function timeline(data) {
	let response = null;
	let from = (data.from!=null)? "?from="+data.from:"";
	if(data && data.userId){	//if the data object contains a userId 
		response = await PavUtils._fetch(   
		PavUtils.getBaseUrl()+PavUtils.sPrintf(ENDPOINTS.USER.TIMELINE,data.userId)+from,	//then form the url to contain that userId
		'GET', null, {accept: [200,201], reject:[400,401,404]}, {user_id: data.userId}, true);
	}else{						//if we got NO userId	
		response = await PavUtils._fetch(   
		PavUtils.getBaseUrl()+PavUtils.sPrintf(ENDPOINTS.USER.TIMELINE,'me')+from,	//then form the url to contain the 'me' keyword
		'GET',null, {accept: [200,201], reject:[400,401,404]}, null, true);
	}
	return response;
}





/**
 * ### followUser
 *  Follows the user with the current userId
 *
 * @param data
 *
 *  {
 * 	userId: "THE_USER_ID_WHO_WE_WISH_TO_FOLLOW"	
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
export async function followUser(data) {
    PavUtils.checkThatDataExistsAndNotNull([  //check that the data provided is valid
    {data: data, errorSpec: "not be null or undefined"},
    {data: data.userId, errorSpec: "contain a user id to follow"},
    ], "followUser");
	let response = null;
	if(data && data.userId){	//if the data object contains a userId 
		response = await PavUtils._fetch(   
		PavUtils.getBaseUrl()+ENDPOINTS.USER.FOLLOW,	//then form the url to contain that userId
      	'PUT', {
    		user_id: data.userId,
    	},
  		{accept: [200,201], reject:[400,401,404]}, null, true);
	}
	return response;
}







/**
 * ### unfollowUser
 *  Unfollows the user with the current userId
 *
 * @param data
 *
 *  {
 * 	userId: "THE_USER_ID_WHO_WE_WISH_TO_FOLLOW"	
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
export async function unfollowUser(data) {
    PavUtils.checkThatDataExistsAndNotNull([  //check that the data provided is valid
    {data: data, errorSpec: "not be null or undefined"},
    {data: data.userId, errorSpec: "contain a user id to follow"},
    ], "followUser");
	let response = null;
	if(data && data.userId){	//if the data object contains a userId 
		response = await PavUtils._fetch(   
		PavUtils.getBaseUrl()+ENDPOINTS.USER.UNFOLLOW,	//then form the url to contain that userId
      	'DELETE', {
    		user_id: data.userId,
    	},
  		{accept: [200,201,204], reject:[400,401,404]}, null, true);
	}
	return response;
}







