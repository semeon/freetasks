function GoogleData(token, onLoadCallbak) {
  // alert('GoogleData constructor: started');

  // MODEL
  // ====================================================

  var self = this;
  var loaded = false;
  var accessToken = token;
  var projectList = new ProjectList();

  var pendingOperations = 0;

  
  this.loadError = "";

  // CONTROLLER
  // ====================================================
  // public methods
  this.getPendingOperationsNumber = function() {
    return pendingOperations;
  }

  this.getProjectList = function() {
    return projectList;
  }
  
  this.load = function() {
    alert("Processing data...");
    alert("ROOT: Requests: " + pendingOperations);
    var requestUri = "https://www.googleapis.com/tasks/v1/users/@me/lists?callback=?";
    var requestParams = 'access_token=' + accessToken;
    pendingOperations++;
    $.getJSON(requestUri, requestParams, loadLists, "json");  
  }
  
  
  
  // private methods
 
  loadLists = function(json) {
    // alert("Request 1 completes successfully.");
    // alert('json: ' + json);
    // alert('json.error: ' + json.error);
    // alert('json.error.message: ' + json.error.message);
    
    if (json.error != undefined && json.error != "") {    
      // alert('Error: ' + json.error.code + ' (' + json.error.message + ')');
      self.loadError = json.error;
    } else {
      alert("json.items.length: " + json.items.length);
      // alert("LOAD LIST STARTED: Requests: " + pendingOperations);
      for (var i = 0; i < json.items.length; i++) {
        var project = new Project(json.items[i]);
        projectList.addProject(project);
        pendingOperations++;
        requestTasks(project);
        // alert("project: " + project.getId());
      }
      pendingOperations--;
      if (pendingOperations == 0) {
        onLoad();      
      } 
    }
  }
  
  requestTasks = function(project) {
    var requestUri = "https://www.googleapis.com/tasks/v1/lists/" + project.getId() + "/tasks?callback=?";
    var requestParams = 'access_token=' + accessToken;
    $.getJSON(requestUri,
              requestParams,
              function(jsonTasks) {
                project.createTasksTreeFromJson(jsonTasks);

                //alert("LOAD LIST OVER: Requests: " + pendingOperations);
                pendingOperations--;
                if (pendingOperations == 0) {
                  onLoad();      
                } 

              },
              "json"
    );    
  }

  onLoad = function() {
    // alert("ONLOAD CALLBACK: Requests: " + pendingOperations);
    onLoadCallbak();
  }

}