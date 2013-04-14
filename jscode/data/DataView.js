function DataView(settings, eventHandler, pageController) {

  var self = this;

  var projectListDisplayed = false;
	var listItemIdPrefix = 'projectLisItem_';


  this.displayProjectListPane = function() {
    console.log('! Starting displayProjectListPane');
  	$('#projectListPane').fadeIn();
 		projectListDisplayed = true;
  }



  this.displayProjectListItem = function(project, handler) {
    console.log('Starting displayProjectListItem for ' + project.id);

  	if(!projectListDisplayed) self.displayProjectListPane();

  	var root = $('#projectListRoot');
    var li = $('<li class="hide"></li>'); 
    var liId = listItemIdPrefix + project.id;
    var a = $('<a href="#" onclick="return false">' + project.title + ' <i class="icon-chevron-right pull-right"></i></a>'); 

		root.append(li);
    li.attr('id', liId);
    self.updateProjectSelection(project);
	  a.bind('click', 
	          function() {
	            // alert('CLICK...');
	            handler(project);
	          });
    li.append(a);
		li.fadeIn();
  }

  this.updateProjectSelection = function(project) {
    var selector ='#' + listItemIdPrefix + project.id;
    var li = $(selector);

    li.removeClass('active');
    if (project.isSelected) {
      li.addClass('active');
    }

  }



}