function AuthView(loggedIn) {

  // alert('AuthView started');
  var self = this;

  var loginStatusRoot = $('#loginStatus');
  var loginButtonRoot = $('#loginButton');

  var statusCode = '';
  var loginButtonCode = '';

  if (loggedIn) {
    statusCode =  'You are logged in to Google.';
    authButtonCode = '<a href="#">Logout</a>';
    // loginButtonRoot.addClass('active');

  } else {
    statusCode =  'You are not logged in to Google.';
    authButtonCode ='<a href="#">Login to Google</a>';
  }


  // PUBLIC
  // ******************************************
  this.authButtonNode = $(authButtonCode);

  this.displayLoginStatusMessage = function (){
    loginStatusRoot.empty();
    loginButtonRoot.append(self.authButtonNode);
  }
  
}
