function PageView() {
  
  var self = this;
 
  var mainRow = $('#mainRow');
  var welcomeBanner = $('#welcomeBanner');


// ************************************************************************************************
// Private
// ************************************************************************************************
  function pleaseLoginMessage () {
    $.pnotify({
              text: 'Please login to Google to see your projects and tasks',
              history: false
            });
  }

  function loggedInMessage () {
    $.pnotify({
              text: 'You are logged in to Google.',
              type: 'success',
              history: false
            });
  }


// ************************************************************************************************
// Public
// ************************************************************************************************

  this.showMessage = function(title, text, type) {
    $.pnotify({
              title: title,
              text: text,
              type: type,
              history: false
            });

  }

  // Logged out ---------------------------------------
  this.displayNotLoggedInMessage = function() {
    $(pleaseLoginMessage);    
  }

  this.showWelcomeBanner = function() {
    welcomeBanner.removeClass('hide');    
  }



  // Logged in ----------------------------------------
  this.displayLoggedInMessage = function() {
    $(loggedInMessage);    
  }

  this.displayMainRow = function() {
    mainRow.removeClass('hidden');
  }


  
}
