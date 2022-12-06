async function logOut(){
    const config = {
        auth: {
            clientId: '4d509855-b16c-4287-b8a3-72448421a496',
            authority: 'https://login.microsoftonline.com/common/',
            postLogoutRedirectUri: 'https://questik-api-1669770264047.azurewebsites.net'
        }
    };
    
    var client = new Msal.UserAgentApplication(config);
    localStorage.clear("admin_u");
    client.logout();
    /**
    console.dir(loginResponse);
    var admin_name = loginResponse.account.name;
    console.dir(loginResponse.account.name);
    localStorage.setItem("admin_u", admin_name);
     */
    //window.location="start.html"
    
}