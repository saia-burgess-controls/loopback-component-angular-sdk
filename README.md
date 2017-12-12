# loopback-component-sdk
Loopback angualr sdk deliverd over the api

## Configuration

Add the configuration in your `component-config.json`

```
"loopback-component-sdk": {
  "mountPath": "/sdk"
},
```

## Usage

Call the configured endpoint `http://localhost:10100/sdk?=api.example.com` and the loopback SDK will be returned.

### Params

- options: An Object with option for building the SDK (name: default value):
  - ngModuleName: 'lbServices'
  - apiUrl: ${req.headers.host}/${app.get('restApiRoot')} // <request-host>/<api-root-path>
  - includeCommonModules: true
  - namespaceModels: false
  - namespaceCommonModels: false
  - namespaceDelimiter: '.'
  - modelsToIgnore: []
