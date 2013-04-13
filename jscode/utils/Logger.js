function Logger(state) {

  self = this;
  this.on = state;

  this.info = function(message) {
    if (this.on) {
      var output = 'Info: ' + message;
      console.log(output);
    }
  }


}