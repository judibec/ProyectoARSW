async function signIn(){
    const config = {
        auth: {
            clientId: '4d509855-b16c-4287-b8a3-72448421a496',
            authority: 'https://login.microsoftonline.com/common/',
            redirectUri: 'https://questik-api-1669770264047.azurewebsites.net/start.html'
        }
    };
    var client = new Msal.UserAgentApplication(config);
    var request = {
        scopes: ['user.read']
    };
    let loginResponse = await client.loginPopup(request);
    console.dir(loginResponse);
}