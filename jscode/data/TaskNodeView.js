function TaskNode (taskNodeIdPrefix, eventHandler) {

    var self = this;
    var idPrefix = taskNodeIdPrefix;
    var handler = eventHandler;
    var shortTaskNameLength = 65;

    // Nodes
    // ------------------
        var liNode;
        var aNode;
        var chevronNode;
        var chevronIconNode;
        var checkboxNode;
        var taskNameNode;
        var dueNode;
        var subtasksUlNode;


    this.create = function(task) {
        console.log('Creating empty node for ' + task.title);

        liNode = $('<li class="" id="' + idPrefix + task.id + '"></li>');
        aNode = $('<a href="#" onclick="return false"></a>');
        liNode.append(aNode);

        // if (task.hasSubtasks) {
        //     subtasksUlNode = $('<ul class="nav nav-list bs-docs-sidenav task-tree"></ul>');
        //     liNode.append(subtasksUlNode);
        // }
        return liNode;
    }

    this.fillTaskData = function(task) {
        console.log('Filling node for ' + task.title);
        liNode.fadeOut();

        aNode.empty();

        // Checkbox
            checkboxNode = $(   '<label class="checkbox" ' +
                                        'style="display: inline; padding-left: 10px;">' + 
                                        '<input type="checkbox" style="margin-left:0px; margin-top:2px;">' + 
                                    '</label>');
            aNode.append(checkboxNode);


        // Chevrone
            if (task.hasSubtasks) {
                chevronNode = $('<div onclick="return false" class="pull-left" ' + 
                                    'style="margin-left: -45px; width: 25px; height: 10px;"></div>');
                chevronNode.attr('title', 'Expand or collapse subtasks');

                chevronIconNode = $('<i class="pull-left"></i>');
                chevronIconNode.addClass('icon-chevron-down');

                chevronNode.append(chevronIconNode);
                aNode.append(chevronNode);
            }


        // Task name
            var length = shortTaskNameLength - task.level*3;
            var taskShortName = task.title;
            if (taskShortName.length > length) {
                taskShortName = taskShortName.substring(0, length-5);
                taskShortName = taskShortName + '...'
            }

            taskNameNode = $('<span onclick="return false" title="' + task.title + '">' + taskShortName + '</span>');
            aNode.append(taskNameNode);


        // Due date
            if (task.due != undefined ) {
                var dueDate = moment(task.due);
                var dueDateFriendly = moment(task.due).format("MMM Do");

                dueNode = $('<span class="badge pull-right">' + dueDateFriendly + '</span>');

                var now = moment(Date());
                var tomorrow = moment(Date()).add('days', 1);
                var nextWeek = moment(Date()).add('days', 7);


                if ( dueDate.isSame(now, 'day') ) {
                    dueNode.addClass('badge-success');
                    
                } else if ( dueDate.isBefore(now, 'day') ) {
                    dueNode.addClass('badge-important');

                } else if ( dueDate.isBefore(tomorrow, 'day') ) {
                    dueNode.addClass('badge-success');
              
                } else if ( dueDate.isBefore(nextWeek, 'day') ) {
                    // dueNode.addClass('badge-success');
                }
                aNode.append(dueNode);
            }
        


        bindEvents(task);
        liNode.fadeIn();
    }

    this.addChildren = function(task, subtasksNode) {


        console.log('Adding children to ' + task.title);

        if (task.hasSubtasks) {
            console.log('.addChildren: has children');

            var subtasksNodeId = 'sub_' + task.id;
            chevronNode.attr('title', 'Expand or collapse subtasks');
            chevronIconNode.addClass('icon-chevron-down');

            subtasksNode.attr('id', subtasksNodeId);
            subtasksNode.addClass('collapse');
            subtasksNode.addClass('in');
            liNode.append(subtasksNode);

            // Chevron click (expand/collapse subtasks)
            chevronNode.click( 
                        function(e) {
                        e.stopPropagation();
                        toggleSubtasks(task, subtasksNode, chevronIconNode);
                    });
        }

    }


    // private functions
    // ------------------------------------

        function bindEvents(task) {
            // Selecting a task - class="active"
            aNode.click( 
                        function() {
                        liNode.toggleClass('active');
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



        }

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