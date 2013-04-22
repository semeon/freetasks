function DataController(settings, pageController) {

  var self = this;

  this.eventHandler = {};
  this.dataModel = {};
  this.dataModel.projectList = {};

  var dataView = new DataView(settings, self.eventHandler); 

  // PRIVATE
  var apiController = new GoogleTasksApiController(settings); 
  var firstDataLoad = true;
  var dataLoadErrorOccured = false;


// *********************************************************************
// Event Handler
// *********************************************************************

    self.eventHandler.taskListLoaded = function(project) {
        console.log('Project loaded event called.');
        dataView.displayProjectListItem(project, projectListItemClick);
        // dataView.createTaskTree(project);

    }

    function projectListItemClick (project) {
        project.isSelected = !project.isSelected;
        dataView.updateProjectSelection(project);
    }




// *********************************************************************
// Public
// *********************************************************************

  // Start load
  // -----------------------------------------------------------------------
  this.start = function() {
    self.loadProjects();
  }


  // Project Data Loading
  // -----------------------------------------------------------------------
  this.loadProjects = function() {

    console.log('Starting projects load.');

    // Request Data
    apiController.requestProjects(processProjectList);

    // Process Response
    function processProjectList(data) {
      console.log('Processing loaded projects');

      // taskPaneView.clearTaskPane();

      // Sorting??
      //var sortedData = cats = $(data).sort(sortItemsByTitle); 
      if (data.items) {
        for (var i = 0; i < data.items.length; i++) {

          // PROJECT CREATED HERE
          var project = new Project(data.items[i]);
          console.log('  Creating new project: ' + project.title);

          self.dataModel.projectList[project.id] = project;
          self.loadTasks(project);
        }

      } else if (data.error) {
        dataLoadErrorOccured = true;
        pageController.processDataLoadError(data.error);

      } else {
        dataLoadErrorOccured = true;
        pageController.processDataLoadError();

      }
    }
  } // ---------------------------------------------------------------------



  // task Data Loading
  // -----------------------------------------------------------------------
  this.loadTasks = function(project) {

    console.log('Starting tasks load for: ' + project.title);

    // Request Data
    apiController.requestTasks(project, processTaskList);

    // Process Response
    function processTaskList(data, project) {
      console.log('Processing tasks for ' + project.title);
      project.isLoaded = true;

      if (data.items) {      
        project.addTasks(data.items);
        self.eventHandler.taskListLoaded(project);

      } else if (data.error) {
        dataLoadErrorOccured = true;
        pageController.processDataLoadError(data.error);
      } else {
        dataLoadErrorOccured = true;
        pageController.processDataLoadError();
      }
    }
  } // ---------------------------------------------------------------------



// *********************************************************************
// Private
// *********************************************************************

  // AppData Controls
  // ... 

  // // Controlling views
  // displayProjectList = function () {
  //   // alert('displayProjectList');
  //   projectListView.clearProjectList();
  //   for (var i = 0; i < projectCollection.length; i++) {
  //     var project = projectCollection[i];
  //     projectListView.displayProject(project, projectListItemClick);
  //   }
  // }


}