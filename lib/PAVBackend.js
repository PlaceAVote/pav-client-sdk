/**
 * # PAVBackend.js
 *
 * This class interfaces with PAVBackend.com using the rest api
 * see [http://hapijs.com/api](http://hapijs.com/api)
 *
 */
'use strict';
/**
 * ## Async support
 *
 */
require('regenerator/runtime');

/**
 * ## Imports
 *
 * Config for defaults and underscore for a couple of features
 */
import _ from 'underscore';
import UserApi from './UserApi'
import * as pavUtils from './PavUtils'


export default class PAVBackend {
  /**
   * ## Constructor
   *
   *
   * @throws tokenMissing if the sessionToken property within  token is undefined
   */
  constructor( token, isDev = true) {
    if (!_.isNull(token) && _.isUndefined(token.sessionToken)) {
      throw 'TokenMissing';
    }
    let curToken = _.isNull(token) ?  null :  token.sessionToken;
    // console.log("@@ Constructor given token: "+curToken);
    pavUtils.setToken(curToken);
    pavUtils.setEnvironmentIsDev(isDev);  //if environment is dev we will be using the dev api endpoint.

  }


  get userApi(){
    return UserApi;
  }

};
