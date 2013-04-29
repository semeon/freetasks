function TaskTreeView(project, rootNode, idPrefix) {

  var self = this;

  var shortTaskNameLength = 65;

  var taskGroupNode = $('<div id="' + idPrefix + project.id + '" class="hide" style="margin-left: 20px; margin-bottom: 40px;"></div>'); 

  constructor();

// -----------------------------------------------------------------
// PRIVATE
// -----------------------------------------------------------------

    // <ul id="" class="nav nav-pills nav-stacked">

    //   <li class="nav-header">Project #1</li>

    //   <li class="hide active" style="display: list-item;">
    //     <a href="#" onclick="return false">
    //       <input type="checkbox"/>
    //       <span>5 test</span>
    //       <i class="icon-chevron-right pull-right"></i>
    //       <span class="badge badge-warning pull-right">Tomorrow</span>
    //     </a>
    //   </li>

    //   <li class="hide active" style="display: list-item;">
    //     <a href="#" onclick="return false">1 test project <i class="icon-chevron-right pull-right"></i></a></li>

    //   <li class="hide" style="display: list-item;">
    //     <a href="#" onclick="return false">4 test <i class="icon-chevron-right pull-right"></i></a></li>

    //   <li class="hide" style="display: list-item;">
    //     <a href="#" onclick="return false">a test project <i class="icon-chevron-right pull-right"></i></a></li>
    // </ul>

function constructor() {


    rootNode.append(taskGroupNode);
    taskGroupNode.fadeOut(0);

    var taskListHeaderNode = $('<h4 class="all-caps">' + project.title + '</h4>');
    taskGroupNode.append(taskListHeaderNode);

    var taskListNode = createTaskListNode(project.taskTree.children, true, 0);
    taskGroupNode.append(taskListNode);
}

function createTaskListNode(taskSet, root) {


    var ulNode = $('<ul class="nav nav-list bs-docs-sidenav task-tree">');

    if (!root) ulNode.addClass('indent');

    for (taskId in taskSet) {
        var task = taskSet[taskId];
        var liNode = createTaskNode(task);
        ulNode.append(liNode);
    }


    return ulNode;
}



function createTaskNode(task) {

    //   <li class="hide active" style="display: list-item;">
    //     <a href="#" onclick="return false">
    //       <input type="checkbox"/>
    //       <span>5 test</span>
    //       <i class="icon-chevron-right pull-right"></i>
    //       <span class="badge badge-warning pull-right">Tomorrow</span>
    //     </a>
    //   </li>

    var liNode = $('<li class="" id="task_' + task.id + '"></li>');

    var aNode = $('<a href="#" onclick="return false"></a>');
    liNode.append(aNode);


    var chevronNodeLeft = $('<div onclick="return false" class="pull-left" style="margin-left: -35px; width: 25px; height: 10px;"></div>');
    aNode.append(chevronNodeLeft);
    var chevronIconNodeLeft = $('<i class="pull-left"></i>');
    chevronNodeLeft.append(chevronIconNodeLeft);

    
    var checkboxNode = $(   '<label class="checkbox" ' +
                                'style="display: inline; padding-left: 10px;">' + 
                                '<input type="checkbox" style="margin-left:0px; margin-top:2px;">' + 
                            '</label>');
    aNode.append(checkboxNode);


    var length = shortTaskNameLength - task.level*3;
    var taskShortName = task.title;
    if (taskShortName.length > length) {
        taskShortName = taskShortName.substring(0, length-5);
        taskShortName = taskShortName + '...'
    }


    var taskNameNode = $('<span onclick="return false" title="' + task.title + '">' + taskShortName + '</span>');
    aNode.append(taskNameNode);

    var subtasksNodeId = 'sub_' + task.id;


    // var chevronNode = $('<div onclick="return false" class="pull-right" style="width: 25px; height: 10px;"></div>');
    // aNode.append(chevronNode);
    // var chevronIconNode = $('<i class="pull-right"></i>');
    // chevronNode.append(chevronIconNode);

    aNode.append('<span class="badge badge-warning pull-right">Tomorrow</span>');

    var subtasksNode = createTaskListNode(task.children);

    if (task.hasSubtasks) {
        chevronNodeLeft.attr('title', 'Expand or collapse subtasks')
        chevronIconNodeLeft.addClass('icon-chevron-down');

        subtasksNode.attr('id', subtasksNodeId);
        subtasksNode.addClass('collapse');
        subtasksNode.addClass('in');
        liNode.append(subtasksNode);
    }

    // Binding event handlers
    // ----------------

        // Selecting a task - class="active"
        aNode.click( 
                    function() {
                    liNode.toggleClass('active');
                    // if ( liNode.hasClass('active') ) {
                    //     chevronIconNodeLeft.addClass('icon-white');
                    // } else {
                    //     chevronIconNodeLeft.removeClass('icon-white');
                    // }
                });


        // Checkbox click
        checkboxNode.click( 
                    function(e) {
                    e.stopPropagation();
                    console.log('Checked');
                });

        // Task name click
        taskNameNode.click( 
                    function(e) {
                    e.stopPropagation();
                    console.log('Task Edit');
                });

        // Chevron click (expand/collapse subtasks)
        if (task.hasSubtasks) {
            chevronNodeLeft.click( 
                        function(e) {
                        e.stopPropagation();
                        toggleSubtasks(task, subtasksNode, chevronIconNodeLeft);
                    });
        }


    return liNode;

    function toggleSubtasks (task, subtasksNode, chevronIconNode) {

        // Collapse
        if(task.isExpanded) {
            task.isExpanded = false;
            subtasksNode.fadeOut(200);
            chevronIconNode.removeClass('icon-chevron-down');
            chevronIconNode.addClass('icon-chevron-right');

        // Expand
        } else if(!task.isExpanded) {
            task.isExpanded = true;
            subtasksNode.fadeIn(200);
            chevronIconNode.removeClass('icon-chevron-right');
            chevronIconNode.addClass('icon-chevron-down');
        }

    }


}




// -----------------------------------------------------------------
// PUBLIC
// -----------------------------------------------------------------

  this.show = function() {
    taskGroupNode.fadeIn();
  }

  this.hide = function() {
    taskGroupNode.fadeOut();
  }

  this.expand = function() {

  }

  this.collapse = function() {
    
  }


}