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
 *    billId: i.e: "OIADNAIOD4FNAFOI_ABF32A9F" (string), The bill id we wish to leave a comment on.
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
    PavUtils.getBaseUrl()+ENDPOINTS.BILLS.COMMENT_ON_BILL, 
    'PUT', {
      bill_id: data.billId,
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
 *    billId: i.e: "OIADNAIOD4FNAFOI_ABF32A9F" (string), The bill id that contains the comment we wish to leave a comment on
 *    commentId: i.e: "DAZXC1OIADNAIOD4FNAF" (string), The comment id that we wish to leave a comment on.
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
      bill_id: data.billId,
      body: data.body
    }, {accept: [200,201], reject:[400,401,404,500]}, null, true);
  return response;
}








/**
 * ### likeComment
 *  Likes a comment if unliked, or revokes the like if liked
 *
 * @param data
 *  {
 *    billId: i.e: "OIADNAIOD4FNAFOI_ABF32A9F" (string), The bill id that contains the comment we wish to like.
 *    commentId: i.e: "DAZXC1OIADNAIOD4FNAF" (string), The comment id that we wish to like.
 *    isAlreadyLiked: i.e: false, (boolean) That actually lets us know wether the comment is already liked, and thus we should revoke the like, or if its not liked yet and thus we should like it.
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
export async function likeComment(data) {
  PavUtils.checkThatDataExistsAndNotNull([  //check that the data provided is valid
    {data: data, errorSpec: "not be null or undefined"},
    {data: data.billId, errorSpec: "contain a 'billId' property, otherwise we don't know what bill we should fetch the comments for"},
    {data: data.isAlreadyLiked, errorSpec: "contain a 'isAlreadyLiked' property. "},
    {data: data.commentId, errorSpec: "contain a 'commentId' property. Otherwise we don't know under which comment we should leave your comment"},
  ], "likeComment");
  let isAlreadyLiked = data.isAlreadyLiked || false;
  let response = await PavUtils._fetch(   
    PavUtils.getBaseUrl()+PavUtils.sPrintf(ENDPOINTS.BILLS.LIKE_ON_COMMENT,data.commentId), //then form the url to contain that commentId,
    isAlreadyLiked==true?'DELETE':'POST', {
      bill_id: data.billId
    }, {accept: [200,201, 204], reject:[400,401,404,500]}, null, true);
  return response;
}




/**
 * ### dislikeComment
 *  Dislikes a comment if liked, or revokes the dislike if already disliked
 *
 * @param data
 *  {
 *    billId: i.e: "OIADNAIOD4FNAFOI_ABF32A9F" (string), The bill id that contains the comment we wish to dislike.
 *    commentId: i.e: "DAZXC1OIADNAIOD4FNAF" (string), The comment id that we wish to dislike.
 *    isAlreadyDisliked: i.e: false, (boolean) That actually lets us know wether the comment is already disliked, and thus we should revoke the dislike, or if its not disliked yet and thus we should dislike it.
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
export async function dislikeComment(data) {
  PavUtils.checkThatDataExistsAndNotNull([  //check that the data provided is valid
    {data: data, errorSpec: "not be null or undefined"},
    {data: data.billId, errorSpec: "contain a 'billId' property, otherwise we don't know what bill we should fetch the comments for"},
    {data: data.isAlreadyDisliked, errorSpec: "contain a 'isAlreadyDisliked' property. "},
    {data: data.commentId, errorSpec: "contain a 'commentId' property. Otherwise we don't know under which comment we should leave your comment"},
  ], "dislikeComment");
  let isAlreadyDisliked = data.isAlreadyDisliked || false;
  let response = await PavUtils._fetch(   
    PavUtils.getBaseUrl()+PavUtils.sPrintf(ENDPOINTS.BILLS.DISLIKE_ON_COMMENT,data.commentId), //then form the url to contain that commentId,
    isAlreadyDisliked==true?'DELETE':'POST', {
      bill_id: data.billId
    }, {accept: [200,201, 204], reject:[400,401,404,500]}, null, true);
  return response;
}

