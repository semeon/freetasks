// DEPRECATED 
function DataModel() {

    var self = this;

    this.projectList = {};



    this.resetTask = function(task) {

    }


    this.createTask = function(project, json) {

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
    }



    this.createProject = function(json) {
        /* JSON source format:
            "kind": "tasks#taskList",
            "id": "MDIxODQ2OTM2MTQ0OTM3MDQ4MTU6MDow",
            "title": "My Tasks",
            "selfLink": "https://www.googleapis.com/tasks/v1/users/@me/lists/MDIxODQ2OTM2MTQ0OTM3MDQ4MTU6MDow"
        */

        var project = self.projectList[json.id];

        if (project == undefined) {
            console.log('- creating..');

            project = {};
            self.projectList[json.id] = project;
            self.resetProject(project);
        } else {
            console.log('- already exist..');
        }
    }


    this.Project = function(json) {
        console.log('Project creation called for ' + json.title);

        var self = this;

        /* JSON format:
        "kind": "tasks#taskList",
        "id": "MDIxODQ2OTM2MTQ0OTM3MDQ4MTU6MDow",
        "title": "My Tasks",
        "selfLink": "https://www.googleapis.com/tasks/v1/users/@me/lists/MDIxODQ2OTM2MTQ0OTM3MDQ4MTU6MDow"
        */

        self.id = json.id;
        self.title = json.title;
        self.selfLink = json.selfLink;
        self.reset();


        this.reset() {
            console.log('Reseting project ' + project.title);
            self.taskSet = {};
            self.taskTree = {};        

            self.isLoaded = false;
            self.isSelected = false;
            self.isExpanded = true;

        }

    }


}