import Auth from './auth';
import Profile from './profile';

export default {
	...Auth, 
	...Profile
}

// Object.assign({}, 
// Auth, 
// Profile
// );
