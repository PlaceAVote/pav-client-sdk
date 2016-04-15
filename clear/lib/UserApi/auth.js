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
  ENDPOINTS
}  = require('../../config').PAV_BACKEND;






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
      API_BASE_URL+ENDPOINTS.USER.SIGNUP,
      'PUT', {
      email: data.email,
      password: data.password,
      "first_name": data.first_name,
      "last_name": data.last_name,
      "dob": data.dob,
      "zipcode": data.zipcode,
      "topics": data.topics,
      "gender": data.gender
  },
  {accept: [200,201], reject:[400,401,409]}
  );
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
      API_BASE_URL+ENDPOINTS.USER.AUTHENTICATE_EMAIL,
      'POST', {
      email: data.email,
      password: data.password
  });
  return response;
}








/**
 * ### forgotPassword
 *
 * This call initiates as forgot password process. An email will be sent to the email provided
 * so that the user gets the link with a token we need to verify he has access to that email address
 * and reset his password.
 *
 * @param data
 *
 *  {email: "barton@example.com"}
 *
 * @returns an object with the signature
    {
      error: An array of errors if there were any
    }

  @throws Error if something really evil takes place, like issuing a wrong request
 *
 */
export async function forgotPassword(data) {

  PavUtils.checkThatDataExistsAndNotNull([  //check that the data provided is valid
    {data: data, errorSpec: "not be null or undefined"},
    {data: data.email, errorSpec: "contain an email"},
    ], "forgotPassword");

  let response = await PavUtils._fetch(   //call the endpoint
      API_BASE_URL+ENDPOINTS.USER.FORGOT_PASSWORD+"?email="+data.email,
      'POST', {});
  return response;
}