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
   *  props can contain:
   *      sessionToken : The session token for this session
   *      isDev : Wether we should call the dev api or the production api endpoint.
   */
  constructor( props ) {
    if(!!props){
      if(!!props.sessionToken){
        pavUtils.setToken(props.sessionToken);    
      }
      pavUtils.setEnvironmentIsDev(!!(props.isDev == null)?true:props.isDev);  //if environment is dev we will be using the dev api endpoint.  
    }
  }


  get userApi(){
    return UserApi;
  }

};
