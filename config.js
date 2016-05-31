module.exports = {
  PAV_BACKEND: {
    DEV_API_BASE_URL: 'https://apidev.placeavote.com',  //or api for prod
    API_BASE_URL: 'https://api.placeavote.com',  //or api for prod
    ENDPOINTS: {
      USER:{
        //Auth
        LOGIN_EMAIL: '/user/authenticate',
        LOGIN_FACEBOOK: '/user/facebook/authenticate',
        SIGNUP: '/user',
        SIGNUP_FACEBOOK: '/user/facebook',
        FORGOT_PASSWORD: '/password/reset',
        VALIDATE: "/user/validate",

        //Profile
        PROFILE: '/user/%s/profile',
        TIMELINE: '/user/%s/timeline',
        FOLLOW: "/user/follow",
        UNFOLLOW: "/user/unfollow",

        //Feed
        FEED: "/user/feed",

        //Issues
        ISSUE_RESPONSE: "/user/issue/%s/response",
      },
      SEARCH: {
        BILLS: "/search/bills"
      },
      BILLS:{
        TRENDING: "/bills/trending",
        GET_BILL: "/bills/%s",
        GET_BILL_COMMENTS: "/bills/%s/comments",
        GET_BILL_TOP_COMMENTS: "/bills/%s/topcomments",
        COMMENT_ON_BILL: "/bills/comments",
        COMMENT_ON_COMMENT: "/comments/%s/reply",
        LIKE_ON_COMMENT: "/comments/%s/like",
        DISLIKE_ON_COMMENT: "/comments/%s/dislike",
      }
    }
  }
}
