function GDataController(token) {

  var self = this;
  this.token = token;


  this.requestProjectsJson = function(callback) {
    // alert('Requesting projects JSON..');

    var requestUri = "https://www.googleapis.com/tasks/v1/users/@me/lists?callback=?";
    var requestParams = 'access_token=' + self.token;
    
    $.getJSON(requestUri, requestParams, 
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
    var requestUri = "https://www.googleapis.com/tasks/v1/lists/" + project.id + "/tasks?callback=?";
    var requestParams = 'access_token=' + self.token;

    $.getJSON(requestUri, 
              requestParams, 
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