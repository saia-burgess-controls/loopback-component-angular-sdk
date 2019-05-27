# loopback-component-angular-sdk
Loopback angualr sdk deliverd over the api

## Configuration

Add the configuration in your `component-config.json`

```
"@joinbox/loopback-component-angular-sdk": {
    "mountPath": "/sdk"
    "cacheOptions": {}
}
```

## Usage

Call the configured endpoint `http://localhost:10100/sdk?=api.example.com` and the loopback SDK will be returned.

### Params

- options: An Object with option for building the SDK (name: default value):
  - ngModuleName: 'lbServices'
  - apiUrl: ${req.headers.host}/${app.get('restApiRoot')} // request-host/api-root-path
  - includeCommonModules: true
  - namespaceModels: false
  - namespaceCommonModels: false
  - namespaceDelimiter: '.'
  - modelsToIgnore: []


### Cache options

See [lru-cache docs](https://github.com/isaacs/node-lru-cache#readme)
