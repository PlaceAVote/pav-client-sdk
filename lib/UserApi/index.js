import * as Auth from './auth';
import * as Profile from './profile';
import * as NewsFeed from './newsfeed';
import * as Issues from './issues';
import * as Notifications from './notifications';


export default {
	...Auth, 
	...Profile,
	...NewsFeed,
	...Issues,
	...Notifications
}

// Object.assign({}, 
// Auth, 
// Profile
// );
