
var settings = new AppSettings();

// GLOBALS
// var appController = new AppController(appSettings);
// appController.init();

var authController = new AuthController(settings.auth); 
// var apiController = new GDataController(settings.accessToken); 
// var pageController = new AppView();
// var dataController = new AppView();


// var appView = new AppView();



function onBodyLoad() {
  authController.displayLoginStatus();


  if (authController.isLoggedIn) {

    // appView.displayMainRow();

    // Load list of projects
    // var appDataController = new AppDataController(); 
    // appDataController.init(gDataController);

  } else {
    // appView.displayNotLoggedInAlert();
  }
}

