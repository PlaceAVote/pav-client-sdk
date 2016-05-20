/**
 * # Auth.js
 *
 * The Auth class is responsible for all the user authentication calls.
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
 * ### getTrendingBills
 * Retrieves the current trending bills
 *
 * @returns an object with the signature
     {
      data: Object (the data we got from the server)
      error: An array of errors if there were any
    }

  @throws Error if something really evil takes place, like issuing a wrong request
 *
 */
export async function getTrendingBills() {
  let response = await PavUtils._fetch(   
    PavUtils.getBaseUrl()+ENDPOINTS.BILLS.TRENDING,
    'GET', null, {accept: [200,201], reject:[400,401,404,500]}, null, true);
  return response;
}



/**
 * ### getBillById
 * Retrieves a bill with a specific id
 *
 * @param data
 *  {
 *    billId: "THE_BILL_ID_THAT_WE_WISH_TO_FETCH" (string)
 *  }
 *
 *
 * @returns an object with the signature
     {
      data: Object (the data we got from the server)
      error: An array of errors if there were any
    }

  @throws Error if something really evil takes place, like issuing a wrong request
 *
 */
export async function getBillById(data) {
  PavUtils.checkThatDataExistsAndNotNull([  //check that the data provided is valid
    {data: data, errorSpec: "not be null or undefined"},
    {data: data.billId, errorSpec: "contain a billId property, otherwise we don't know what bill to fetch."},
  ], "getBillById");
  let response = await PavUtils._fetch(   
    PavUtils.getBaseUrl()+PavUtils.sPrintf(ENDPOINTS.BILLS.GET_BILL,data.billId), //then form the url to contain that billId,
    'GET', null, {accept: [200,201], reject:[400,401,404,500]}, null, true);
  return response;
}




/**
 * ### getBillCommentsById
 * Retrieves all the comments of a specific bill 
 *
 * @param data
 *  {
 *    billId: "THE_BILL_ID_THAT_WE_WISH_TO_FETCH_COMMENTS_FOR",(string)
 *    sortBy: (Optional) either "latest" or "highest-score" , default: "highest-score", (string)
 *  }
 *
 *
 * @returns an object with the signature
     {
      data: Object (the data we got from the server)
      error: An array of errors if there were any
    }

  @throws Error if something really evil takes place, like issuing a wrong request
 *
 */
export async function getBillCommentsById(data) {
  PavUtils.checkThatDataExistsAndNotNull([  //check that the data provided is valid
    {data: data, errorSpec: "not be null or undefined"},
    {data: data.billId, errorSpec: "contain a billId property, otherwise we don't know what bill we should fetch the comments for."},
  ], "getBillCommentsById");
  let sortBy = data.sortBy || "highest-score";
  let response = await PavUtils._fetch(   
    PavUtils.getBaseUrl()+PavUtils.sPrintf(ENDPOINTS.BILLS.GET_BILL_COMMENTS,data.billId)+"?sort-by="+sortBy, //then form the url to contain that billId,
    'GET', null, {accept: [200,201], reject:[400,401,404,500]}, null, true);
  return response;
}





/**
 * ### getBillTopCommentsById
 * Retrieves the TOP comments of a specific bill 
 *
 * @param data
 *  {
 *    billId: "THE_BILL_ID_THAT_WE_WISH_TO_FETCH_COMMENTS_FOR", (string)
 *  }
 *
 *
 * @returns an object with the signature
     {
      data: Object (the data we got from the server)
      error: An array of errors if there were any
    }

  @throws Error if something really evil takes place, like issuing a wrong request
 *
 */
export async function getBillTopCommentsById(data) {
  PavUtils.checkThatDataExistsAndNotNull([  //check that the data provided is valid
    {data: data, errorSpec: "not be null or undefined"},
    {data: data.billId, errorSpec: "contain a billId property, otherwise we don't know what bill we should fetch the comments for."},
  ], "getBillTopCommentsById");
  let response = await PavUtils._fetch(   
    PavUtils.getBaseUrl()+PavUtils.sPrintf(ENDPOINTS.BILLS.GET_BILL_TOP_COMMENTS,data.billId), //then form the url to contain that billId,
    'GET', null, {accept: [200,201], reject:[400,401,404,500]}, null, true);
  return response;
}

















/**
 * ### commentOnBill
 *  Leaves a comment under a bill
 *
 * @param data
 *  {
 *    billId: "THE_BILL_ID_THAT_WE_WISH_TO_LEAVE_A_COMMENT_ON" (string),
 *    body: The actual comment text (string)
 *  }
 *
 *
 * @returns an object with the signature
     {
      data: Object (the data we got from the server)
      error: An array of errors if there were any
    }

  @throws Error if something really evil takes place, like issuing a wrong request
 *
 */
export async function commentOnBill(data) {
  PavUtils.checkThatDataExistsAndNotNull([  //check that the data provided is valid
    {data: data, errorSpec: "not be null or undefined"},
    {data: data.billId, errorSpec: "contain a 'billId' property, otherwise we don't know what bill we should fetch the comments for"},
    {data: data.body, errorSpec: "contain a 'body' property. Theres no point of leaving a blank comment"},
  ], "commentOnBill");
  let response = await PavUtils._fetch(   
    PavUtils.getBaseUrl()+COMMENT_ON_BILL, 
    'PUT', {
      bill_id: data.billId
      body: data.body
    }, {accept: [200,201], reject:[400,401,404,500]}, null, true);
  return response;
}






/**
 * ### commentOnComment
 *  Leaves a comment under a comment of a bill
 *
 * @param data
 *  {
 *    billId: "THE_BILL_ID_THAT_CONTAINS_THE_COMMENT_WE_WISH_TO_LEAVE_A_COMMENT_ON" (string),
 *    commentId: "THE_COMMENT_ID_UNDER_WHICH_WE_WISH_TO_LEAVE_A_COMMENT_ON" (string),
 *    body: The actual comment text (string)
 *  }
 *
 *
 * @returns an object with the signature
     {
      data: Object (the data we got from the server)
      error: An array of errors if there were any
    }

  @throws Error if something really evil takes place, like issuing a wrong request
 *
 */
export async function commentOnComment(data) {
  PavUtils.checkThatDataExistsAndNotNull([  //check that the data provided is valid
    {data: data, errorSpec: "not be null or undefined"},
    {data: data.billId, errorSpec: "contain a 'billId' property, otherwise we don't know what bill we should fetch the comments for"},
    {data: data.body, errorSpec: "contain a 'body' property. Theres no point of leaving a blank comment"},
    {data: data.commentId, errorSpec: "contain a 'commentId' property. Otherwise we don't know under which comment we should leave your comment"},
  ], "commentOnComment");
  let response = await PavUtils._fetch(   
    PavUtils.getBaseUrl()+PavUtils.sPrintf(ENDPOINTS.BILLS.COMMENT_ON_COMMENT,data.commentId), //then form the url to contain that commentId,
    'PUT', {
      bill_id: data.billId
      body: data.body
    }, {accept: [200,201], reject:[400,401,404,500]}, null, true);
  return response;
}


