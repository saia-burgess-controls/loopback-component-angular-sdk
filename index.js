const _ = require('lodash');
const compressor = require('uglify-js');
const generator = require('loopback-sdk-angular');

module.exports = function(app, options){
  options = _.defaults({}, options, { mountPath: '/sdk' });
  const serviceNamePlaceholder = '<%= serviceName %>';
  const hostPlaceholder = '<%= hostName %>';
  const script = generator.services(app, serviceNamePlaceholder, hostPlaceholder);
  const minifiedScript = compressor.minify(script);
  const compileSdkCode = _.template(minifiedScript.code);

  app.get(options.mountPath, function(req, res, next){
    const serviceName = req.query.servicename || 'lbServices';
    const hostName = req.query.hostname;
    const sdk = compileSdkCode({
      serviceName,
      hostName
    });
    res.setHeader('Content-Type', 'application/javascript');
    res.status(200)
      .send(sdk);
  });
};
