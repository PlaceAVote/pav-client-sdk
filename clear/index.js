/**
 * # index.js
 * 
 * This class interfaces with PAVBackend using the rest api
 *
 */
'use strict';

import PAVBackend from './lib/PAVBackend';


module.exports = function PavClient(token = null) {
  return new PAVBackend(token);
}
