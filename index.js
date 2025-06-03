import { handleEvent } from "flareact";
import { processCronTrigger } from './src/functions/cronTrigger'

//import { getAssetFromKV, mapRequestToAsset } from "@cloudflare/kv-asset-handler";

/**
 * The DEBUG flag will do two things that help during development:
 * 1. we will skip caching on the edge, which makes it easier to
 *    debug.
 * 2. we will return an error message on exception in your Response rather
 *    than the default 404.html page.
 */
const DEBUG = false;

addEventListener("fetch", (event) => {
  try {
    event.respondWith(
      //handleEvent(event)
      handleEvent(event, require.context("./pages/", true, /\.(js|jsx|ts|tsx)$/), DEBUG)
    );
  } catch (e) {
    if (DEBUG) {
      return event.respondWith(
        new Response(e.message || e.toString(), {
          status: 500,
        })
      );
    }
    event.respondWith(new Response("Internal Error", { status: 500 }));
    // Fall back to serving `/index.html` on errors.
    /*return getAssetFromKV(event, {
      mapRequestToAsset: req => new Request(`${new URL(req.url).origin}/index.html`, req),
    })*/
  }
});

addEventListener('scheduled', (event) => {
  event.waitUntil(processCronTrigger(event))
})

/*import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
reportWebVitals();*/