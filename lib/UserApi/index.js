import * as Auth from './auth';
import * as Profile from './profile';
import * as NewsFeed from './newsfeed';


export default {
	...Auth, 
	...Profile,
	...NewsFeed,
}

// Object.assign({}, 
// Auth, 
// Profile
// );
