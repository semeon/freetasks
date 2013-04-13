function PageController(isLoggedIn) {
  
  var self = this;

  this.pageView = new PageView();

  if (!isLoggedIn) {
    // self.pageView.displayNotLoggedInMessage();
    self.pageView.showWelcomeBanner();

  } else {
    // self.pageView.displayLoggedInMessage();
  }

// *********************************************************************
// Public
// *********************************************************************

  this.dataLoadStarted = function () {
    self.pageView.displayMainRow();
    pageController.pageView.showMessage('Loading..', 'Loading your projects and tasks.', 'info');
  }

  this.dataLoadCompleted = function () {
    pageController.pageView.showMessage('Ready!', 'Your projects and tasks were successfully loaded.', 'success');
  }


  this.displayPage = function () {
    self.pageView.displayMainRow();
  }

  this.processDataLoadError = function (error) {
    var alertText;

    if (error) {
      alertText =  error.message + ' (code: ' + error.code + ').';
      switch(error.code)
      {
        case 401:
          alertText = alertText + '\nProbably, your session expired. Please re-login.'
          break;
        default:
      }

    } else {
      alertText =  'Something bad happened. Don\'t know what.\nBeware.';
    }
    pageController.pageView.showMessage('Error', alertText, 'error');
  }

// *********************************************************************
// Private
// *********************************************************************


  
}

