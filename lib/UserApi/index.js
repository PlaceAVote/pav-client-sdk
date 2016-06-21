import * as Auth from './auth';
import * as Profile from './profile';
import * as NewsFeed from './newsfeed';
import * as Issues from './issues';
import * as Notifications from './notifications';
import * as Settings from './settings';

export default {
	...Auth, 
	...Profile,
	...NewsFeed,
	...Issues,
	...Notifications,
	...Settings
}

// Object.assign({}, 
// Auth, 
// Profile
// );
