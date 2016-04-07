/**
 * # BackendFactory.js
 * 
 * This class interfaces with PAVBackend using the rest api
 *	The reason that this class exists is that it serves as a factory.. 
 * Today we're using PAVBackend, but perhaps tommorow we might use Hapi, or another backend.. 
 * By having a clear abstract class and a factory it will make it easy to implement new backend code if ever needed.
 */
'use strict';

import CONFIG from './config';
import PAVBackend from './lib/PAVBackend';


module.exports = function PavClient(token = null) {
  if (CONFIG.backend.pav) {
    return new PAVBackend(token);
  }
  //example:
  //  else if (CONFIG.backend.hapiLocal || CONFIG.backend.hapiRemote) {
  //   return new Hapi(token);
  // }
}
