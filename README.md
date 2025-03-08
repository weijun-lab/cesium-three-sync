# ThreeToCesium
- - -
**language:** [English](README.md) / [简体中文](README.zh-CN.md)
- - -
A plugin that enables Cesium and Three.js to run in synchronization.
---
![](https://github.com/weijun-lab/Leaflet.TrackPlayer/blob/master/examples/lib/assets/demo.gif?raw=true)
## 🎨Live Demo
<https://weijun-lab.github.io/ThreeToCesium/>
## Installation
* `npm install ThreeToCesium`
* Or download the repository
## Usage
### ESM(ECMAScript Modules)
```js
import ThreeToCesium from "ThreeToCesium";
```
### UMD(Universal Module Definition)
```html
<script src="ThreeToCesium/dist/ThreeToCesium.umd.cjs"></script>
```
---
## Code Example
```js
let cesiumViewer = new Cesium.Viewer('map', {
  sceneModePicker: false,
});
let sceneIntegrator = ThreeToCesium(cesiumViewer);
let position = Cesium.Cartesian3.fromDegrees(108.95943284886424, 34.288286155753546, 5);
let mesh = new THREE.Mesh(
  new THREE.BoxGeometry(10, 10, 10),
  new THREE.MeshNormalMaterial()
);
sceneIntegrator.add(mesh,position)
cesiumViewer.scene.postRender.addEventListener(() => {
  sceneIntegrator.update();
});
```
## params
```js
ThreeToCesium(cesiumViewer,option);
```
| Options | Type | Description |
| --- | --- | --- |
| **cesiumViewer** | Cesium.Viewer | - |
| **options** | Object | - |
### Options
| Options | Type | Default | Description |
| --- | --- | --- | --- |
| **cameraFar** | Number | 600 | The far plane of the Three.js camera frustum. |
| **cameraNear** | Number | 8 | The near plane of the Three.js camera frustum. |

## Methods
| Methods | Return | Description |
| --- | --- | --- |
| add(`<THREE.Object3D>` object, `<Cesium.Cartesian3>` position) | THREE.Group | Add a Three.js 3D object to a specified location on the Earth. |
| remove(`<THREE.Object3D>` object) | - | Remove the specified Three.js 3D object. |
| update() | - | Synchronize the Three.js and Cesium cameras, and execute THREE.WebGLRenderer.render(). |
| destroy() | - | Destroy the Three.js scene. |
## Properties
| Properties | Type | Description |
| --- | --- | --- |
|**cesiumViewer**| Cesium.Viewer | - |
|**threeCamera**| THREE.PerspectiveCamera | - |
|**threeRenderer**| THREE.WebGLRenderer | - |
|**threeScene**| THREE.Scene | - |