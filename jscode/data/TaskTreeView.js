function TaskTreeView(project, rootNode) {

  var self = this;

  var taskTreeItemIdPrefix = 'taskLisItem_';
  var taskGroupNode = $('<div class="hide"></div>'); 

  constructor();

// -----------------------------------------------------------------
// PRIVATE
// -----------------------------------------------------------------

  function constructor() {
    rootNode.append(taskGroupNode);

    var divId = taskTreeItemIdPrefix + project.id;
    taskGroupNode.attr('id', divId);

    var titleNode = $('<span class="pulls-left"><strong>' + project.title + '</strong></span>');
    taskGroupNode.append(titleNode);

    var html = '';
    html = html +     '<div class="btn-toolbar pull-right no-margin">';
    html = html +       '<div class="btn-group">';
    html = html +         '<a class="btn btn-mini" href="#">Add new task</a>';
    html = html +         '<a class="btn btn-mini" href="#" onclick="return false;" rel="tooltip" title="Hide project">Collapse</a>';
    html = html +         '<a class="btn btn-mini" href="#" onclick="return false;" rel="tooltip" title="Hide project">Hide</a>';
    html = html +       '</div>';
    html = html +     '</div>';

    var taskGroupControlsNode = $(html);
    taskGroupNode.append(taskGroupControlsNode);

    taskGroupNode.append('<br class="clearfix"/>');

    var taskTreeNode = $('<div class="wells well-small">Task Tree ...</div>');
    taskGroupNode.append(taskTreeNode);

    // Use COLLAPSE for task body and edit
    // http://twitter.github.io/bootstrap/javascript.html#collapse


    // Try MEDIA for nested tasks
    // http://twitter.github.io/bootstrap/components.html#media

    html = '';

    html = html + '<ul class="nav nav-pills nav-stacked">';
    html = html +   '<li class="active">';
    html = html +     '<a href="#" ><i class="icon-chevron-down"></i> <input type="checkbox"> Task 3</a>';
    html = html +   '</li>';
    html = html +   '<li>';
    html = html +     '<a href="#" style="margin-left:20px;"><i class="icon-chevron-down"></i> <i class="icon-check"></i> Task 23</a>';
    html = html +   '</li>';
    html = html +   '<li class="active">';
    html = html +     '<a href="#" style="margin-left:40px;"><i class="icon-chevron-right"></i> Task 3';

    html = html +     '</a>';

    html = html +   '</li>';

    html = html +   '<li class="active">';
    html = html +       '<a href="#" style="margin-left:40px;">' +
                            '<i class="icon-chevron-right"></i> Task xxx' +

                        '</a>' +

                    '</li>';


    html = html + '</ul>';

    // ACCORDEON
    //  Full task list - accordeon
    //  Each task - accordeon group
    //  Accordeon body - task-edit interface
    //  Exapnding subtasks - custom button with event
    // 


    html = html +   '<div class="accordion" id="accordion2">' +
                        '<div class="accordion-group">' +
                            '<div class="accordion-heading clearfix" title="Select task">' +
                                '<a class="accordion-toggle pull-left" data-toggle="collapse" ' +
                                    ' data-parent="#accordion2" href="#task2"  style="display:inline;">' +
                                    '<i class="icon-chevron-down"></i>' +
                                '</a>' +

                                '<span class="pull-left" title="Edit task"' +
                                    ' style="display:inline;">' +
                                    'Collapsible Group Item #1' +
                                '</span>' +                                

                                '<div class="btn-toolbar pull-right" >' +
                                    '<div class="btn-group">' +
                                        '<a class="btn btn-mini" href="#" data-toggle="button"><i class="icon-check"></i></a>' +
                                        '<a class="btn btn-mini" href="#">Add subtask</a>' +
                                    '</div>' +
                                '</div>' +


                            '</div>' +
                            '<div id="collapseOne" class="accordion-body collapse">' +
                                '<div class="accordion-inner">' +
                                    'DDDDDDDDDD' +
                                '</div>' +
                            '</div>' +
                        '</div>' +


                        '<div class="accordion-group" id="task2" style="margin-left:20px;">' +
                            '<div class="accordion-heading">' +
                                '<a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapse2">' +
                                    'Collapsible Group Item #2' +
                                '</a>' +
                            '</div>' +
                            '<div id="collapse2" class="accordion-body collapse">' +
                                '<div class="accordion-inner">' +
                                    'Anim pariatur cliche...' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                


                    '</div>';



    taskTreeNode.append(html);



    taskGroupNode.append('<br class="clearfix"/>');
    taskGroupNode.append('<br class="clearfix"/>');

    // self.updateProjectSelection(project);
    // a.bind('click', 
    //         function() {
    //           // alert('CLICK...');
    //           handler(project);
    //         });
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