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
  	'GET', null, {accept: [200,201,204], reject:[400,401,404, 500]}, null, true);
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
  	'POST', newSettings, {accept: [200,201,204], reject:[400,401,404, 500]}, null, true);
	return response;
}









/**
 * ### updateProfilePhoto
 *  Sets a new profile photo for the current user
 *
 * @param data
 *
 *  {
 * 		imgData: {Object}	- A base64 encoded user photo object (50x50 of type .jpeg or png. )
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
export async function updateProfilePhoto(data) {
	PavUtils.checkThatDataExistsAndNotNull([  //check that the data provided is valid
    {data: data, errorSpec: "not be null or undefined"},
    {data: data.imgData, errorSpec: "contain an `imgData` property (base64 encoded) in order to update the profile image."},
    ], "updateProfilePhoto");
	let response = await PavUtils._fetch(
	PavUtils.getBaseUrl()+ENDPOINTS.USER.UPDATE_PROFILE_PHOTO,
  	'POST', {
  		file: data.imgData
  	}, {accept: [200,201,204], reject:[400,401,404, 500]}, null, true);
	return response;
}
