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


import * as PavUtils from '../PavUtils';



const {
  ENDPOINTS
}  = require('../../config').PAV_BACKEND;





/**
 * ### scrapeUrl
 * Scrapes the url provided to retrieve some basic info (an image, and a title being the most important ones)
 *
 * @param data
 *
 *  {
 *  url: "www.domain.com",   String - This should be a string the url that we will be scraping
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
export async function scrapeUrl(data) {
  PavUtils.checkThatDataExistsAndNotNull([  //check that the data provided is valid
    {data: data, errorSpec: "not be null or undefined"},
    {data: data.url, errorSpec: "contain a `url` property"},
    ], "scrapeUrl");
  let response = await PavUtils._fetch(   
    PavUtils.getBaseUrl()+ENDPOINTS.UTILS.SCRAPE_URL+"?link="+data.url, 
    'GET', null, {accept: [200,201], reject:[400,401,404,500]}, null, true);
  return response;
}



