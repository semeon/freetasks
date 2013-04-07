function TaskPaneView() {

  self = this;

  var taskGroupRowPrefix = 'taskGroup_';
  var taskRowPrefix = 'task_';
  var taskPaneDiv = $('#taskPane');

  this.clearTaskPane = function() {
    taskPaneDiv.empty();
  }

  this.hideTaskGroup = function (id) {
    var selector = '#' + taskGroupRowPrefix + id; 
    // alert(selector);
    $(selector).empty();
  }

  this.appendEmptyTaskGroupRow = function(id) {
    var rowDiv = $('<div class="row-fluid"></div>');
    rowDiv.attr('id', taskGroupRowPrefix + id);

    taskPaneDiv.append(rowDiv);
  }

  this.fillTaskGroupRow = function(project) {
    var selector = '#' + taskGroupRowPrefix + project.id;
    var rowDiv = $(selector);
    
    var content = createTaskGroupContent(project);
    rowDiv.append(content);
  }

  createTaskGroupContent = function(project) {
    var containerDiv = $('<div class="span12 wellx well-small"></div>');

    var taskGroupHeader = createTaskGroupHeader(project);
    containerDiv.append(taskGroupHeader);

    if (project.isExpanded) {
      var tasks = createTasksList(project);
      containerDiv.append(tasks);
    }

    return containerDiv;
  }


  createTaskGroupHeader = function(project) {
    var html = '';
    html = html + '<div class="row-fluid">';
    html = html +   '<div class="span3">';
    html = html +     '<strong>' + project.title + '</strong>';
    html = html +   '</div>';
    html = html +   '<div class="span9">';
    html = html +     '<div class="btn-toolbar pull-right no-margin">';
    html = html +       '<a class="btn btn-mini btn-primary" href="#">Add new task</a>';
    html = html +       '<div class="btn-group">';
    html = html +         '<a class="btn btn-mini" href="#" onclick="return false;" rel="tooltip" title="Hide project">Collapse</a>';
    html = html +         '<a class="btn btn-mini" href="#" onclick="return false;" rel="tooltip" title="Hide project">Hide</a>';
    html = html +       '</div>';
    html = html +     '</div>';
    html = html +   '</div>';
    html = html + '</div>';

    if (project.isExpanded) {
      html = html + '<hr/>';
    }

    var resultNode = $(html);
    return resultNode;
  }

  createTasksList = function(project) {
    var taskTreeDiv = $('<div class="row-fluid taskTree"></div>');
    var taskTreeSpan12 = $('<div class="span12"></div>');
    taskTreeDiv.append(taskTreeSpan12);

    for (var i = 0; i < project.rootTasks.length; i++) {
      var taskRow = createTaskRow(project.rootTasks[i]);
      taskTreeSpan12.append(taskRow);
    }

    return taskTreeDiv;
  }


  createTaskRow = function(task){
    var html = '<div class="row-fluid taskRow" id="' + taskRowPrefix + task + '"></div>';
    var resultNode = $(html);
    var contentNode = createTaskRowContent(task);
    resultNode.append(contentNode);

    return resultNode;
  }

  createTaskRowContent = function(task){

    // Use navs like here with margins for task rows:
    // http://twitter.github.io/bootstrap/components.html#navs

    var html = '';
    html = html + '<div class="span1">';
    html = html + '   <button class="btn btn-mini pull-right btn-link" style="margin-top: 10px;" href="#" onclick="return false;">';
    html = html + '      <i class="icon-chevron-right"></i>';
    html = html + '   </button>';
    html = html + '</div>';
    html = html + '<div class="span10 well well-small">';
    html = html + '   <button class="btn btn-mini btn-primary"><i class="icon-check icon-white"></i></button>';
    html = html + '   &nbsp;';
    html = html + '   <span class="taskName">' + task.title + '</span>';

    if (task.dueString != 'no date') {
      var today = new Date();
      var todayWrapper = moment([today.getFullYear(), today.getMonth(), today.getDate()]);
      var diff = task.dueCustom.diff(todayWrapper, 'days');
      var badgeClass = '';
      if (diff < 0) {
        // OVERDUE
        badgeClass = 'badge-warning';
      } else if (diff == 0) {
        // TODAY
        badgeClass = 'badge-success';
      } else if (diff == 1) {
        // TOMORROW
        badgeClass = 'badge-success';
      } else if (diff < 7) {
        // NEXT WEEK
        badgeClass = 'badge-info';
      }

      html = html + ' <span class="badge pull-right ' + badgeClass + '">' + task.dueString + '</span>';
    }
    html = html + '</div>';

    html = html + '<div class="span1 -well well-small">';
    html = html + '    <div class="btn-toolbar pull-right taskViewControls no-margin">';
    html = html + '      <div class="btn-group">';
    html = html + '        <button class="btn btn-mini" href="#"><i class="icon-pencil"></i></button>';
    html = html + '       <button class="btn btn-mini" href="#"><i class="icon-trash"></i></button>';
    html = html + '     </div>';           
    html = html + '   </div>';
    html = html + '</div>';

    var resultNode = $(html);
    return resultNode;
  }



}