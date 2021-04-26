# Integrate the SDK

## Prerequisites

Before using the Zoom Instant SDK, you need to:

- Get an SDK key & Secret for authentication. Login to the Zoom Marketplace and [Create a SDK App](https://marketplace.zoom.us/docs/guides/build/sdk-app) to get **SDK Keys** & **Secrets**.
- Prepare a camera and a microphone.
- An backend service to provide the signature. Refer to the [Generate Signature](https://marketplace.zoom.us/docs/sdk/native-sdks/web/essential/signature) for the detail.

## Integrate the SDK

Choose either of the following methods to integrate the Zoom Instant SDK into your project.

### NPM
1. The Zoom Instant SDK can be installed through npm using the [zoomus instantsdk](https://npmjs.com) package.

``` 
 npm install @zoomus/instantsdk --save
```
2. Then import the module in your package.

```javascript
import ZoomInstant from '@zoomus/instantsdk';
const client = ZoomInstant.createClient();
```

3. The Zoom Instant SDK use web worker and web assembly to deal with audio/video/screen, so you need to load these depedent assets.When the SDK is released, the web worker and the web assembly assets will be also included(the `lib` folder), you can either deploy these assets to your private servers or use the cloud assets provided by ZOOM. 
- Use Zoom Global service.The dependent assets path will be `https://source.zoom.us/instant/{version}/lib`
``` javascript
const client = ZoomInstant.createClient();
client.init('en-US', 'Global');
```
- Use Zoom CDN service. The dependent assets path will be `https://dmogdx0jrul3u.cloudfront.net/instant/{version}/lib`
```javascript
const client = ZoomInstant.createClient();
client.init('en-US', 'CDN');
```
- Use private server to deploy the assets.
```javascript
// webpack config
{
  ... other configuration
  plugins:[
    new CopyWebpackPlugin({
      patterns:[
        from:'node_modules/@zoomus/instantsdk/lib',
        to:'dest/zoom-libs' // The dest folder
      ]
    })
  ]
}
// use private dependent assets path
const client = ZoomInstant.createClient();
client.init('en-US', 'path to the zoom-libs');
```

### CDN
The Zoom Instant SDK can also be imported and used through CDN.
```html
<script src="https://source.zoom.us/instant/zoom-instant-1.0.0.min.js">
```