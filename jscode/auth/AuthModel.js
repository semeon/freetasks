function AuthModel() {

  var self = this;
  
  this.loggedIn = false;
  this.accessDenied = false;

  // http://code.google.com/apis/accounts/docs/OAuth2.html
  this.requestUriBase = "https://accounts.google.com/o/oauth2/auth";

  // Logout uri
  this.logoutUri = "https://accounts.google.com/Logout?continue=";

  
  // client_id (required) 
  // This is how Google identifies your application
  // Google will give you a client_id when you register your app with Google.
  this.clientId = "345458471597.apps.googleusercontent.com";
  
  // redirect_uri (required)
  // The URL on your site that will handle OAuth responses after the user takes an action on the dialog. You'll need to register the redirect_uri you'd like to use in advance. See the Registering your app with Google section for details on how to register.
  this.redirectUri = "http://www.myhost.com/index.html";

  // scope (required)
  // URL identifying the Google service to be accessed. See the documentation for the API you'd like to use for what scope to specify. To specify more than one scope, list each one separated with a space.
  this.scope = 'https://www.googleapis.com/auth/tasks';

  // response_type (required) 
  // Either code or token. Use code for the server-side flow. For the client-side flow, use token.
  this.responseType = "token";

  // state (optional) 
  // A string used to maintain state between the request and redirect. This value will be appended to your redirect_uri after the user takes an action on the OAuth dialog.
  this.state = "";

  var accessToken = "";
  var urlAccToken = $.url(window.location.href).fparam('access_token');   

  // alert("urlAccToken: " + urlAccToken);
  // alert("loggedIn: " + this.loggedIn);

  if (urlAccToken != undefined && urlAccToken != "") {
    self.loggedIn = true;
    self.accessToken = urlAccToken;

  } else {
    
  }


}

