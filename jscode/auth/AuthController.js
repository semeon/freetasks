function AuthController(settings) {
  // alert('AuthController started');
  
  var self = this;
  var authView = new AuthView();

  this.isLoggedIn = false;
  // TODO   this.isAccessDenied = false;

  if (settings.accessToken) {
    self.isLoggedIn = true;
  }

  this.login = function() {
    var requestUri = '';
    requestUri = requestUri + settings.requestUriBase + '?';
    requestUri = requestUri + 'client_id=' + settings.clientId + '&';
    requestUri = requestUri + 'redirect_uri=' + settings.redirectUri + '&';
    requestUri = requestUri + 'response_type=' + settings.responseType + '&';
    requestUri = requestUri + 'scope=' + settings.scope + '&';
    // requestUri = requestUri + '&state='' + authModel.state + '&';

    // alert(settings.redirectUri);

    window.location.href = requestUri;
  }

  this.logout = function() {
    // TODO
    window.location.href = settings.redirectUri;
  }
  
  this.displayLoginStatus = function () {
    authView.displayLoginStatusMessage(self.isLoggedIn);

    // Bind events
    authView.loginButtonNavbar.bind('click', function() {
      // alert('loginButton click...');
      self.login();
    });
   
    authView.logoutButton.bind('click', function() {
      // alert('logoutButton click...');
      self.logout();
    });

    
  }

 
}
  