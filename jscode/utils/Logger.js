function Logger(state) {

  self = this;
  this.on = state;


  // this.log = console.log.bind(console);

  this.info = function(message) {
    if (this.on) {
      var output = 'Info: ' + message;
      console.log(output);
    }
  }


}

