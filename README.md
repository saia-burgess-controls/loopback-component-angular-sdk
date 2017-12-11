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

* servicename: The name of the angular service default 'lbServices'
* hostname: The API's host name
