const LRU = require('lru-cache');
const compressor = require('uglify-js');
const generator = require('loopback-sdk-angular');

module.exports = class SKDBuilder {
    constructor({
        cacheOptions,
        defaultSDKOptions,
    }) {
        this.defaultSDKOptions = Object.assign({
            ngModuleName: 'lbServices',
            namespaceModels: false,
            namespaceCommonModels: false,
            namespaceDelimiter: '.',
            modelsToIgnore: [],
        }, defaultSDKOptions);

        const lruCacheOptions = Object.assign({
            max: 100, // for now there will most likely only be one cached sdk
            maxAge: 1000 * 60 * 60 * 24, // 1 Day
        }, cacheOptions);

        this.cache = new LRU(lruCacheOptions);
    }

    buildSKD({
        SDKOptions,
        protocol,
        host,
        app,
    }) {
        const options = Object.assign({}, {
            apiUrl: `${protocol}://${host}${app.get('restApiRoot')}`,
        }, this.defaultSDKOptions, SDKOptions);

        const sortedOptions = {};
        Object.keys(options).sort().forEach((key) => {
            sortedOptions[key] = options[key];
        });

        const cacheKey = JSON.stringify(sortedOptions);
        if (this.cache.has(cacheKey)) {
            return {
                cached: true,
                code: this.cache.get(cacheKey),
            };
        }

        const script = generator.services(app, options);
        const minifiedScript = compressor.minify(script);
        this.cache.set(cacheKey, minifiedScript.code);

        return {
            cached: false,
            code: minifiedScript.code,
        };
    }
};
