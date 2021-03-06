const express = require('express');
const config = require('../config');
const path = require('path');
const https = require('https');
const fs = require('fs');

console.log(config.build.index);

var expressServerHttp = express();
if (config.build.http.use) {
  configureServer(expressServerHttp);
} else {
  configureRedirect(expressServerHttp);
}

if (config.build.DNSValidator.use) {
  configureDNSValidator(expressServerHttp);
}

var port = config.build.http.port;
console.log('App running on port', port);
expressServerHttp.listen(port);

if (config.build.https.use) {
  var expressServerHttps = express();

  configureServer(expressServerHttps);

  var port = config.build.https.port;
  console.log('App running on port', port);

  https.createServer({
    key  : fs.readFileSync('ssl/frontend.key'),
    cert : fs.readFileSync('ssl/frontend.crt'),
    ca : [ fs.readFileSync('ssl/frontendca.crt') ]},
    expressServerHttps).listen(port);
}

function configureServer(app) {
  var router = express.Router();
  router.get('/', (req, res, next) => { res.sendFile(config.build.index)});
  
  /* serves all the static files */
  router.get('/static/*', (req, res, next) => { 
    res.sendFile( path.posix.join( path.posix.join(config.build.assetsRoot, config.build.assetsSubDirectory), req.params[0])); 
  });

  app.get('*/vendor*.js', function (req, res, next) {
    req.url = req.url + '.gz';
    res.set('Content-Encoding', 'gzip');
    res.set('Content-Type', 'text/javascript');
    next();
  });
  
  app.get('*/app*.js', function (req, res, next) {
    req.url = req.url + '.gz';
    res.set('Content-Encoding', 'gzip');
    res.set('Content-Type', 'text/javascript');
    next();
  });

  app.use('/', router);
}

function configureDNSValidator(app) {
  app.get(config.build.DNSValidator.path, function(req, res) {
      res.send(config.build.DNSValidator.response);
  });
}

function configureRedirect(app) {
  app.get('*', (req, res) => {
      var httpPort = ':' + config.build.http.port;
      var httpsPort = ':' + config.build.https.port;
      var host = req.headers.host;
      if (req.headers.host.toString().indexOf(httpPort) > - 1) {
          host = host.toString().replace(httpPort, httpsPort);
      }
      res.redirect('https://' + host + req.url);
  });
}
