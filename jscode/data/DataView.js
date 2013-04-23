function DataView(settings, eventHandler, pageController) {

  var self = this;

  var projectListDisplayed = false;
  var taskListDisplayed = false;
	var listItemIdPrefix = 'projectLisItem_';

  var taskGroups = {};


// -------------------------------------------------------------------------
// TASK TREE PANE
// -------------------------------------------------------------------------

  // -------------------------------------------------------------------------
  this.createTaskTree = function(project) {
    console.log('Starting displayTaskTree for ' + project.id);

  	if(!taskListDisplayed) self.displayTaskListPane();

  	var rootNode = $('#taskPaneRoot');
    var taskGroup = new TaskTreeView(project, rootNode); 
    taskGroups[project.id] = taskGroup;

    taskGroup.show();


  }
  // -------------------------------------------------------------------------

  // -------------------------------------------------------------------------
  this.displayTaskListPane = function() {
    console.log('! Starting displayTaskListPane');
  	$('#taskListPane').fadeIn();
 		taskListDisplayed = true;
  }
  // -------------------------------------------------------------------------



// -------------------------------------------------------------------------
// PROJECT LIST PANE
// -------------------------------------------------------------------------

  // -------------------------------------------------------------------------
  this.displayProjectListItem = function(project, handler) {
    console.log('Starting displayProjectListItem for ' + project.id);

  	if(!projectListDisplayed) self.displayProjectListPane();

  	var root = $('#projectListRoot');
    var li = $('<li class="hide"></li>'); 
    var liId = listItemIdPrefix + project.id;
    var a = $('<a href="#" onclick="return false">' + project.title + ' <i class="icon-chevron-right pull-right"></i></a>'); 

		root.append(li);
    li.attr('id', liId);
    self.updateProjectSelection(project);
	  a.bind('click', 
	          function() {
	            // alert('CLICK...');
	            handler(project);
	          });
    li.append(a);
		li.fadeIn();

    self.createTaskTree(project);
  }
  // -------------------------------------------------------------------------


  // -------------------------------------------------------------------------
  this.updateProjectSelection = function(project) {
    var selector ='#' + listItemIdPrefix + project.id;
    var li = $(selector);

    li.removeClass('active');
    if (project.isSelected) {
      li.addClass('active');
    }

  }
  // -------------------------------------------------------------------------


  // -------------------------------------------------------------------------
  this.displayProjectListPane = function() {
    console.log('! Starting displayProjectListPane');
  	$('#projectListPane').fadeIn();
 		projectListDisplayed = true;
  }
  // -------------------------------------------------------------------------


}