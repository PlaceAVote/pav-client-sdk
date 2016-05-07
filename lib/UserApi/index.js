import * as Auth from './auth';
import * as Profile from './profile';
import * as NewsFeed from './newsfeed';
import * as Bills from './bills';
import * as Search from './search';

export default {
	...Auth, 
	...Profile,
	...NewsFeed,
	...Bills,
	...Search
}

// Object.assign({}, 
// Auth, 
// Profile
// );
