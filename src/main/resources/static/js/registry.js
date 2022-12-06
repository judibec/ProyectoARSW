const config = {
    auth: {
        clientId: '4d509855-b16c-4287-b8a3-72448421a496',
        authority: 'https://login.microsoftonline.com/common/',
        redirectUri: 'https://questik-api-1669770264047.azurewebsites.net/start.html',
        postLogoutRedirectUri: 'https://questik-api-1669770264047.azurewebsites.net'
    }
  };
  var client = new Msal.UserAgentApplication(config);
  
  var request = {
      scopes: ['user.read']
  };
  
  async function signIn(){
      let loginResponse = await client.loginRedirect(request);
      console.dir(loginResponse);
  }
  
  async function logOut(){
      let logOutResponse = await client.logout();
  }