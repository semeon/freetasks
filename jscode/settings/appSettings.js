function AppSettings() {

  self = this;

  // APP Setting
  // ***************************************************************
  this.app = {};
    self.app.url = 'http://localhost';
    self.app.logging = true;

    if (!self.app.logging) {
      console.log = function() {}
    }

  // Authentication Setting
  // ***************************************************************
  this.auth = {};

    // http://code.google.com/apis/accounts/docs/OAuth2.html
    self.auth.requestUriBase = 'https://accounts.google.com/o/oauth2/auth';

    // Logout uri
    self.auth.logoutUri = 'https://accounts.google.com/Logout?continue=';
    
    // client_id (required) 
    // This is how Google identifies your application
    // Google will give you a client_id when you register your app with Google.
    self.auth.clientId = '345458471597.apps.googleusercontent.com';

    // redirect_uri (required)
    // The URL on your site that will handle OAuth responses after the user takes an action on the dialog. 
    // You'll need to register the redirect_uri you'd like to use in advance. 
    // See the Registering your app with Google section for details on how to register.
    //
    //                https://code.google.com/apis/console
    //
    
    // var streetaddress= addy.substr(0, addy.indexOf(','));
    var location = window.location.href;
    if( location.indexOf('#') != -1 ) {
      location = location.substr(0, location.indexOf('#'));
    }
    self.auth.redirectUri = location;

    // scope (required)
    // URL identifying the Google service to be accessed. 
    // See the documentation for the API you'd like to use for what scope to specify. 
    // To specify more than one scope, list each one separated with a space.
    self.auth.scope = 'https://www.googleapis.com/auth/tasks';

    // response_type (required) 
    // Either code or token. Use code for the server-side flow. For the client-side flow, use token.
    self.auth.responseType = 'token';

    // state (optional) 
    // A string used to maintain state between the request and redirect. 
    // This value will be appended to your redirect_uri after the user takes an action on the OAuth dialog.
    self.auth.state = '';

    self.auth.accessToken = false;
    var urlAccToken = $.url(window.location.href).fparam('access_token');   
    if (urlAccToken != undefined && urlAccToken != '') {
      self.auth.accessToken = urlAccToken;
    }

  // API Setting
  // ***************************************************************
  this.api = {};
    self.api.projectsRequestUri = 'https://www.googleapis.com/tasks/v1/users/@me/lists?callback=?';
    self.api.tasksRequestUri = function(projectId) {
      var uri = 'https://www.googleapis.com/tasks/v1/lists/' + projectId + '/tasks?callback=?';
      return uri;
    };


}