// import hello from "./case1/hello";

// hello();

import helloWorld from './babelLoader';
// if ("serviceWorker" in navigator) {
//   window.addEventListener("load", () => {
//     navigator.serviceWorker
//       .register("/service-worker.js")
//       .then((registration) => {
//         console.log("SW registered: ", registration);
//       })
//       .catch((registrationError) => {
//         console.log("SW registration failed: ", registrationError);
//       });
//   });
// }
import './shimming';
import './split';
import './ts';
import './work';

helloWorld();
