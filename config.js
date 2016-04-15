module.exports = {
  PAV_BACKEND: {
    API_BASE_URL: 'https://apidev.placeavote.com',	//or api for prod
    ENDPOINTS: {
      USER:{
        LOGIN_EMAIL: '/user/authenticate',
        LOGIN_FACEBOOK: '/user/facebook/authenticate',
        SIGNUP: '/user',
        SIGNUP_FACEBOOK: '/user/facebook',
        FORGOT_PASSWORD: '/password/reset'
      }
    }
  }
}
