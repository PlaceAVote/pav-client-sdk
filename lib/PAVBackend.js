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


export userApi from './UserApi';
export default class PAVBackend {
  /**
   * ## Constructor
   *
   *
   * @throws tokenMissing if token is undefined
   */
  constructor( token ) {
    if (!_.isNull(token) && _.isUndefined(token.sessionToken)) {
      throw 'TokenMissing';
    }
    pavUtils.setToken(_.isNull(token) ?  null :  token.sessionToken.sessionToken);
  }

};
