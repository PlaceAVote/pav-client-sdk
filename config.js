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
        VALIDATE_TOKEN: "/user/token/validate",

        //Profile
        PROFILE: '/user/%s/profile',
        TIMELINE: '/user/%s/timeline',
        FOLLOW: "/user/follow",
        UNFOLLOW: "/user/unfollow",

        //Feed
        FEED: "/user/feed",

        //Issues
        NEW_ISSUE: "/user/issue",
        ISSUE_RESPONSE: "/user/issue/%s/response",


        //Notifications
        GET_NOTIFICATIONS: "/user/notifications",

        //Settings
        SETTINGS: "/user/me/settings",
        UPDATE_PROFILE_PHOTO: "/user/me/profile/image"

      },
      SEARCH: {
        BILLS_BY_TAG: "/search/bills",
        BILLS_BY_TERM: "/search",
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
      },
      VOTE:{
        VOTE_ON_BILL: "/vote"
      },
      UTILS:{
        SCRAPE_URL: "/opengraph/scrape"
      }
    }
  }
}
