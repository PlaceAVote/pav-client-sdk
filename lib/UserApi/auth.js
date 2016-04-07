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
  API_BASE_URL,
  PRE_BASE_URL,
  ENDPOINTS
}  = require('../../config').PAV_BACKEND;


export function testFunc2 (){
console.log("profile test ");
}



/**
 * ### signup
 * prepare the data and and call fetch
 *
 * @param data
 *
 *    {
        "email": "string",
        "password": "string",
        "first_name": "string",
        "last_name": "string",
        "dob": "string",
        "zipcode": "string",
        "topics": [
          "string"
        ],
        "gender": "string"
 *    }
 *
 * @returns an object with the signature
     {
      data: Object (the data we got from the server)
      error: An array of errors if there were any
    }

  @throws Error if something really evil takes place, like issuing a wrong request
 *
 */
export async function signup (data) {
  PavUtils.checkThatDataExistsAndNotNull([  //check that the data provided is valid
    {data: data, errorSpec: "not be null or undefined"},
    {data: data.email, errorSpec: "contain an email"},
    {data: data.password, errorSpec: "contain a password"},
    {data: data.first_name, errorSpec: "contain a first name"},
    {data: data.last_name, errorSpec: "contain a last name"},
    {data: data.dob, errorSpec: "contain a date of birth"},
    {data: data.zipcode, errorSpec: "contain a zipcode"},
    {data: data.topics, errorSpec: "contain topics the user is interested in"},
    {data: data.gender, errorSpec: "contain a gender"}
    ], "signup");

  let response = await PavUtils._fetch( //call the endpoint
      PRE_BASE_URL.USER_API+API_BASE_URL+ENDPOINTS.USER.SIGNUP,
      'PUT', {
      email: data.email,
      password: data.password,
  });
  return response;
}





/**
 * ### login
 * prepare the data and and call fetch
 *
 * @param data
 *
 *  {email: "barton@example.com", password: "Passw00rt!"}
 *
 * @returns an object with the signature
     {
      data: Object (the data we got from the server)
      error: An array of errors if there were any
    }

  @throws Error if something really evil takes place, like issuing a wrong request
 *
 */
export async function login(data) {

  PavUtils.checkThatDataExistsAndNotNull([  //check that the data provided is valid
    {data: data, errorSpec: "not be null or undefined"},
    {data: data.email, errorSpec: "contain an email"},
    {data: data.password, errorSpec: "contain a password"}
    ], "login");

  let response = await PavUtils._fetch(   //call the endpoint
      PRE_BASE_URL.USER_API+API_BASE_URL+ENDPOINTS.USER.AUTHENTICATE_EMAIL,
      'POST', {
      email: data.email,
      password: data.password
  });
  return response;
}
