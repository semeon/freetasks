
var settings = new AppSettings();

// GLOBALS
// var appController = new AppController(appSettings);
// appController.init();

var log = new Logger(true);

var authController = new AuthController(settings.auth, log); 
var pageController = new PageController(authController.isLoggedIn, log);
var dataController = new DataController(settings, pageController, log); 

// var pageController = new AppView();
// var dataController = new AppView();
// var appView = new AppView();


function onBodyLoad() {

  log.info('Body loaded');

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
