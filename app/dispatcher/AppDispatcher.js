import {Dispatcher} from 'flux';

// Create dispatcher instance
var AppDispatcher = new Dispatcher();

// Convenience method to handle dispatch requests
// This is similar to https://github.com/nelix/fluxxor-react-chrome-boilerplate/blob/4bad47e298c0fbfc5d4f2438296ff9f5335e7609/app/background/app.js
AppDispatcher.handleAction = function(action) {
  this.dispatch({
    source: 'VIEW_ACTION',
    action: action
  });
};

export default AppDispatcher;