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
 *    billId: "THE_USER_ID_WHO_WE_WISH_TO_FOLLOW" 
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

