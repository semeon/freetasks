function GoogleTasksApiController(settings) {

  var self = this;
  this.token = settings.token;

  // Fix .ajaxStart() and .ajaxStop() for JSONP
  // http://bugs.jquery.com/ticket/8338
  $.ajaxPrefilter(function( options ) {
      options.global = true;
  });


// *********************************************************************
// Private
// *********************************************************************





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
    // AJAX START and STOP dont work with this but callbcak does
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

  this.requestTasks = function(projectId, callback) {
    // AJAX START and STOP dont work with this but callbcak does


    $.ajax({
              url: settings.api.tasksRequestUri(projectId),
              data: {access_token: settings.auth.accessToken},
              dataType: 'jsonp',
              // crossDomain: true,
              success: function(data) {
                          callback(data);
                        }
            });
  } 


  // OLD -----------------------------------------------

  this.requestProjectsJson = function(callback) {
    // alert('Requesting projects JSON..');

    var requestParams = 'access_token=' + self.token;
    
    alert(settings.api.projectsRequestUri);

    $.getJSON(settings.api.projectsRequestUri, 
              {access_token: self.token}, 

              function(data) {
                // alert("Something loaded..");
                var error = data.error;
                if (error != undefined && error != "") {    
                  alert('Error: ' + error.code + ' (' + error.message + ')');
                  // appView.displayErrorMessage(error);
                } else {
                  // alert('No error');
                  callback(data.items);
                }
              },  
            "json");
  }

  this.requestTasksJson = function(project, callback) {
    // alert('Requesting tasks JSON ..');
    var requestUri = 'https://www.googleapis.com/tasks/v1/lists/' + project.id + '/tasks?callback=?';
    var requestParams = 'access_token=' + self.token;

    $.getJSON(settings.api.tasksRequestUri, 
              {access_token: self.token}, 
              function(data) {
                // alert("Something loaded..");
                var error = data.error;
                if (error != undefined && error != "") {    
                  // alert('Error: ' + error.code + ' (' + error.message + ')');
                  // appView.displayErrorMessage(error);
                } else {
                  // alert('No error');
                  callback(data.items, project);
                }
              },  
            "json");
  }


}