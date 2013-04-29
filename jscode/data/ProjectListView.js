function ProjectListView() {

  var self = this;
  
  var listItemIdPrefix = 'projectListItem_';

  // Page elements
  var projectListUl = $('#projectListPane');

  this.clearProjectList = function() {
    // alert('Clear project list');
    projectListUl.empty();
  }

  this.displayProject = function(project, handler) {
    // alert('displayProject: ' + project.title);

    // <li class="active"><a href="#"><i class="icon-briefcase"></i> Business</a></li>
    // <li><a href="#"><i class="icon-picture"></i> Art</a></li>

    // <li class="active"><a href="#">Business</a></li>
    // <li><a href="#"><i class="icon-picture"></i> Art</a></li>

    var li = $('<li></li>'); 
    var liId = listItemIdPrefix + project.id;
    li.attr('id', liId);

    if (project.isSelected) {
      li.addClass('active');
    }

    var a = $('<a href="#" onclick="return false">' + project.title + '</a>'); 
    // var a = $('<a>' + project.title + '</a>'); 
    a.bind('click', 
            function() {
              alert('CLICK...');
              handler(project);
            });

    li.append(a);
    projectListUl.append(li);
  }


  this.updateProjectSelection = function(project) {
    var selector ='#' + listItemIdPrefix + project.id;
    // alert(selector);
    var li = $(selector);

    if (li.hasClass('active')) {
      li.removeClass('active');
    }

    if (project.isSelected) {
      li.addClass('active');
    }
  }
    	
}



















