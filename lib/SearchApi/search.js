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
 * ### searchBills
 * Retrieves the bills that belong to the specific searchTag
 *
 * @param data
 *
 *  {
 *  searchTag: "EDUCATION",   //This should be one of the known pav topics, in a comma seperated list within a STRING value e.g. "Education,Drugs"
 *  }
 *
 * @returns an object with the signature
     {
      data: Object (the data we got from the server)
      error: An array of errors if there were any
    }

  @throws Error if something really evil takes place, like issuing a wrong request
 *
 */
export async function searchBills(data) {
  PavUtils.checkThatDataExistsAndNotNull([  //check that the data provided is valid
    {data: data, errorSpec: "not be null or undefined"},
    {data: data.searchTag, errorSpec: "contain a searchTag"},
    ], "searchBills");
  let response = await PavUtils._fetch(   
    PavUtils.getBaseUrl()+ENDPOINTS.SEARCH.BILLS+"?tag="+data.searchTag, //then form the url to contain that searchTag string
    'GET', null, {accept: [200,201], reject:[400,401,404,500]}, null, false);
  return response;
}


