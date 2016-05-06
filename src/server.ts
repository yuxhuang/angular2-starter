import 'angular2-universal/polyfills';

import * as path from 'path';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as morgan from 'morgan';

// Angular 2 Universal
import {
  provide,
  enableProdMode,
  expressEngine,
  REQUEST_URL,
  ORIGIN_URL,
  BASE_URL,
  NODE_ROUTER_PROVIDERS,
  NODE_HTTP_PROVIDERS,
  ExpressEngineConfig
} from 'angular2-universal';

// Application
import {Angular2StarterAppComponent} from './app';

const app = express();
const ROOT = path.join(path.resolve(__dirname));

console.log('ROOT: ' + ROOT);

enableProdMode();

// Express View
app.engine('.html', expressEngine);
app.set('views', __dirname);
app.set('view engine', 'html');

app.use(morgan('dev'));
app.use(bodyParser.json());

function ngApp(req, res) {
  let baseUrl = '/';
  let url = req.originalUrl || '/';

  let config: ExpressEngineConfig = {
    directives: [ Angular2StarterAppComponent ],
    platformProviders: [
      provide(ORIGIN_URL, {useValue: 'http://localhost:3000'}),
      provide(BASE_URL, {useValue: baseUrl}),
    ],
    providers: [
      provide(REQUEST_URL, {useValue: url}),
      provide('API_ENDPOINT', {useValue: 'http://localhost:4200/api'}),
      NODE_ROUTER_PROVIDERS,
      NODE_HTTP_PROVIDERS,
    ],
    async: true,
    preboot: false // { appRoot: 'app' } // your top level app component selector
  };

  res.render('index', config);
}

function indexFile(req, res) {
  res.sendFile('/index.html', {root: __dirname});
}

// Serve static files
app.use(express.static(ROOT, {index: false}));

// Routes with html5pushstate
app.use('/contacts', ngApp);
app.use('/contacts/*', ngApp);

// Server
app.listen(3000, () => {
  console.log('Listening on: http://localhost:3000');
});
