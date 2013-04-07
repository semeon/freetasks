
var settings = new AppSettings();

// GLOBALS
// var appController = new AppController(appSettings);
// appController.init();

var authController = new AuthController(settings.auth); 
var pageController = new PageController(authController.isLoggedIn);
var dataController = new DataController(settings); 

// var pageController = new AppView();
// var dataController = new AppView();
// var appView = new AppView();


function onBodyLoad() {
  authController.displayLoginStatus();
  if (authController.isLoggedIn) {

    dataController.start();
    // appView.displayMainRow();

    // Load list of projects
    // var appDataController = new AppDataController(); 
    // appDataController.init(gDataController);

  } else {
    // appView.displayNotLoggedInAlert();

  }
}
