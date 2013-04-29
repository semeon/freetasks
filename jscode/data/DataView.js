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
    this.fillTaskTree = function(project) {
    console.log('Starting displayTaskTree for ' + project.id);

        var taskTree = taskGroups[project.id];
        taskTree.update(project);

    }
    // -------------------------------------------------------------------------

    // -------------------------------------------------------------------------
    this.createTaskTreesList = function(projects) {
        console.log('Starting createTaskTreesList');

        if(!taskListDisplayed) self.displayTaskListPane();
        var rootNode = $('#taskPaneRoot');

        for (p in projects) {
            var project = projects[p];
            var taskGroup = new TaskTreeView(project, rootNode, taskTreeNodeIdPrefix); 
            taskGroups[project.id] = taskGroup;
        }
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
            return li;
        }

    }
    // -------------------------------------------------------------------------


    // -------------------------------------------------------------------------
    this.updateProjectListItem = function(project, handler) {
        console.log('Starting displayProjectListItem for ' + project.id);
        var li = $('#' + listItemIdPrefix + project.id);
        var taskNumber = project.tasks.length;

        var a = $('<a href="#" onclick="return false">' + project.title + ' (' + taskNumber + ') <i class="icon-chevron-right pull-right"></i></a>'); 

        li.append(a);
        a.bind('click', 
                        function() {
                            // alert('CLICK...');
                            handler(project);
                        });


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