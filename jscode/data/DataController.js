function DataController(settings) {

  var self = this;
  this.dataModel = new DataModel();

    var projectCollection = new Array;

  // var projectListView = new ProjectListView();
  // var taskPaneView = new TaskPaneView();
  // var gDataController = {};

  var apiController = new GoogleTasksApiController(settings); 


// *********************************************************************
// Event Handlers
// *********************************************************************
  $(document).ajaxStart(function() {
    // alert('ajaxStart');
   });

  $(document).ajaxStop(function() {
    //alert('ajaxStop');
  });






// *********************************************************************
// Private
// *********************************************************************


  // -----------------------------------------------------------------------
  function sortItemsByTitle(a,b) {  
      return a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1;  
  } // ---------------------------------------------------------------------



  // -----------------------------------------------------------------------
  buildTaskTree = function(project) {
    if (project.taskSet.length != 0) {

      var e = 0;

      for (var i = 0;  i < project.taskSet.length; i++) {
        var task = project.taskSet[i];

        for (var j = 0;  j < project.taskSet.length; j++) {
          var subtask = project.taskSet[j];
          if (!subtask.isInTree) {
            if (subtask.parentId == "none") {
              project.rootTasks.push(subtask);
            } else if (subtask.parentId == task.id) {
              task.subTasks.push(subtask);
            } 
            subtask.isInTree = true;
          }
        }
      }
    }
  } // ------------------------------------------------------------------




// *********************************************************************
// Public
// *********************************************************************

  this.start = function() {
    self.loadProjects();
  }


  // Project Data Loading
  // -----------------------------------------------------------------------
  this.loadProjects = function() {
    apiController.requestProjects(processProjectList);
    function processProjectList(data) {
      // taskPaneView.clearTaskPane();

      // Sorting??
      //var sortedData = cats = $(data).sort(sortItemsByTitle); 

      for (var i = 0; i < data.items.length; i++) {
        var project = createProject(data.items[i]);
        // alert(project.id + ' | ' + project.title);
        self.dataModel.projectList[project.id] = project;

        self.loadTasks(project);
      }
    }
  } // ---------------------------------------------------------------------




  // task Data Loading
  // -----------------------------------------------------------------------
  this.loadTasks = function(project) {

    function processTaskList(data) {
      // var sortedData = cats = $(data).sort(sortItemsByTitle); 
      // alert('@@@@@@@@');
      project.isLoaded = true;
      delete project.taskSet;
      delete project.rootTasks;
      project.taskSet = new Array;
      project.rootTasks = new Array;

      for (var i = 0; i < data.items.length; i++) {
        var task = new Task(data.items[i]);
        project.taskSet[task.id] = task;
      }
      // buildTaskTree(project);
    }

    apiController.requestTasks(project.id, processTaskList);
  } // ---------------------------------------------------------------------















  // AppData Controls
  // ... 

  // Controlling views
  displayProjectList = function () {
    // alert('displayProjectList');
    projectListView.clearProjectList();
    for (var i = 0; i < projectCollection.length; i++) {
      var project = projectCollection[i];
      projectListView.displayProject(project, projectListItemClick);
    }
  }


  // Event handlers
  projectListItemClick = function (project) {
    toggleSelection(project);
  }


  // Data handlers
  createProject = function (data) {
    self.projectModel = new Project (data);
    return self.projectModel;
  }

  toggleSelection = function (project) {
    project.isSelected = !project.isSelected;

    // TODO - implement as different hide and show functions
    projectListView.updateProjectSelection(project);

    if (project.isSelected) {
      self.reloadProjectTasks(project);
    } else {
      taskPaneView.hideTaskGroup(project.id);
    }
  }  





  this.onTaskListLoad = function(data, project) {
    // var sortedData = cats = $(data).sort(sortItemsByTitle); 
    // alert('@@@@@@@@');
    project.isLoaded = true;
    delete project.taskSet;
    delete project.rootTasks;
    project.taskSet = new Array;
    project.rootTasks = new Array;


    for (var i = 0; i < data.length; i++) {
      var task = new Task(data[i]);
      project.taskSet.push(task);
    }

    buildTaskTree(project);

    taskPaneView.fillTaskGroupRow(project);

    // Collect tasks tree
    // project.rootTasks = project.taskSet;

  }



  this.reloadProjectTasks = function (project) {
    // Request project's tasks with AJAX and call 'onTaskListLoad'
    project.isLoaded = false;
    gDataController.requestTasksJson(project, this.onTaskListLoad);
  }


  buildTaskTree111 = function(project) {
    if (project.taskSet.length != 0) {

      var e = 0;

      for (var i = 0;  i < project.taskSet.length; i++) {
        var task = project.taskSet[i];

        for (var j = 0;  j < project.taskSet.length; j++) {
          var subtask = project.taskSet[j];
          if (!subtask.isInTree) {
            if (subtask.parentId == "none") {
              project.rootTasks.push(subtask);
            } else if (subtask.parentId == task.id) {
              task.subTasks.push(subtask);
            } 
            subtask.isInTree = true;
          }
        }
      }
    }
  }


}