function PageController() {
  
  var self = this;

  var pageModel = new PageModel();
  var pageView = new PageView(pageModel);
  
  pageView.pageBody.ready(function() {
    // alert('Body ready');
    var appController = new AppController();
    appController.init();
  });
  
  
}

