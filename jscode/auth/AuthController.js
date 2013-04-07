function AuthController(settings) {
 
  var self = this;
  this.isLoggedIn = false;
  // TODO   this.isAccessDenied = false;
  if (settings.accessToken) {
    self.isLoggedIn = true;
  }

  var authView = new AuthView(self.isLoggedIn);

  // Public
  // **************************************************
  this.login = function() {
    var requestUri = '';
    requestUri = requestUri + settings.requestUriBase + '?';
    requestUri = requestUri + 'client_id=' + settings.clientId + '&';
    requestUri = requestUri + 'redirect_uri=' + settings.redirectUri + '&';
    requestUri = requestUri + 'response_type=' + settings.responseType + '&';
    requestUri = requestUri + 'scope=' + settings.scope + '&';
    // requestUri = requestUri + '&state='' + authModel.state + '&';
    window.location.href = requestUri;
  }

  this.logout = function() {
    // TODO
    window.location.href = settings.redirectUri;
  }
 
  this.displayLoginStatus = function() {
    authView.displayLoginStatusMessage();
    authView.authButtonNode.bind( 'click', 
                                  function(){
                                    if (self.isLoggedIn) {
                                        // alert('self.logout();');
                                        self.logout();
                                    } else {
                                        // alert('self.login();');
                                        self.login();
                                    }
                                  });
  }
 
}
  