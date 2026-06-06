// Import the Clay package
var Clay = require('@rebble/clay');
var clayConfig = require('./config');

// Initialize Clay with settings options that isolate it from the broken appMessage proxy
var clay = new Clay(clayConfig, null, {
  autoExtractUserKeys: false,
  userData: {
    // Explicit empty function overrides to keep Clay from triggering the native proxy send
    onSave: function() {
      console.log("Saving settings to local storage.");
      localStorage.setItem("BackgroundColor", clay.getItem("BackgroundColor"));
      localStorage.setItem("ForegroundColor", clay.getItem("ForegroundColor"));
    } 
  }
});

// Force override the internal keys map before Clay handles any events
if (clay.messageKeys) {
  clay.messageKeys = {
    "BackgroundColor": 0,
    "ForegroundColor": 1
  };
}
