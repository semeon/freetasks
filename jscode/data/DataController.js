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

    self.eventHandler.projectListLoaded = function() {
        console.log('Project List loaded event called.');
        dataView.createProjectList(self.dataModel.projectList, projectListItemClick);
        dataView.createTaskTreesList(self.dataModel.projectList);

    }

    self.eventHandler.taskListLoaded = function(project) {
        console.log('Project loaded event called.');
        dataView.updateProjectListItem(project, projectListItemClick);
        dataView.fillTaskTree(project);
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
            if (data.items) {
                function sortItemsByTitle(a,b) {  
                    return a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1;  
                };
                // Sorting??
                var items = cats = $(data.items).sort(sortItemsByTitle); 

                for (var i = 0; i < items.length; i++) {
                    // PROJECT CREATED HERE
                    var project = new Project(items[i]);
                    console.log('  Creating new project: ' + project.title);
                    self.dataModel.projectList[project.id] = project;
                    self.loadTasks(project);
                }
                self.eventHandler.projectListLoaded();

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



}