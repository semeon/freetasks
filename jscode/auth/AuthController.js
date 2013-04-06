function AuthController() {
  // alert('AuthController started');
  
  var self = this;
  var authModel = new AuthModel();
  var authView = new AuthView(authModel);
  
  this.login = function() {
    var requestUri = "";
    requestUri = requestUri + authModel.requestUriBase + "?";
    requestUri = requestUri + "client_id=" + authModel.clientId;
    requestUri = requestUri + "&redirect_uri=" + authModel.redirectUri;
    requestUri = requestUri + "&scope=" + authModel.scope;
    requestUri = requestUri + "&response_type=" + authModel.responseType;
    // requestUri = requestUri + "&state=" + authModel.state;
    // alert("requestUri: " + requestUri);
    window.location.href = requestUri;
  }

  this.logout = function() {
    // TODO
    window.location.href = authModel.redirectUri;
  }
  
  this.getAccessToken = function() {
    return authModel.accessToken;
  }

  this.isLoggedIn = function() {
    // alert('authModel.loggedIn ' + authModel.loggedIn);
    return authModel.loggedIn;
  }

  this.isAccessDenied = function() {
    return authModel.accessDenied;
  }
  
  this.displayLoginStatus = function () {
    authView.displayLoginStatusMessage(self.isLoggedIn());

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
  