import * as Auth from './auth';
import * as Profile from './profile';

export default {
	...Auth, 
	...Profile
}

// Object.assign({}, 
// Auth, 
// Profile
// );
