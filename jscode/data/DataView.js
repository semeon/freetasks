function DataView(settings, eventHandler, pageController) {

    var self = this;

    var projectListDisplayed = false;
    var taskListDisplayed = false;

    var projectListRootNodeId = 'projectListRoot';

    var listItemIdPrefix = 'projectListItem_';
    var taskTreeNodeIdPrefix = 'projectTaskTreeNode_';


    var taskGroups = {};


// -------------------------------------------------------------------------
// TASK TREE PANE
// -------------------------------------------------------------------------

  // -------------------------------------------------------------------------
  this.createTaskTree = function(project) {
    console.log('Starting displayTaskTree for ' + project.id);

  	if(!taskListDisplayed) self.displayTaskListPane();

  	var rootNode = $('#taskPaneRoot');
    var taskGroup = new TaskTreeView(project, rootNode, taskTreeNodeIdPrefix); 
    taskGroups[project.id] = taskGroup;

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
    this.createProjectList = function(projects, handler) {
        console.log('Starting createProjectList');

        if(!projectListDisplayed) self.displayProjectListPane();

        for (p in projects) {
            var project = projects[p];
            var root = $('#' + projectListRootNodeId);
            var liNode = createItemNode (project, handler); 
            root.append(liNode);
            self.updateProjectSelection(project);

        }

        function createItemNode (proj, hand) {
            var li = $('<li class="hide"></li>'); 
            li.attr('id', listItemIdPrefix + proj.id);

            var a = $('<a href="#" onclick="return false">' + proj.title + ' <i class="icon-chevron-right pull-right"></i></a>'); 
            li.append(a);

            a.bind('click', 
                            function() {
                                // alert('CLICK...');
                                hand(proj);
                            });

            return li;
        }

    }
    // -------------------------------------------------------------------------


    // -------------------------------------------------------------------------
    this.displayProjectListItem = function(project) {
        console.log('Starting displayProjectListItem for ' + project.id);
        var li = $('#' + listItemIdPrefix + project.id);
        li.fadeIn();
    }
    // -------------------------------------------------------------------------


  // -------------------------------------------------------------------------
  this.updateProjectSelection = function(project) {
    var projectListItemSelector ='#' + listItemIdPrefix + project.id;
    var taskTreeNodeSelector ='#' + taskTreeNodeIdPrefix + project.id;

    if (project.isSelected) {
      $(projectListItemSelector).addClass('active');
      $(taskTreeNodeSelector).fadeIn();

    } else {
      $(projectListItemSelector).removeClass('active');
      $(taskTreeNodeSelector).fadeOut();

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