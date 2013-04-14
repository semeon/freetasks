function DataEventHandler(dataView) {

  // $(document).ajaxStart(function() {
  //   if (firstDataLoad) {
  //     // pageController.dataLoadStarted();
  //   }
  //  });

  // $(document).ajaxStop(function() {
  //   if (firstDataLoad && !dataLoadErrorOccured) {
  //     pageController.displayPage();      
  //     // pageController.dataLoadCompleted();
  //   }

  //   firstDataLoad = false;
  // });

  this.taskListLoaded = function(project) {
    console.log('Project loaded event called.');
    dataView.displayProjectListItem(project, taskListItemClick);
  }

  function taskListItemClick (project) {
    project.isSelected = !project.isSelected;
    dataView.updateProjectSelection(project);
  }

}