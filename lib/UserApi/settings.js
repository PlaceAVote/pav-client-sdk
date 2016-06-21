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
require('regenerator/runtime');

import * as PavUtils from '../PavUtils';



const {
  ENDPOINTS
}  = require('../../config').PAV_BACKEND;








/**
 * ### getSettings
 *  Get the current user settings
 *
 * @returns an object with the signature
     {
      data: Object (the data we got from the server)
      error: An array of errors if there were any
    }

  @throws Error if something really evil takes place, like issuing a wrong request
 *
 */
export async function getSettings() {
	let response = await PavUtils._fetch(
	PavUtils.getBaseUrl()+ENDPOINTS.USER.SETTINGS,
  	'GET', null, {accept: [200,201,204], reject:[400,401,404]}, null, true);
	return response;
}



/**
 * ### setSettings
 *  Get the current user settings
 *
 * @returns an object with the signature
     {
      data: Object (the data we got from the server)
      error: An array of errors if there were any
    }

  @throws Error if something really evil takes place, like issuing a wrong request
 *
 */
export async function setSettings(data) {
	
	let newSettings = {};
	if(data.email){newSettings.email=data.email}
	if(data.firstName){newSettings.first_name=data.firstName}
	if(data.lastName){newSettings.last_name=data.lastName}
	if(data.gender){newSettings.gender=data.gender}
	if(data.dob){newSettings.dob=data.dob}
	if(data.public){newSettings.public=data.public}
	if(data.city){newSettings.city=data.city}
	if(data.zipcode){newSettings.zipcode=data.zipcode}


	let response = await PavUtils._fetch(
	PavUtils.getBaseUrl()+ENDPOINTS.USER.SETTINGS,
  	'POST', newSettings, {accept: [200,201,204], reject:[400,401,404]}, null, true);
	return response;
}






