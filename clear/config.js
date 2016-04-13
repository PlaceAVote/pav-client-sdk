module.exports = {
  PAV_BACKEND: {
    API_BASE_URL: 'https://api.placeavote.com',	//or apidev
    ENDPOINTS: {
      USER:{
        AUTHENTICATE_EMAIL: '/user/authenticate',
        SIGNUP: '/user',
        FORGOT_PASSWORD: '/password/reset'
      }
    }
  }
}
