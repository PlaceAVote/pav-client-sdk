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

