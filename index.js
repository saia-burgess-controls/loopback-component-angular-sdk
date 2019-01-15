const compressor = require('uglify-js');
const generator = require('loopback-sdk-angular');

module.exports = function(app, { mountPath = '/sdk' }) {

    app.get(mountPath, (req, res, next) => {

        const sdkDefaultOptions = {
            ngModuleName: 'lbServices',
            apiUrl: `${req.protocol}://${req.headers.host}${app.get('restApiRoot')}`,
            includeCommonModules: true,
            namespaceModels: false,
            namespaceCommonModels: false,
            namespaceDelimiter: '.',
            modelsToIgnore: [],
        };

        try {
            const requestOptions = req.query.options ? JSON.parse(req.query.options) : {};
            const sdkOptions = Object.assign({}, sdkDefaultOptions, requestOptions);
            const script = generator.services(app, sdkOptions);
            const minifiedScript = compressor.minify(script);

            res.setHeader('Content-Type', 'application/javascript');
            res.status(200).send(minifiedScript.code);
        } catch (error) {
            next(error);
        }

    });
};
