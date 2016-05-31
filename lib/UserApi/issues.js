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
 * ### newIssueResponse
 * Posts a new reaction to a user issue, either positive, neutral or negaitve.
 *
 * @param data
 *
 *  {
 * 		issueId: "1460304950157", 	// (String) -  The issue on which we will be posting an emotional response to
 *		response: 0, // (Number) - Either 1 for a positive response, 0 for a neutral response or -1 for a negative response
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
export async function newIssueResponse(data) {
	PavUtils.checkThatDataExistsAndNotNull([  //check that the data provided is valid
	{data: data, errorSpec: "not be null or undefined"},
	{data: data.issueId, errorSpec: "contain a `issueId` property, otherwise we don't know on which issue to leave an emotional response to"},
	{data: data.response!=null, errorSpec: "contain a `response` property, otherwise we don't what emotional response to leave to the issue"},
	], "newIssueResponse");
	let response = await PavUtils._fetch(   
		PavUtils.getBaseUrl()+PavUtils.sPrintf(ENDPOINTS.USER.ISSUE_RESPONSE,data.issueId), //then form the url to contain that issueId,
		'POST', {
		  "emotional_response": data.response
		}, {accept: [200,201,204], reject:[400,401,404,500]}
	, null, true);
	return response;
}







/**
 * ### deleteIssueResponse
 * Deletes a reaction from a user issue.
 *
 * @param data
 *
 *  {
 * 		issueId: "1460304950157", 	// (String) -  The issue on which we will be posting an emotional response to
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
export async function deleteIssueResponse(data) {
	PavUtils.checkThatDataExistsAndNotNull([  //check that the data provided is valid
	{data: data, errorSpec: "not be null or undefined"},
	{data: data.issueId, errorSpec: "contain a `issueId` property, otherwise we don't know on which issue to leave an emotional response to"},
	], "deleteIssueResponse");
	console.log("Delete issue reaction: "+JSON.stringify(data));
	let response = await PavUtils._fetch(   
		PavUtils.getBaseUrl()+PavUtils.sPrintf(ENDPOINTS.USER.ISSUE_RESPONSE,data.issueId), //then form the url to contain that issueId,
		'DELETE', null, {accept: [200,201,204], reject:[400,401,404,500]}
	, null, true);
	return response;
}





