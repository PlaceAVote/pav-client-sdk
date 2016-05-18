module.exports = {
  PAV_BACKEND: {
    DEV_API_BASE_URL: 'https://apidev.placeavote.com',	//or api for prod
    API_BASE_URL: 'https://api.placeavote.com',  //or api for prod
    ENDPOINTS: {
      USER:{
        LOGIN_EMAIL: '/user/authenticate',
        LOGIN_FACEBOOK: '/user/facebook/authenticate',
        SIGNUP: '/user',
        SIGNUP_FACEBOOK: '/user/facebook',
        FORGOT_PASSWORD: '/password/reset',
        VALIDATE: "/user/validate",
        PROFILE: '/user/%s/profile',
        TIMELINE: '/user/%s/timeline',
        FOLLOW: "/user/follow",
        UNFOLLOW: "/user/unfollow",
        FEED: "/user/feed"
      },
      SEARCH: {
        BILLS: "/search/bills"
      },
      BILLS:{
        TRENDING: "/bills/trending",
        GET_BILL: "/bills/%s",
        GET_BILL_COMMENTS: "/bills/%s/comments",
        GET_BILL_TOP_COMMENTS: "/bills/%s/topcomments",
      }
    }
  }
}
