import * as THREE from "three"
class CesiumThreeSync {
  constructor(cesiumViewer) {
    this.cesiumViewer = cesiumViewer;
  }
  attachRendererDomToCesium(renderer) {
    let cesiumContainer = this.cesiumViewer.container;
    renderer.setSize(cesiumContainer.offsetWidth, cesiumContainer.offsetHeight);
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.top = "0";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.pointerEvents = "none";
    cesiumContainer.appendChild(renderer.domElement);
  }
  syncCamera(threeCamera) {
    threeCamera.matrixAutoUpdate = false;
    threeCamera.fov = Cesium.Math.toDegrees(this.cesiumViewer.camera.frustum.fovy)
    let cvm = this.cesiumViewer.camera.viewMatrix;
    let civm = this.cesiumViewer.camera.inverseViewMatrix;
    threeCamera.matrixWorld.set(
      civm[0], civm[4], civm[8], civm[12],
      civm[1], civm[5], civm[9], civm[13],
      civm[2], civm[6], civm[10], civm[14],
      civm[3], civm[7], civm[11], civm[15]
    );

    threeCamera.matrixWorldInverse.set(
      cvm[0], cvm[4], cvm[8], cvm[12],
      cvm[1], cvm[5], cvm[9], cvm[13],
      cvm[2], cvm[6], cvm[10], cvm[14],
      cvm[3], cvm[7], cvm[11], cvm[15]
    );

    // 设置three宽高
    let cesiumContainer = this.cesiumViewer.container;
    let width = cesiumContainer.offsetWidth;
    let height = cesiumContainer.offsetHeight;
    let aspect = width / height;
    threeCamera.aspect = aspect;
    threeCamera.updateProjectionMatrix();

  }
  createBridgeContainer(cartesian3) {
    let modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(cartesian3);
    let rotationMatrix = new THREE.Matrix4();
    rotationMatrix.set(
      modelMatrix[0], modelMatrix[4], modelMatrix[8], modelMatrix[12],
      modelMatrix[1], modelMatrix[5], modelMatrix[9], modelMatrix[13],
      modelMatrix[2], modelMatrix[6], modelMatrix[10], modelMatrix[14],
      0, 0, 0, 1
    );
    rotationMatrix.multiply(new THREE.Matrix4().makeRotationX(Math.PI / 2));
    let group = new THREE.Group();
    group.applyMatrix4(rotationMatrix);
    return group;
  }

}
export default CesiumThreeSync