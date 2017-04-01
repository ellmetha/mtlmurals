import 'babel-polyfill';

import controllers from './controllers';
import DOMRouter from './core/DOMRouter';


// Defines the router and initializes it!
const router = new DOMRouter(controllers);
(function runApp() {
  router.init();
}(window));
