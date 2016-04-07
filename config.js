module.exports = {
  PAV_BACKEND: {
    API_BASE_URL: 'placeavote.com',
    PRE_BASE_URL:{
      USER_API:'https://userapidev.'  //change that to userapi when in production
    },
    ENDPOINTS: {
      USER:{
        AUTHENTICATE_EMAIL: '/user/authenticate',
        SIGNUP: '/user'
      }
    },
    SESSION_TOKEN_STORAGE_KEY:"token"
  }
}
