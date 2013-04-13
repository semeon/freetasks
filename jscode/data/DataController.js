function DataController(settings, pageController) {

  var self = this;
  this.dataModel = new DataModel();
  this.eventHandler = {};

  var apiController = new GoogleTasksApiController(settings); 
  var firstDataLoad = true;
  var dataLoadErrorOccured = false;


// *********************************************************************
// Event Handlers
// *********************************************************************
  // $(document).ajaxStart(function() {
  //   if (firstDataLoad) {
  //     // pageController.dataLoadStarted();
  //   }
  //  });

  // $(document).ajaxStop(function() {
  //   if (firstDataLoad && !dataLoadErrorOccured) {
  //     pageController.displayPage();      
  //     // pageController.dataLoadCompleted();
  //   }

  //   firstDataLoad = false;
  // });

  this.eventHandler.taskListLoaded = function() {
    console.log('Task list loaded evevent called.');

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

          var project = data.items[i];
          self.dataModel.projectList[project.id] = project;

          // delete project.taskSet;
          // delete project.rootTasks;
          project.taskSet = {};
          project.taskTree = {};        

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
    apiController.requestTasks(project.id, processTaskList);

    // Process Response
    function processTaskList(data) {
      // var sortedData = cats = $(data).sort(sortItemsByTitle); 
      project.isLoaded = true;

      if (data.items) {      
        for (var i = 0; i < data.items.length; i++) {
          var task = new Task(data.items[i]);

          console.log('  Loaded task #' + i + ' ' + task.title);
          project.taskSet[task.id] = task;
        }

        project.taskTree.id = 'none';
        project.taskTree.title = 'root';
        console.log('  Building task tree.');
        attachChildrenToParent(project.taskTree, project.taskSet);

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

  // -----------------------------------------------------------------------
  function sortItemsByTitle(a,b) {  
      return a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1;  
  } // ---------------------------------------------------------------------


  // -----------------------------------------------------------------------
  function attachChildrenToParent (node, fullList) {
    node.children = {};
    for (itemId in fullList) {
      var item = fullList[itemId];

      if (item.parentId == node.id) {
        console.log( '  "' + item.title + '" attached to "' + node.title + '"');

        node.children[itemId] = item;
        attachChildrenToParent(item, fullList);
      }
    }
  } // ---------------------------------------------------------------------




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


  // // Event handlers
  // projectListItemClick = function (project) {
  //   toggleSelection(project);
  // }


  // toggleSelection = function (project) {
  //   project.isSelected = !project.isSelected;

  //   // TODO - implement as different hide and show functions
  //   projectListView.updateProjectSelection(project);

  //   if (project.isSelected) {
  //     self.reloadProjectTasks(project);
  //   } else {
  //     taskPaneView.hideTaskGroup(project.id);
  //   }
  // }  





}