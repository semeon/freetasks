function AppController() {
  // alert('App Started');
  
  var self = this;

  var authController = new AuthController(); 
  var gDataController = new GDataController(); 
  var appView = new AppView();

  this.init = function() {
    // alert('Starting app..');

    authController.displayLoginStatus();

    if (authController.isLoggedIn()) {
      // Init data loader
      gDataController.init(authController.getAccessToken());

      // Display task list
      appView.displayMainRow();

      // Load list of projects
      var appDataController = new AppDataController(); 
      appDataController.init(gDataController);

    } else {
      appView.displayNotLoggedInAlert();
    }
  }

  
}

