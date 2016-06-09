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
 * ### signup
 *
 * This function calls the backend endpoint responsible for signing up a user, with data
 * acquired directly from the user himself
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
      PavUtils.getBaseUrl()+ENDPOINTS.USER.SIGNUP,
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
 * ### signupFacebook
 *
 * This function calls the backend endpoint responsible for signing up a user, with data
 * acquired mostly from facebook.
 * @param data
 *
 *    {
        "email": "string",
        "fbUserId": "string",
        "fbToken": "string",
        "firstName": "string",
        "lastName": "string",
        "birthday": "string", //in format DD/MM/YYYY
        "zipCode": "string",
        "img_url": "string",
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
export async function signupFacebook (data) {
  PavUtils.checkThatDataExistsAndNotNull([  //check that the data provided is valid
    {data: data, errorSpec: "not be null or undefined"},
    {data: data.email, errorSpec: "contain an email withn the email property"},
    {data: data.fbUserId, errorSpec: "contain a facebook user id withn the fbUserId property"},
    {data: data.fbToken, errorSpec: "contain a facebook token withn the fbToken property"},
    {data: data.fbImgUrl, errorSpec: "contain a url of the users photo withn the fbImgUrl property"},
    {data: data.firstName, errorSpec: "contain a first name withn the firstName property"},
    {data: data.lastName, errorSpec: "contain a last name withn the lastName property"},
    {data: data.birthday, errorSpec: "contain a date of birth withn the birthday property"},
    {data: data.zipCode, errorSpec: "contain a zipcode withn the zipCode property"},
    {data: data.topics, errorSpec: "contain topics the user is interested in withn the topics property"},
    {data: data.gender, errorSpec: "contain a gender withn the gender property"}
    ], "signupFacebook");

  let response = await PavUtils._fetch( //call the endpoint
      PavUtils.getBaseUrl()+ENDPOINTS.USER.SIGNUP_FACEBOOK,
      'PUT', {
      "email": data.email,
      "id": data.fbUserId,
      "token": data.fbToken,
      "img_url": data.fbImgUrl,
      "first_name": data.firstName,
      "last_name": data.lastName,
      "dob": data.birthday,
      "zipcode": data.zipCode,
      "topics": data.topics,
      "gender": data.gender
  },
  {accept: [200,201], reject:[400,401,409]}
  );
  return response;
}





/**
 * ### login
 * Logs the user in using email and password credentials
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
      PavUtils.getBaseUrl()+ENDPOINTS.USER.LOGIN_EMAIL,
      'POST', {
      email: data.email,
      password: data.password
  });
  return response;
}


/**
 * ### loginFacebook
 * Logs the user in using facebook id and token credentials
 *
 * @param data
 *
 *  {fbUserId: "82AFIU214BUF", fbAccessToken: "DBWIU72148BHFB2417DA2RAF7AFAWHATEVER"}
 *
 * @returns an object with the signature
     {
      data: Object (the data we got from the server)
      error: An array of errors if there were any
    }

  @throws Error if something really evil takes place, like issuing a wrong request
 *
 */
export async function loginFacebook(data) {

  PavUtils.checkThatDataExistsAndNotNull([  //check that the data provided is valid
    {data: data, errorSpec: "not be null or undefined"},
    {data: data.fbUserId, errorSpec: "contain a `fbUserId` property that is the facebook user id"},
    {data: data.fbAccessToken, errorSpec: "contain a `fbAccessToken` property that is the facebook access token"}
    ], "loginFacebook");

  let response = await PavUtils._fetch(   //call the endpoint
      PavUtils.getBaseUrl()+ENDPOINTS.USER.LOGIN_FACEBOOK,
      'POST', {
      id: data.fbUserId,
      token: data.fbAccessToken,
      email: 'whatever@placeavote.com'  //an email for fb auth is totally unnesseccary, john forgot to remove the email on this endpoint
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
      PavUtils.getBaseUrl()+ENDPOINTS.USER.FORGOT_PASSWORD+"?email="+data.email,
      'POST', {});
  return response;
}







/**
 * ### validate
 * Validates some user credential (Currently only email is supported)
    validations:
      email : Validates if a user exists with the current email address
 *
 * @param data
 *
 *  {email: "barton@example.com"}
 *
 * @returns an object with the signature
     {
      data: Object (the data we got from the server)
      error: An array of errors if there were any
    }

  @throws Error if something really evil takes place, like issuing a wrong request
 *
 */
export async function validate(data) {

  PavUtils.checkThatDataExistsAndNotNull([  //check that the data provided is valid
    {data: data, errorSpec: "not be null or undefined"},
    {data: data.email, errorSpec: "contain an email"},
    ], "validate");

  let response = await PavUtils._fetch(   //call the endpoint
      PavUtils.getBaseUrl()+ENDPOINTS.USER.VALIDATE,
      'POST', {
      email: data.email
  });
  return response;
}









/**
 * ### validateToken
 * Validates a token
 *
 * @param data
 *
 *  {token: (String) "AGBI298GA92QBFA"}
 *
 * @returns an object with the signature
     {
      data: Object (the data we got from the server)
      error: An array of errors if there were any
    }

  @throws Error if something really evil takes place, like issuing a wrong request
 *
 */
export async function validateToken(data) {

  PavUtils.checkThatDataExistsAndNotNull([  //check that the data provided is valid
    {data: data, errorSpec: "not be null or undefined"},
    {data: data.token, errorSpec: "contain a `token` value."},
    ], "validateToken");

  let response = await PavUtils._fetch(   //call the endpoint
      PavUtils.getBaseUrl()+ENDPOINTS.USER.VALIDATE_TOKEN+"?token="+data.token,
      'GET', null, {accept: [200,201], reject:[400,401,404,500]}, null, false);
  return response;
}

