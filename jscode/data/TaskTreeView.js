function TaskTreeView(project, rootNode) {

  var self = this;

  var taskTreeItemIdPrefix = 'taskListItem_';
  var taskGroupNode = $('<div class="border-bottom"></div>'); 

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

    var taskListNode = createTaskListNode(project.taskTree.children, true);
    taskGroupNode.append(taskListNode);



}

function createTaskListNode(taskSet, root) {


    var ulNode = $('<ul class="nav nav-pills nav-stacked" style="margin-bottom: 10px;">');

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
    aNode.click( 
                function() {
                liNode.toggleClass('active');
            });
    
    var checkboxNode = $(   '<label class="checkbox" ' +
                                'style="display: inline; padding-left: 10px; min-height: 14px; line-height: 18px;">' + 
                                '<input type="checkbox" style="margin-left:0px; margin-top:2px;">' + 
                            '</label>');
    aNode.append(checkboxNode);
    checkboxNode.click( 
                function(e) {
                e.stopPropagation();
                console.log('Checked');
            });

    var taskNameNode = $('<span onclick="return false">' + task.title + '</span>');
    aNode.append(taskNameNode);
    taskNameNode.click( 
                function(e) {
                e.stopPropagation();
                console.log('Task Edit');
            });

    var subtasksNodeId = 'sub_' + task.id;
    var chevronNode = $('<a href="#" data-toggle="collapse" data-target="#' + subtasksNodeId + '">' +
                            '<i class="icon-chevron-right pull-right" ></i></a>');
    aNode.append(chevronNode);


    aNode.append('<span class="badge badge-warning pull-right">Tomorrow</span>');

    if (task.hasSubtasks) {
        var subtasksNode = createTaskListNode(task.children);
        subtasksNode.attr('id', subtasksNodeId);
        subtasksNode.addClass('collapse');
        subtasksNode.addClass('in');
        liNode.append(subtasksNode);
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