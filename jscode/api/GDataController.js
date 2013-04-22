function GoogleTasksApiController(settings) {

  var self = this;
  this.token = settings.token;

  // Fix .ajaxStart() and .ajaxStop() for JSONP
  // http://bugs.jquery.com/ticket/8338
  $.ajaxPrefilter(function( options ) {
      options.global = true;
  });


// *********************************************************************
// Public
// *********************************************************************


  this.genericRequest = function(requestUri, requestParams, callback) {
    // self.pendingRequestCounter++;
    // self.totalRequestCounter++;

    $.getJSON(
              requestUri,
              requestParams,
              function(data) {
                // self.pendingRequestCounter--;
                callback(data, requestParams);
              }
             );
  }  

  this.requestProjects = function(callback) {
    console.log('Requesting projects..');
    console.log('  URL: ' + settings.api.projectsRequestUri);
    $.ajax({
              url: settings.api.projectsRequestUri,
              data: {access_token: settings.auth.accessToken},
              dataType: 'jsonp',
              // crossDomain: true,
              success: function(data) {
                          callback(data);
                        }
            });
  }  

  this.requestTasks = function(project, callback) {
    console.log('Requesting tasks..');
    console.log('  URL: ' + settings.api.tasksRequestUri(project.id));
    $.ajax({
              url: settings.api.tasksRequestUri(project.id),
              data: {access_token: settings.auth.accessToken},
              dataType: 'jsonp',
              // crossDomain: true,
              success: function(data) {
                          callback(data, project);
                        }
            });
  } 

}