const _ = require('lodash');
const compressor = require('uglify-js');
const generator = require('loopback-sdk-angular');

module.exports = function(app, options){
  options = _.defaults({}, options, { mountPath: '/sdk' });


  console.log('app', app);
  console.log('title', app.get('restApiRoot'));
  console.log('title', app.get('host'));

  app.get(options.mountPath, function(req, res, next){
    const sdkDefaultOptions = {
      ngModuleName: 'lbServices',
      apiUrl: req.headers.host,
      includeCommonModules: true,
      namespaceModels: false,
      namespaceCommonModels: false,
      namespaceDelimiter: '.',
      modelsToIgnore: [],
    }
    const requestOptions = req.query.options ? JSON.parse(req.query.options) : {};
    const sdkOptions = _.defaults({}, requestOptions, sdkDefaultOptions);
    const script = generator.services(app, sdkOptions);
    const minifiedScript = compressor.minify(script);
    res.setHeader('Content-Type', 'application/javascript');
    res.status(200)
      .send(minifiedScript.code);
  });
};
