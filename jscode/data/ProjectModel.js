function Project(json) {
 
    var self = this;

    /* JSON format:
    "kind": "tasks#taskList",
    "id": "MDIxODQ2OTM2MTQ0OTM3MDQ4MTU6MDow",
    "title": "My Tasks",
    "selfLink": "https://www.googleapis.com/tasks/v1/users/@me/lists/MDIxODQ2OTM2MTQ0OTM3MDQ4MTU6MDow"
    */

    // -----------------------------------------------------------------------
    // CONSTRUCTOR
    // -----------------------------------------------------------------------
        this.id = json.id;
        this.title = json.title;
        this.selfLink = json.selfLink;

        this.taskSet = {};
        this.taskTree = {};        

        this.isLoaded = false;
        this.isSelected = false;
        this.isExpanded = true;


    // -----------------------------------------------------------------------
    // Public Methods
    // -----------------------------------------------------------------------

        this.addTasks = function(tasks) {

            for (var i = 0; i < tasks.length; i++) {
                var task = new Task(tasks[i]);

                console.log('  Creating task #' + i + ' ' + task.title);
                self.taskSet[task.id] = task;
            }

            // var sortedData = cats = $(data).sort(sortItemsByTitle); 

            self.taskTree.id = 'none';
            self.taskTree.title = 'root';
            console.log('  Building task tree.');
            attachChildrenToParent(self.taskTree, self.taskSet);
        }


    // -----------------------------------------------------------------------
    // Private members
    // -----------------------------------------------------------------------
    
        function attachChildrenToParent(node, fullList) {
            node.children = {};
            for (itemId in fullList) {
                var item = fullList[itemId];

                if (item.parentId == node.id) {
                    // console.log( '  "' + item.title + '" attached to "' + node.title + '"');
                    node.children[itemId] = item;
                    attachChildrenToParent(item, fullList);
                }
            }
        } // ---------------------------------------------------------------------



    // Sorting
    function sortItemsByTitle(a,b) {  
        return a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1;  
    } // ---------------------------------------------------------------------

 
}