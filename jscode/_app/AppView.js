// DEPRECATED

function AppView() {
  
  var self = this;

  var mainRow = $('#mainRow');
  var messageBar = $('#messageBar');

  var notLoggedInMessageAlertCode = '' +
                                '<br/>' +
                                '<br/>' +
                                '<div class="alert alert-info">' + 
                                  '<a class="close" data-dismiss="alert">&times;</a>' +
                                  'Please log in to view your projects and tasks.' +
                                '</div>' +
                                '<br/>' +
                                '<br/>' +
                                '<br/>' +
                                '<br/>';

  // var errorMessageCode = '<div id="loggedOutMessage" class="loginStatusMessage">You are not logged in to Google. <a id="loginButton" href="#">Login</a>.</div>';
  
  this.displayNotLoggedInAlert = function() {
    messageBar.empty();
    messageBar.append(notLoggedInMessageAlertCode);
  }

  this.displayMainRow = function() {
    mainRow.removeClass('hidden');
  }
}
