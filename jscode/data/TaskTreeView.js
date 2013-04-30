function TaskTreeView(project, rootNode, idPrefix) {

    var self = this;
    var taskGroupNode = $(    '<div id="' + 
                            idPrefix + 
                            project.id + 
                            '" class="hide wellz well-small" style="margin-left: 20px; margin-bottom: 30px;"></div>'); 

    var taskTreeRootNodeId = 'taskTreeRootNode_' + project.id;

    var taskNodeIdPrefix = 'taskNode_';


    constructor();

// -----------------------------------------------------------------
// PRIVATE
// -----------------------------------------------------------------

    function constructor() {


        rootNode.append(taskGroupNode);
        taskGroupNode.fadeOut(0);

        var taskListHeaderDivNode = $('<div class="" style="display: block;"></div>');
        taskGroupNode.append(taskListHeaderDivNode);

            var taskListHeaderNode = $('<h4 class="all-caps pull-left">' + project.title + '</h4>');
            taskListHeaderDivNode.append(taskListHeaderNode);

            var taskListBtnBar = $('<div class="btn-toolbar pull-right"></div>');
            taskListHeaderDivNode.append(taskListBtnBar);

                var taskListBtnGrp = $('<div class="btn-group"></div>');
                taskListBtnBar.append(taskListBtnGrp);

                var taskListBtnCollapse = $('<a type="button" class="btn btn-mini" data-toggle="button">Collapse</a>');
                taskListBtnGrp.append(taskListBtnCollapse);

                taskListBtnCollapse.click( 
                                    function(e) {
                                    $('#' + taskTreeRootNodeId).fadeToggle();
                                });

        taskGroupNode.append('<br class="clear-fix"/>');
        taskGroupNode.append('<br class="clear-fix"/>');
        taskGroupNode.append('<br class="clear-fix"/>');
        taskGroupNode.append('<hr class="clear-fix" style="margin-top: -15px;"/>');

        // var taskListNode = createTaskListNode(project.taskTree.children, true, 0);
        // taskGroupNode.append(taskListNode);
    }

    function createTaskListNode(taskSet, root) {


        var ulNode = $('<ul class="nav nav-list bs-docs-sidenav task-tree"></ul>');

        if (!root) ulNode.addClass('indent');

        for (taskId in taskSet) {
            var task = taskSet[taskId];
            var liNode = createTaskNode(task);
            ulNode.append(liNode);
        }
        return ulNode;
    }



    function createTaskNode(task) {
        console.log('createTaskNode called for ' + task.title);

        var taskNodeView = new TaskNode(taskNodeIdPrefix);
        var liNode = taskNodeView.create(task);
        taskNodeView.fillTaskData(task);

        if (task.hasSubtasks) {
            console.log('Requesting subtasks for ' + task.title);
            var subtasksNode = createTaskListNode(task.children);
            taskNodeView.addChildren(task, subtasksNode);
        }


        return liNode;
    }






// -----------------------------------------------------------------
// PUBLIC
// -----------------------------------------------------------------

    this.update = function(update) {
        var taskListNode = createTaskListNode(project.taskTree.children, true, 0);
        taskListNode.attr('id', taskTreeRootNodeId);
        taskGroupNode.append(taskListNode);        
    }


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