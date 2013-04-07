function PageController(isLoggedIn) {
  
  var self = this;

  this.pageView = new PageView();

  if (!isLoggedIn) {
    // self.pageView.displayNotLoggedInMessage();
    self.pageView.showWelcomeBanner();

  } else {
    self.pageView.displayLoggedInMessage();
    self.pageView.displayMainRow();

  }

  
}

