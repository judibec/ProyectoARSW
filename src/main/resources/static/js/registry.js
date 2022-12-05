async function signIn(){
    const config = {
        auth: {
            clientId: '4d509855-b16c-4287-b8a3-72448421a496',
            authority: 'https://login.microsoftonline.com/common/',
            redirectUri: 'http://localhost:8080'
        }
    };
    
    var request = {
        scopes: ['user.read']
    };

    var client = new Msal.UserAgentApplication(config);

    let loginResponse = await client.loginPopup(request);
    console.dir(loginResponse);
    var admin_name = loginResponse.account.name;
    console.dir(loginResponse.account.name);
    localStorage.setItem("admin_u", admin_name);
    window.location="start.html"
    
}