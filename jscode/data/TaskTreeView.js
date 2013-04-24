function TaskTreeView(project, rootNode) {

  var self = this;

  var taskTreeItemIdPrefix = 'taskListItem_';
  var taskGroupNode = $('<div classs="border-bottom"></div>'); 

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

    var taskListHeaderNode = $('<h4 class="border-bottom">' + project.title + '</h4>');
    taskGroupNode.append(taskListHeaderNode);

    var taskListNode = createTaskListNode(project.taskTree.children, true);
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

    
    var checkboxNode = $(   '<label class="checkbox" ' +
                                'style="display: inline; padding-left: 10px;">' + 
                                '<input type="checkbox" style="margin-left:0px; margin-top:2px;">' + 
                            '</label>');
    aNode.append(checkboxNode);

    var taskNameNode = $('<span onclick="return false">' + task.title + '</span>');
    aNode.append(taskNameNode);

    var subtasksNodeId = 'sub_' + task.id;


    var chevronNode = $('<a href="#" onclick="return false"></a>');
    aNode.append(chevronNode);

    var chevronIconNode = $('<i class="icon-chevron-right pull-right" ></i>');
    chevronNode.append(chevronIconNode);


    aNode.append('<span class="badge badge-warning pull-right">Tomorrow</span>');

    var subtasksNode = createTaskListNode(task.children);

    if (task.hasSubtasks) {
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
                    if ( liNode.hasClass('active') ) {
                        chevronIconNode.addClass('icon-white');
                    } else {
                        chevronIconNode.removeClass('icon-white');
                    }
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
            chevronNode.click( 
                        function(e) {
                        e.stopPropagation();
                        subtasksNode.fadeToggle();
                    });
        }



    return liNode;

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