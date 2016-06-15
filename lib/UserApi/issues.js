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






/**
 * ### createNewIssue
 * Creates a new issue that will show up on newsfeed data..
 *
 * @param data
 *
 *  {
 * 		comment: i.e: "A comment for this issue", 	// (String) -  The body text of this issue
 *		billId: i.e: "s2517-114", // (Optional - String) - If you specify a billId we will connect this bill you specified to the issue you are creating now.
 *		articleUrl: i.e: "https://www.placeavote.com/#!/faq", // (Optional - String) - If you specify an articleUrl we will connect this article to the issue you are creating now.
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
export async function createNewIssue(data) {
	PavUtils.checkThatDataExistsAndNotNull([  //check that the data provided is valid
	{data: data, errorSpec: "not be null or undefined"},
	{data: data.comment, errorSpec: "contain a `comment` property, otherwise we don't know on what the text of the issue is"}
	], "createNewIssue");

	let issueData = {};
	issueData.comment = data.comment;
	if(data.billId!=null){
		issueData.bill_id = data.billId;
	}
	if(data.articleUrl!=null){
		issueData.article_link = data.articleUrl;
	}

	let response = await PavUtils._fetch(   
		PavUtils.getBaseUrl()+ENDPOINTS.USER.NEW_ISSUE, 
		'PUT', issueData, {accept: [200,201,204], reject:[400,401,404,500]}
	, null, true);
	return response;
}



