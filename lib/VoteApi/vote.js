/**
 * # issues.js
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
 * ### voteOnBill
 * Casts a vote on a specific bill
 *
 * @param data
 *
 *  {
 * 		billId: "146030D495A0157", 	// (String) -  The bill id that we will be voting for
 *		vote: true or false, // (Boolean) - True represents voting for a bill and false voting against it
 *	}
 *
 * @returns an object with the signature
 *	{
 *    data: Object (the data we got from the server)
 *    error: An array of errors if there were any
 *  }
 *
 * @throws Error if something really evil takes place, like issuing a wrong request
 *
 */
export async function voteOnBill(data) {
	PavUtils.checkThatDataExistsAndNotNull([  //check that the data provided is valid
	{data: data, errorSpec: "not be null or undefined"},
	{data: data.vote, errorSpec: "contain a boolean `vote` property, otherwise we don't if the user voted for or against"},
	{data: data.billId, errorSpec: "contain a `billId` property, otherwise we don't on which bill the vote should be cast"},
	], "voteOnBill");

  	console.log("WITH OPTIONS: "+JSON.stringify(data))
	let response = await PavUtils._fetch(   
		PavUtils.getBaseUrl()+ENDPOINTS.VOTE.VOTE_ON_BILL, 
		'PUT', {
		  "bill_id": data.billId,
		  "vote": data.vote
		}, {accept: [200,201,204], reject:[400,401,404, 409,500]}
	, null, true);
	return response;
}



