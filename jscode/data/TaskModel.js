function Task(json) {
  
  var self = this;

  /* JSON Sample:
    "kind": "tasks#task",
    "id": "MDIxODQ2OTM2MTQ0OTM3MDQ4MTU6MTgzMTEyMTM2OjMwNTg1NjEwNQ",
    "title": "task 2.3 level 1 description",
    "updated": "2011-10-22T21:34:21.000Z",
    "selfLink": "https://www.googleapis.com/tasks/v1/lists/MDIxODQ2OTM2MTQ0OTM3MDQ4MTU6MTgzMTEyMTM2OjA/tasks/MDIxODQ2OTM2MTQ0OTM3MDQ4MTU6MTgzMTEyMTM2OjMwNTg1NjEwNQ",
    "parent": "MDIxODQ2OTM2MTQ0OTM3MDQ4MTU6MTgzMTEyMTM2OjIyOTkwNDQzNw",
    "position": "00000000001879048191",
    "notes": "Task description\nSecond line",
    "status": "needsAction"  
    "due": "2011-10-25T00:00:00.000Z"
  */

  this.id = json.id;
  this.title = json.title;
  this.updated = json.updated;
  this.selfLink = json.selfLink;
  this.parentId = "none";
  if (json.parent != undefined && json.parent != "") {
    this.parentId = json.parent;
  }
  this.notes = json.notes;
  this.status = json.status;
  this.due = json.due;
  this.dueCustom = {};
  this.dueString = '';

  if (this.due == undefined) {
    // TODO: move to a config?
    this.dueString = "no date";
  } else {
    self.dueCustom = moment(this.due);
    self.dueString = self.dueCustom.format("DD MMM YYYY");
  }
  
  this.subTasks = new Array;
  this.isExpanded = true;
  this.isInTree = false;
  this.hasSubtasks = false;
  this.level = 0;


  this.getSubtasksNumber = function() {
    var size = 0, key;
    for (key in self.subTasks) {
        if (self.subTasks.hasOwnProperty(key)) size++;
    }
    return size;
  }
  
}