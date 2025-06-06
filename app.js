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



function App() {
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

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

/*
async function handleEvent(event) {
  const url = new URL(event.request.url);
  let options = {};

  /**
   * You can add custom logic to how we fetch your assets
   * by configuring the function `mapRequestToAsset`
   */
  /*
  // options.mapRequestToAsset = handlePrefix(/^\/docs/)
  options.mapRequestToAsset = (req) => {
    // First let's apply the default handler, which we imported from
    // '@cloudflare/kv-asset-handler' at the top of the file. We do
    // this because the default handler already has logic to detect
    // paths that should map to HTML files, for which it appends
    // `/index.html` to the path.

    req = mapRequestToAsset(req);
    // Now we can detect if the default handler decided to map to
    // index.html in some specific directory.
    if (req.url.endsWith("/index.html")) {
      // Indeed. Let's change it to instead map to the root `/index.html`.
      // This avoids the need to do a redundant lookup that we know will
      // fail.
      return new Request(`${new URL(req.url).origin}/index.html`, req);
    } else {
      // The default handler decided this is not an HTML page. It's probably
      // an image, CSS, or JS file. Leave it as-is.
      return req;
    }
  };

  try {
    if (DEBUG) {
      // customize caching
      options.cacheControl = {
        bypassCache: true,
      };
    }
    return await getAssetFromKV(event, options);
  } catch (e) {
    // Fall back to serving `/index.html` on errors.
    return getAssetFromKV(event, {
      mapRequestToAsset: (req) =>
        new Request(`${new URL(req.url).origin}/index.html`, req),
    });
  }
}
*/

/**
 * Here's one example of how to modify a request to
 * remove a specific prefix, in this case `/docs` from
 * the url. This can be useful if you are deploying to a
 * route on a zone, or if you only want your static content
 * to exist at a specific path.
 */
/*
function handlePrefix(prefix) {
  return (request) => {
    // compute the default (e.g. / -> index.html)
    let defaultAssetKey = mapRequestToAsset(request);
    let url = new URL(defaultAssetKey.url);
    // strip the prefix from the path for lookup
    url.pathname = url.pathname.replace(prefix, "/");
    // inherit all other props from the default request
    return new Request(url.toString(), defaultAssetKey);
  };
}
*/
