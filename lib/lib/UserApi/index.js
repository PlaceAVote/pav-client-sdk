import * as Auth from './auth';
import * as Profile from './profile';
import * as NewsFeed from './newsfeed';
import * as Issues from './issues';


export default {
	...Auth, 
	...Profile,
	...NewsFeed,
	...Issues
}

// Object.assign({}, 
// Auth, 
// Profile
// );
