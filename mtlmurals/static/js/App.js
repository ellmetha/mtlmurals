import 'babel-polyfill';

import controllers from './controllers';
import DOMRouter from './core/DOMRouter';


// Defines the router and initializes it!
let router = new DOMRouter(controllers);
(function() {
  router.init();
})(window);
