const SKDBuilder = require('./src/SDKBuilder.js');

module.exports = function(app, { mountPath = '/sdk', cacheOptions }) {
    const builder = new SKDBuilder({ cacheOptions });

    app.get(mountPath, (req, res, next) => {
        try {
            const requestOptions = req.query.options ? JSON.parse(req.query.options) : {};
            const result = builder.buildSKD({
                SDKOptions: requestOptions,
                protocol: req.protocol,
                host: req.headers.host,
                app,
            });

            res.setHeader('Content-Type', 'application/javascript');
            res.setHeader('X-Loopback-SDK-Cache-Hit', result.cached);
            res.status(200).send(result.code);
        } catch (error) {
            next(error);
        }
    });
};
