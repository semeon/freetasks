function Project(json) {
 
  var self = this;

  /* JSON format:
   "kind": "tasks#taskList",
   "id": "MDIxODQ2OTM2MTQ0OTM3MDQ4MTU6MDow",
   "title": "My Tasks",
   "selfLink": "https://www.googleapis.com/tasks/v1/users/@me/lists/MDIxODQ2OTM2MTQ0OTM3MDQ4MTU6MDow"
  */
 
  this.id = json.id;
  this.title = json.title;
  this.selfLink = json.selfLink;
  this.taskSet = new Array;
  this.rootTasks = new Array;

  this.isLoaded = false;
  this.isSelected = false;
  this.isExpanded = true;

 
}