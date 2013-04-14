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

    var taskTreeNode = $('<div class="well well-small">Task Tree ...</div>');
    taskGroupNode.append(taskTreeNode);

    // Use COLLAPSE for task body and edit
    // http://twitter.github.io/bootstrap/javascript.html#collapse


    // Try MEDIA for nested tasks
    // http://twitter.github.io/bootstrap/components.html#media

    html = '';
    html = html + '<ul class="nav nav-tabs nav-stacked">';
    html = html +   '<li>';
    html = html +     '<a href="#"><i class="icon-chevron-down"></i> Task 1 </a>';
    html = html +   '</li>';
    html = html +   '<li>';
    html = html +     '<a href="#" style="margin-left:20px;"><i class="icon-chevron-down"></i> Task 2</a>';
    html = html +   '</li>';
    html = html +   '<li>';
    html = html +     '<a href="#" style="margin-left:40px;"><i class="icon-chevron-down"></i> Task 3</a>';
    html = html +   '</li>';
    html = html +   '<li>';
    html = html +     '<a href="#" style="margin-left:60px;"><i class="icon-chevron-right"></i> Task 3</a>';
    html = html +   '</li>';
    html = html + '</ul>';

    html = html + '<ul class="nav nav-pills nav-stacked">';
    html = html +   '<li class="active">';
    html = html +     '<a href="#" ><i class="icon-chevron-down"></i> Task 3</a>';
    html = html +   '</li>';
    html = html +   '<li>';
    html = html +     '<a href="#" style="margin-left:20px;"><i class="icon-chevron-down"></i> Task 3</a>';
    html = html +   '</li>';
    html = html +   '<li>';
    html = html +     '<a href="#" style="margin-left:40px;"><i class="icon-chevron-right"></i> Task 3</a>';
    html = html +   '</li>';
    html = html + '</ul>';

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