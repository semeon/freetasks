function AuthView(authModel) {

  // alert('AuthView started');

  
  var self = this;
  
  var loggedInMessageDivCode = '<p id="loggedInMessage" class="navbar-text">' +
                                  'You are logged in to Google. ' + 
                                  '<a id="logoutButton" href="#" class="navbar-link">Logout</a>.' +
                                '</p>';
  var loggedOutMessageDivCode = '<p id="loggedOutMessage" class="navbar-text">' +
                                  'You are not logged in to Google. ' + 
                                  '<a id="loginButton" href="#" class="navbar-link">Login</a>.' +
                                '</p>';

  var loginFormDivCode = '';




  this.resetButtons = function() {
    self.loginButtonNavbar = $('#loginButton');
    self.logoutButton = $('#logoutButton');
  }


  this.resetButtons();

  this.loginStatusDiv = $('#loginStatus');
  // TODO: Clear?
  // this.loggedInMessageDiv = $('#loggedInMessage');
  // this.loggedOutMessageDiv = $('#loggedOutMessage');

  this.displayLoginStatusMessage = function (loggedIn){
    // alert('displayLoginStatusMessage: loggedIn ' + loggedIn);
    self.loginStatusDiv.empty();
    if (loggedIn) {
      // alert('logged in message: ' + loggedInMessageDivCode);
      self.loginStatusDiv.append(loggedInMessageDivCode);
    } else {
      // alert('logged out message: ' + loggedOutMessageDivCode);
      self.loginStatusDiv.append(loggedOutMessageDivCode);
    }
    self.resetButtons();
  }

 
  this.unhidePane = function(nodeId) {
    var selector = '#' + nodeId;
    $(selector).removeClass('hidden');
  }

  
}
