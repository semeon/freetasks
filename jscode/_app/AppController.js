

function AppController(appSettings) {
  // alert('App Started');
  
  var self = this;
  this.settings = appSettings;

  var authController = new AuthController(self.settings.auth); 
  var gDataController = new GDataController(self.settings.accessToken); 
  var appView = new AppView();



  this.init = function() {
    // alert('Starting app..');

    authController.displayLoginStatus();

    if (authController.isLoggedIn) {
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

